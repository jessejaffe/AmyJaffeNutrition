#!/usr/bin/env python3
"""Send the Amy Jaffe Nutrition weekly analytics email from the production server."""

from __future__ import annotations

import json
import os
import smtplib
import ssl
import time
from datetime import datetime, timedelta
from email.headerregistry import Address
from email.message import EmailMessage
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo


DEFAULT_ANALYTICS_URL = "http://127.0.0.1:43127/analytics/api?days=7&refresh=1"
DEFAULT_DASHBOARD_URL = "https://www.amyjaffenutrition.com/analytics/"
DEFAULT_TIME_ZONE = "America/New_York"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


def required_environment(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def fetch_analytics(url: str, attempts: int = 3) -> dict[str, Any]:
    """Fetch analytics with brief retries for transient API or network failures."""
    delays = (0, 5, 20)
    last_error: Exception | None = None

    for attempt in range(attempts):
        if attempt:
            time.sleep(delays[min(attempt, len(delays) - 1)])
        try:
            request = Request(url, headers={"Accept": "application/json"})
            with urlopen(request, timeout=45) as response:
                payload = json.load(response)
            if not isinstance(payload, dict) or not isinstance(payload.get("summary"), dict):
                raise ValueError("Analytics API returned an unexpected response")
            return payload
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
            last_error = error

    raise RuntimeError("Could not retrieve analytics after three attempts") from last_error


def number(value: Any) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0


def integer(value: Any) -> int:
    return int(round(number(value)))


def percent(value: Any) -> str:
    return f"{number(value):.1f}%"


def duration(value: Any) -> str:
    seconds = max(0, integer(value))
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    parts = []
    if hours:
        parts.append(f"{hours}h")
    if minutes:
        parts.append(f"{minutes}m")
    if seconds or not parts:
        parts.append(f"{seconds}s")
    return " ".join(parts)


def period_label(now: datetime, days: int) -> str:
    start = now - timedelta(days=days)
    if start.year != now.year:
        return f"{start:%b %-d, %Y} - {now:%b %-d, %Y}"
    if start.month != now.month:
        return f"{start:%b %-d} - {now:%b %-d, %Y}"
    return f"{start:%b %-d} - {now:%-d, %Y}"


def titled_rows(items: Any, value_label: str, limit: int = 5) -> list[str]:
    rows = []
    if not isinstance(items, list):
        return rows
    for item in items[:limit]:
        if not isinstance(item, dict):
            continue
        rows.append(f"  {item.get('label', 'Unknown')}: {integer(item.get('value')):,} {value_label}")
    return rows


def build_report(data: dict[str, Any], now: datetime, dashboard_url: str) -> tuple[str, str]:
    days = max(1, integer(data.get("range_days", 7)))
    label = period_label(now, days)
    summary = data.get("summary") if isinstance(data.get("summary"), dict) else {}

    subject = f"Amy Jaffe Nutrition weekly analytics | {label}"
    lines = [
        "AMY JAFFE NUTRITION",
        "Weekly analytics",
        label,
        "",
        "AT A GLANCE",
        f"  Unique visitors: {integer(summary.get('visitors')):,}",
        f"  Page views: {integer(summary.get('pageviews')):,}",
        f"  Form submissions: {integer(summary.get('form_submissions')):,}",
        f"  Inquiry rate: {percent(summary.get('inquiry_rate'))}",
        f"  Unique video viewers: {integer(summary.get('video_viewers')):,}",
        "",
        "FORMS",
    ]

    forms = data.get("forms") if isinstance(data.get("forms"), list) else []
    if forms:
        for form in forms:
            if not isinstance(form, dict):
                continue
            lines.extend(
                [
                    f"  {form.get('title', 'Form')}",
                    f"    Started: {integer(form.get('started')):,}",
                    f"    Submitted: {integer(form.get('submitted')):,}",
                    f"    Completion rate: {percent(form.get('completion_rate'))}",
                ]
            )
    else:
        lines.append("  No form activity recorded.")

    lines.extend(["", "VIDEOS"])
    videos = data.get("videos") if isinstance(data.get("videos"), list) else []
    if videos:
        for video in videos:
            if not isinstance(video, dict):
                continue
            lines.extend(
                [
                    f"  {video.get('title', 'Video')}",
                    f"    Unique viewers: {integer(video.get('unique_viewers')):,}",
                    f"    Starts: {integer(video.get('starts')):,}",
                    f"    Average watch time: {duration(video.get('average_watch_seconds'))}",
                    f"    Total watch time: {duration(video.get('watched_seconds'))}",
                    f"    Completed: {integer(video.get('completions')):,} ({percent(video.get('completion_rate'))})",
                    "    Reached 25% / 50% / 75%: "
                    f"{integer(video.get('reached_25')):,} / "
                    f"{integer(video.get('reached_50')):,} / "
                    f"{integer(video.get('reached_75')):,}",
                ]
            )
    else:
        lines.append("  No video activity recorded.")

    lines.extend(["", "TOP PAGES"])
    page_rows = titled_rows(data.get("pages"), "views")
    lines.extend(page_rows or ["  No page views recorded."])

    lines.extend(["", "TOP TRAFFIC SOURCES"])
    source_rows = titled_rows(data.get("sources"), "visitors")
    lines.extend(source_rows or ["  No traffic sources recorded."])

    if integer(summary.get("visitors")) < 10:
        lines.extend(
            [
                "",
                "NOTE",
                "  Traffic is still light, so percentages may change considerably from week to week.",
            ]
        )

    lines.extend(
        [
            "",
            f"Private dashboard: {dashboard_url}",
            f"Generated {now:%b %-d, %Y at %-I:%M %p %Z}",
        ]
    )
    return subject, "\n".join(lines)


def build_message(sender: str, recipient: str, subject: str, report: str) -> EmailMessage:
    message = EmailMessage()
    message["From"] = Address("Amy Jaffe Nutrition Analytics", addr_spec=sender)
    message["To"] = recipient
    message["Subject"] = subject
    message.set_content(report)
    return message


def send_message(message: EmailMessage, username: str, app_password: str) -> None:
    context = ssl.create_default_context()
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=45) as smtp:
        smtp.ehlo()
        smtp.starttls(context=context)
        smtp.ehlo()
        smtp.login(username, app_password.replace(" ", ""))
        smtp.send_message(message)


def main() -> None:
    username = required_environment("GMAIL_SMTP_USERNAME")
    app_password = required_environment("GMAIL_SMTP_APP_PASSWORD")
    recipient = required_environment("WEEKLY_REPORT_RECIPIENT")
    analytics_url = os.environ.get("WEEKLY_REPORT_ANALYTICS_URL", DEFAULT_ANALYTICS_URL)
    dashboard_url = os.environ.get("WEEKLY_REPORT_DASHBOARD_URL", DEFAULT_DASHBOARD_URL)
    time_zone = os.environ.get("WEEKLY_REPORT_TIME_ZONE", DEFAULT_TIME_ZONE)

    now = datetime.now(ZoneInfo(time_zone))
    data = fetch_analytics(analytics_url)
    subject, report = build_report(data, now, dashboard_url)
    message = build_message(username, recipient, subject, report)
    send_message(message, username, app_password)
    print(f"Weekly analytics email sent to {recipient} for {period_label(now, integer(data.get('range_days', 7)))}")


if __name__ == "__main__":
    main()
