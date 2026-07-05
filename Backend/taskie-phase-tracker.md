# Taskie — Build Phase Tracker

Repo structure reminder:
```
taskie/
├── .gitignore
├── backend/     -- FastAPI, SQLAlchemy, Postgres connection, venv
└── frontend/    -- React app (not started yet)
```

---

## ✅ Phase 1 — FastAPI skeleton (DONE)
- [x] Created `taskie/` root with `backend/` and `frontend/` folders
- [x] `git init` at the root (one repo covers both halves)
- [x] Virtual env created + activated inside `backend/`
- [x] Installed `fastapi`, `uvicorn`, `python-dotenv`
- [x] Built `main.py` with a `/health` endpoint
- [x] Ran the server with `uvicorn main:app --reload`
- [x] Confirmed `/health` responds + explored `/docs`
- [x] `.gitignore` added, first commit made

**What this phase proved:** the backend "brain" exists and can respond to requests.

---

## ✅ Phase 2 — PostgreSQL connected (DONE)
- [x] Installed PostgreSQL (skipped Stack Builder — not needed)
- [x] Verified install via `psql -U postgres`
- [x] Created the actual `taskie` database (`CREATE DATABASE taskie;`)
- [x] Installed `sqlalchemy`, `psycopg2-binary`, `alembic`
- [x] Created `.env` inside `backend/` with `DATABASE_URL`
- [x] Created `database.py` — engine, SessionLocal, Base
- [x] Added `/db-health` endpoint, confirmed real connection to Postgres
- [x] Committed progress

**What this phase proved:** the "brain" (FastAPI) and "storage" (Postgres) can actually talk to each other.

---

## ⏳ Phase 3 — Data models: User & Task tables (NEXT)
- [ ] Define `User` model (SQLAlchemy class)
- [ ] Define `Task` model — including `category`, `scheduled_date`, `original_date`, `done`, `source`, `rolled_from`
- [ ] Set up Alembic migrations
- [ ] Run first migration, confirm tables exist in pgAdmin
- [ ] Commit

**Why it matters:** turns the empty `taskie` database into one that actually knows what a "task" or "user" is.

---

## Phase 4 — Core task API (CRUD)
- [ ] `POST /tasks` — create a task (manual entry first, no auth yet)
- [ ] `GET /tasks` — list tasks, with date/category filters
- [ ] `PATCH /tasks/{id}` — toggle done, edit text/date
- [ ] `DELETE /tasks/{id}`
- [ ] Test everything via `/docs`
- [ ] Commit

---

## Phase 5 — JWT authentication
- [ ] `POST /register` and `POST /login`
- [ ] Password hashing
- [ ] JWT token generation
- [ ] Protect task endpoints so they require a valid token
- [ ] Commit

---

## Phase 6 — Roadmap mapping logic
- [ ] `POST /roadmaps` — paste multi-line roadmap, auto-map to calendar dates
- [ ] Support tasks-per-day setting
- [ ] Tag tasks with `roadmap_name` / `category`
- [ ] Commit

---

## Phase 7 — Rollover + stars/streak logic
- [ ] Rollover check: compare `lastProcessedDate` to today, move incomplete tasks forward
- [ ] Star awarding logic (full day completed)
- [ ] Streak calculation + reset logic
- [ ] `GET /stats` endpoint
- [ ] Commit

---

## Phase 8 — React frontend, core
- [ ] Set up React project inside `frontend/`
- [ ] Calendar / heatmap view
- [ ] Task list with checkboxes, wired to the real API
- [ ] Manual + quick-add task forms
- [ ] Commit

---

## Phase 9 — React frontend, polish
- [ ] Progress bars (overall, per-category, daily)
- [ ] Category color coding
- [ ] Rolled-over task tagging in UI
- [ ] General styling pass
- [ ] Commit

---

## Phase 10 — Testing + bug fixing
- [ ] Manual end-to-end walkthrough of every feature
- [ ] Fix issues found
- [ ] Final commit + push
