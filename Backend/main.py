from fastapi import FastAPI
from sqlalchemy import text
from database import engine
from routers import tasks

app = FastAPI()

app.include_router(tasks.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Taskie backend is alive"}

@app.get("/db-health")
def db_health_check():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return {"status": "ok", "message": "Database connection successful"}