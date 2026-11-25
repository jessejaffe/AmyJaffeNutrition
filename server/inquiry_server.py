"""Receive the public website forms behind the Nginx reverse proxy."""

import logging
import os
import re
import smtplib
import ssl
from dataclasses import dataclass
from datetime import datetime
from email.headerregistry import Address
from email.message import EmailMessage
from email.utils import format_datetime, make_msgid
from html import escape
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qsl, urlsplit
from zoneinfo import ZoneInfo


SITE_ORIGIN = "https://www.amyjaffenutrition.com"
INQUIRY_RECIPIENT = "amysjaffe@gmail.com"
EASTERN = ZoneInfo("America/New_York")
MAX_BODY_BYTES = 40 * 1024
THANKS_PATH = "/api/inquiries/thanks"
LOGGER = logging.getLogger("inquiries")
EMAIL_PATTERN = re.compile(r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*")


@dataclass(frozen=True)
class InquiryForm:
    subject: str
    label: str
    return_path: str
    fields: tuple[tuple[str, int, bool], ...]


CONTACT_FIELDS = (("First name", 100, True), ("Last name", 100, True), ("email", 254, True))
FORMS = {
    "/api/inquiries/general": InquiryForm(
        "Website inquiry - General homepage form",
        "General homepage inquiry",
        "/#contact",
        CONTACT_FIELDS + (("Support request", 2000, True),),
    ),
    "/api/inquiries/introductory-call": InquiryForm(
        "Website inquiry - Free introductory call",
        "Free introductory call request",
        "/free-introductory-call/#request",
        CONTACT_FIELDS + (("Phone", 60, True), ("Short note", 2000, False)),
    ),
}


def parse_fields(body: bytes) -> dict[str, str]:
    pairs = parse_qsl(
        body.decode("utf-8"), keep_blank_values=True, strict_parsing=True,
        errors="strict", max_num_fields=8,
    )
    fields = dict(pairs)
    if len(fields) != len(pairs):
        raise ValueError("Duplicate field")
    return fields


def inquiry_email(
    form: InquiryForm, fields: dict[str, str], sender: str, submitted_at: datetime,
) -> EmailMessage:
    details = [
        f"Form type: {form.label}",
        f"Submitted at (Eastern Time): {submitted_at.astimezone(EASTERN):%B %d, %Y at %I:%M:%S %p %Z}",
        "",
    ]
    for name, max_length, required in form.fields:
        value = fields.get(name, "").strip()
        if (required and not value) or len(value) > max_length or "\x00" in value:
            raise ValueError("Missing or invalid field")
        if value:
            label = "Email" if name == "email" else name
            details.append(f"{label}: {value}")

    reply_to = fields["email"].strip()
    if not EMAIL_PATTERN.fullmatch(reply_to):
        raise ValueError("Invalid email address")

    message = EmailMessage()
    message["From"] = Address("Amy Jaffe Nutrition Website", addr_spec=sender)
    message["To"] = INQUIRY_RECIPIENT
    message["Reply-To"] = Address(addr_spec=reply_to)
    message["Subject"] = form.subject
    message["Date"] = format_datetime(submitted_at)
    message["Message-ID"] = make_msgid(domain="amyjaffenutrition.com")
    message.set_content("\n".join(details))
    return message


class InquiryServer(ThreadingHTTPServer):
    def __init__(self, address: tuple[str, int], sender: str, app_password: str):
        Address(addr_spec=sender)
        self.sender = sender
        self.app_password = app_password.replace(" ", "")
        super().__init__(address, InquiryHandler)

    def deliver(self, message: EmailMessage) -> None:
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as smtp:
            smtp.starttls(context=ssl.create_default_context())
            smtp.login(self.sender, self.app_password)
            smtp.send_message(message)


class InquiryHandler(BaseHTTPRequestHandler):
    server: InquiryServer
    timeout = 15

    def log_message(self, _format, *_args):
        # Log delivery state separately, without request or form contents.
        pass

    def do_GET(self):
        if self.path == THANKS_PATH:
            self.result(HTTPStatus.OK, "Thank you. Your request was sent.", "/", "Return to the website")
        else:
            self.result(HTTPStatus.NOT_FOUND, "This page is unavailable.", "/", "Return to the website")

    def do_POST(self):
        submitted_at = datetime.now(EASTERN)
        form = FORMS.get(self.path)
        if form is None:
            self.result(HTTPStatus.NOT_FOUND, "This page is unavailable.", "/", "Return to the website")
            return

        try:
            origin = self.headers.get("Origin")
            if origin is None:
                referer = urlsplit(self.headers.get("Referer", ""))
                origin = f"{referer.scheme}://{referer.netloc}"
            if origin != SITE_ORIGIN:
                self.result(HTTPStatus.FORBIDDEN, "Please submit from the website.", form.return_path)
                return

            if self.headers.get_content_type() != "application/x-www-form-urlencoded":
                raise ValueError("Unsupported form encoding")
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= MAX_BODY_BYTES:
                raise ValueError("Invalid content length")
            body = self.rfile.read(length)
            if len(body) != length:
                raise ValueError("Incomplete form")
            fields = parse_fields(body)
            if fields.get("_honey"):
                self.redirect_to_thanks()
                return
            message = inquiry_email(form, fields, self.server.sender, submitted_at)
        except (ValueError, OSError):
            self.result(HTTPStatus.BAD_REQUEST, "Please check your details and try again.", form.return_path)
            return

        try:
            self.server.deliver(message)
        except OSError as error:
            LOGGER.warning("Delivery failed for %s (%s)", self.path, type(error).__name__)
            self.result(HTTPStatus.BAD_GATEWAY, "We couldn't send your request. Please try again.", form.return_path)
            return

        LOGGER.info("SMTP accepted %s %s", self.path, message["Message-ID"])
        self.redirect_to_thanks()

    def redirect_to_thanks(self):
        self.send_response(HTTPStatus.SEE_OTHER)
        self.send_header("Location", THANKS_PATH)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def result(self, status: HTTPStatus, title: str, path: str, link: str = "Return to the form"):
        fallback = ""
        if status != HTTPStatus.OK:
            fallback = (
                '<p>You can also <a href="mailto:amysjaffe@gmail.com">email Amy</a>'
                ' or call <a href="tel:3055866053">305-586-6053</a>.</p>'
            )
        body = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>{escape(title)} | Amy Jaffe Nutrition</title>
  <style>
    body {{ background: #f7f1e9; color: #39182d; font: 1rem/1.6 system-ui, sans-serif; margin: 0; }}
    main {{ max-width: 37rem; margin: min(12vh, 6rem) auto; padding: 2rem; }}
    h1 {{ font: 2.5rem/1.15 Georgia, serif; }}
    a {{ color: inherit; }}
  </style>
</head>
<body><main><p>Amy Jaffe Nutrition</p><h1>{escape(title)}</h1>
{fallback}<p><a href="{escape(path)}">{escape(link)}</a></p></main></body>
</html>""".encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    with InquiryServer(
        ("127.0.0.1", 43128),
        os.environ["GMAIL_SMTP_USERNAME"],
        os.environ["GMAIL_SMTP_APP_PASSWORD"],
    ) as service:
        service.serve_forever()
