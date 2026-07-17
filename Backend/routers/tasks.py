from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date as date_type
from typing import Optional, List

from database import get_db
from models import Task
from schemas import TaskCreate, TaskUpdate, TaskOut

from auth import get_current_user
from models import User

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(
        user_id=1,  # temporary — real user comes in Phase 5 with auth
        text=task.text,
        category=task.category,
        roadmap_name=task.roadmap_name,
        scheduled_date=task.scheduled_date,
        original_date=task.scheduled_date,
        source=task.source,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.get("/", response_model=List[TaskOut])
def list_tasks(
    date: Optional[date_type] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Task)
    if date:
        query = query.filter(Task.scheduled_date == date)
    if category:
        query = query.filter(Task.category == category)
    return query.all()


@router.patch("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, updates: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if updates.text is not None:
        task.text = updates.text
    if updates.done is not None:
        task.done = updates.done
    if updates.scheduled_date is not None:
        task.scheduled_date = updates.scheduled_date

    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"status": "ok", "message": f"Task {task_id} deleted"}


@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_task = Task(
        user_id=current_user.id,
        text=task.text,
        category=task.category,
        roadmap_name=task.roadmap_name,
        scheduled_date=task.scheduled_date,
        original_date=task.scheduled_date,
        source=task.source,

    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.get("/", response_model=List[TaskOut])
def list_tasks(
    date: Optional[date_type] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Task).filter(Task.User_id == current_user.id)
    if date:
        query = query.filter(Task.scheduled_date == date)
    if category:
        query = query.filter(Task.category == category)
    return query.all()

    
