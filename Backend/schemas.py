from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


class TaskCreate(BaseModel):
    text: str
    category: Optional[str] = "personal"
    roadmap_name: Optional[str] = None
    scheduled_date: date
    source: Optional[str] = "manual"


class TaskUpdate(BaseModel):
    text: Optional[str] = None
    done: Optional[bool] = None
    scheduled_date: Optional[date] = None


class TaskOut(BaseModel):
    id: int
    text: str
    category: str
    roadmap_name: Optional[str]
    scheduled_date: date
    original_date: date
    rolled_from: Optional[date]
    done: bool
    source: str
    created_at: datetime

    class Config:
        from_attributes = True