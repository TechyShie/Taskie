from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Task, User
from schemas import RoadmapCreate, TaskOut
from auth import get_current_user
from roadmap_logic import split_roadmap_text, map_tasks_to_dates

router = APIRouter(prefix="/roadmaps", tags=["roadmaps"])


@router.post("/", response_model=List[TaskOut])
def create_roadmap(
    roadmap: RoadmapCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    lines = split_roadmap_text(roadmap.raw_text)
    mapped = map_tasks_to_dates(lines, roadmap.start_date, roadmap.tasks_per_day)

    created_tasks = []
    for item in mapped:
        new_task = Task(
            user_id=current_user.id,
            text=item["text"],
            category="roadmap",
            roadmap_name=roadmap.roadmap_name,
            scheduled_date=item["scheduled_date"],
            original_date=item["scheduled_date"],
            source="roadmap_paste",
        )
        db.add(new_task)
        created_tasks.append(new_task)

    db.commit()
    for task in created_tasks:
        db.refresh(task)

    return created_tasks