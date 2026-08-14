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
                "form_submissions": 3,
                "inquiry_rate": 7.1,
                "video_viewers": 18,
            },
            "forms": [
                {
                    "title": "General inquiry",
                    "started": 6,
                    "submitted": 2,
                    "completion_rate": 33.3,
                },
                {
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
