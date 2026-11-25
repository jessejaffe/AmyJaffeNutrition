import importlib.util
import unittest
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


MODULE_PATH = Path(__file__).parents[1] / "server" / "weekly_analytics_email.py"
SPEC = importlib.util.spec_from_file_location("weekly_analytics_email", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class WeeklyAnalyticsEmailTests(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 8, 13, 9, 0, tzinfo=ZoneInfo("America/New_York"))
        self.data = {
            "range_days": 7,
            "summary": {
                "visitors": 42,
                "pageviews": 95,
                "form_starts": 9,
                "form_submissions": 3,
                "inquiry_rate": 7.1,
                "video_viewers": 18,
            },
            "forms": [
                {
                    "id": "homepage-general-inquiry",
                    "title": "General inquiry",
                    "started": 6,
                    "submitted": 2,
                    "completion_rate": 33.3,
                },
                {
                    "id": "free-introductory-call",
                    "title": "Free introductory call",
                    "started": 2,
                    "submitted": 1,
                    "completion_rate": 50,
                },
            ],
            "videos": [
                {
                    "title": "Meet Amy Jaffe",
                    "unique_viewers": 12,
                    "starts": 10,
                    "completions": 4,
                    "completion_rate": 33.3,
                    "average_watch_seconds": 65,
                    "watched_seconds": 3661,
                    "reached_25": 9,
                    "reached_50": 7,
                    "reached_75": 5,
                }
            ],
            "pages": [{"label": "/", "value": 71}],
            "sources": [{"label": "Direct", "value": 30}],
            "countries": [{"label": "United States", "value": 30}, {"label": "Canada", "value": 4}],
            "us_states": [{"label": "Florida", "value": 16}, {"label": "New York", "value": 9}],
        }

    def test_builds_complete_report(self):
        subject, report = MODULE.build_report(
            self.data, self.now, "https://www.amyjaffenutrition.com/analytics/"
        )

        self.assertEqual(
            subject,
            "Amy Jaffe Nutrition weekly analytics | Aug 6 - 13, 2026",
        )
        self.assertIn("Unique visitors: 42", report)
        self.assertIn("General inquiry", report)
        self.assertIn("Free introductory call", report)
        self.assertIn("Meet Amy Jaffe", report)
        self.assertIn("Average watch time: 1m 5s", report)
        self.assertIn("Total watch time: 1h 1m 1s", report)
        self.assertIn("Reached 25% / 50% / 75%: 9 / 7 / 5", report)
        self.assertIn("TRAFFIC BY COUNTRY", report)
        self.assertIn("United States: 30 visitors", report)
        self.assertIn("U.S. TRAFFIC BY STATE", report)
        self.assertIn("Florida: 16 visitors", report)
        self.assertIn("Private dashboard:", report)

    def test_marks_missing_geography_as_unavailable(self):
        data = {"range_days": 7, "summary": {}}
        _, report = MODULE.build_report(
            data, self.now, "https://www.amyjaffenutrition.com/analytics/"
        )

        self.assertIn("No country data recorded.", report)
        self.assertIn("No U.S. state data recorded.", report)

    def test_excludes_confirmed_test_events_only_inside_the_report_window(self):
        self.data["generated_at"] = "2026-08-13T13:00:30Z"
        start = {
            "id": "48eea198-cdf9-4516-93fc-c06cca22b2db",
            "timestamp": "2026-08-12T17:22:01Z",
            "form_id": "homepage-general-inquiry",
            "event": "form_started",
        }
        submit = {
            **start,
            "id": "ea70fc69-f4f0-4dbb-98b8-660100c683c5",
            "timestamp": "2026-08-12T17:22:02Z",
            "event": "form_submitted",
        }
        outside_window = {
            **submit,
            "id": "dc443b88-2bcc-4b6b-a8b6-5d80f3a861c4",
            "timestamp": "2026-08-06T13:00:29Z",
            "form_id": "free-introductory-call",
        }
        events = [start, submit, submit, outside_window]

        cleaned = MODULE.with_test_form_events_excluded(self.data, events, self.now)

        self.assertEqual(cleaned["summary"]["form_starts"], 8)
        self.assertEqual(cleaned["summary"]["form_submissions"], 2)
        self.assertEqual(cleaned["summary"]["inquiry_rate"], 4.8)
        self.assertEqual(cleaned["summary"]["pageviews"], 95)
        self.assertEqual(cleaned["forms"][0]["started"], 5)
        self.assertEqual(cleaned["forms"][0]["submitted"], 1)
        self.assertEqual(cleaned["forms"][0]["completion_rate"], 20)
        self.assertEqual(cleaned["forms"][1], self.data["forms"][1])
        self.assertEqual(self.data["summary"]["form_submissions"], 3)

        _, report = MODULE.build_report(cleaned, self.now, "https://example.com/analytics/")
        self.assertIn("Form submissions: 2", report)
        self.assertIn("Inquiry rate: 4.8%", report)

    def test_builds_email_headers(self):
        message = MODULE.build_message(
            "sender@example.com", "recipient@example.com", "Weekly report", "Report body"
        )

        self.assertEqual(message["To"], "recipient@example.com")
        self.assertEqual(message["Subject"], "Weekly report")
        self.assertIn("Report body", message.get_content())

    def test_duration_handles_empty_values(self):
        self.assertEqual(MODULE.duration(None), "0s")


if __name__ == "__main__":
    unittest.main()
