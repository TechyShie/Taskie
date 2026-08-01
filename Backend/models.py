from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    tasks = relationship("Task", back_populates="owner")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    text = Column(String, nullable=False)
    category = Column(String, default="personal")
    roadmap_name = Column(String, nullable=True)


    scheduled_date = Column(Date, nullable=False)
    original_date = Column(Date, nullable=False)
    rolled_from = Column(Date, nullable=True)

    done = Column(Boolean, default=False)
    source = Column(String, default="manual")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="tasks")


    class UserStats(Base):
        __tablename__ = "user_stats"

        id = Column(Integer, primary_key=True, index=True)
        user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
        stars = Column(Integer, default=0)
        current_streak = Column(Integer, default=0)
        longest_streak = Column(Integer, default=0)
        last_processed_date = Column(Date, nullable=True)

        owner = relationship("User")


    

