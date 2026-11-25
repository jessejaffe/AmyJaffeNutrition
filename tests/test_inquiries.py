import unittest
from datetime import datetime, timezone
from http.client import HTTPConnection
from threading import Thread
from unittest.mock import patch
from urllib.parse import urlencode

from server.inquiry_server import FORMS, SITE_ORIGIN, THANKS_PATH, InquiryServer, inquiry_email


GENERAL = "/api/inquiries/general"
INTRODUCTORY_CALL = "/api/inquiries/introductory-call"
CONTACT = {"First name": "Website", "Last name": "Test", "email": "website-test@example.com"}


class InquiryTests(unittest.TestCase):
    def setUp(self):
        self.service = InquiryServer(("127.0.0.1", 0), "sender@example.com", "test-password")
        thread = Thread(target=self.service.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(self.service.server_close)
        self.addCleanup(thread.join)
        self.addCleanup(self.service.shutdown)
        delivery_patch = patch.object(self.service, "deliver")
        self.delivery = delivery_patch.start()
        self.addCleanup(delivery_patch.stop)

    def post(self, path, fields, origin=SITE_ORIGIN):
        connection = HTTPConnection("127.0.0.1", self.service.server_port, timeout=3)
        try:
            connection.request("POST", path, urlencode(fields), {
                "Origin": origin,
                "Content-Type": "application/x-www-form-urlencoded",
            })
            response = connection.getresponse()
            return response.status, response.getheader("Location"), response.read().decode("utf-8")
        finally:
            connection.close()

    def test_both_form_routes_email_amy_and_redirect(self):
        cases = (
            (GENERAL, {"Support request": "A general inquiry"}, "General homepage form", "Support request"),
            (INTRODUCTORY_CALL, {"Phone": "305-555-0142", "Short note": "Test only"}, "Free introductory call", "Phone"),
        )
        for route, details, subject, field_label in cases:
            with self.subTest(route=route):
                status, location, _ = self.post(route, CONTACT | details | {"_cc": "attacker@example.com"})
                self.assertEqual((status, location), (303, THANKS_PATH))
                (email,), _ = self.delivery.call_args
                self.assertEqual(email["To"], "amysjaffe@gmail.com")
                self.assertEqual(email["Reply-To"], CONTACT["email"])
                self.assertEqual(email["Subject"], "Website inquiry - " + subject)
                self.assertNotIn("Cc", email)
                self.assertIn(field_label + ":", email.get_content())
        self.assertEqual(self.delivery.call_count, 2)

    def test_rejects_invalid_requests_without_sending(self):
        valid = CONTACT | {"Phone": "305-555-0142"}
        for fields in (CONTACT, valid | {"email": "a@example.com\nBcc: b@example.com"}, valid | {"email": "a..b@example.com"}, valid | {"Short note": "a" * 2001}):
            with self.subTest(fields=list(fields)):
                self.assertEqual(self.post(INTRODUCTORY_CALL, fields)[0], 400)
        self.assertEqual(self.post(INTRODUCTORY_CALL, valid, origin="https://example.com")[0], 403)
        self.assertEqual(self.post(INTRODUCTORY_CALL, valid | {"_honey": "spam"})[:2], (303, THANKS_PATH))
        self.delivery.assert_not_called()

    def test_mail_error_does_not_show_success(self):
        self.delivery.side_effect = OSError("test failure")
        with self.assertLogs("inquiries", level="WARNING"):
            status, location, body = self.post(INTRODUCTORY_CALL, CONTACT | {"Phone": "305-555-0142"})
        self.assertEqual((status, location), (502, None))
        self.assertIn("Please try again", body)
        self.assertIn("mailto:amysjaffe@gmail.com", body)

    def test_email_uses_server_time_in_eastern_time(self):
        sent_at = datetime(2026, 11, 25, 16, 48, tzinfo=timezone.utc)
        email = inquiry_email(FORMS[GENERAL], CONTACT | {
            "Support request": "Test only",
            "Submitted at (Eastern Time)": "Fake timestamp",
        }, "sender@example.com", sent_at)
        self.assertIn("November 25, 2026 at 11:48:00 AM EST", email.get_content())
        self.assertNotIn("Fake timestamp", email.get_content())
