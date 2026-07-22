from datetime import date, timedelta
from typing import List

def split_roadmap_text(raw_text: str) -> List[str]:
    lines = raw_text.split("\n")
    cleaned = [line.strip() for line in lines]
    return [line for line in cleaned if line]


def map_tasks_to_dates(lines: List[str], start_date: date, tasks_per_day: int) -> List[dict]:
    mapped = []
    for i, line in enumerate(lines):
        day_offset = i // tasks_per_day
        scheduled_date = start_date + timedelta(days=day_offset)
        mapped.append({
            "text": line,
            "scheduled_date": scheduled_date
        })
    return mapped

