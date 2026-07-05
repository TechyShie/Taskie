"""
sqlalchemy — an ORM (Object-Relational Mapper). This is the important concept: instead of writing raw SQL strings everywhere, you write Python classes, and SQLAlchemy translates your Python code into SQL behind the scenes. It's the middle-man between your FastAPI code and the actual database.
psycopg2-binary — the low-level "driver" that actually knows how to speak Postgres's specific network protocol. SQLAlchemy is the middle-man; psycopg2 is what it uses to physically send/receive data from Postgres.
alembic — handles migrations: a way of tracking changes to your database structure over time (like git, but for your table schema) so you can evolve your tables without manually rewriting SQL by hand every time. We'll use this properly in the next phase once we define actual tables.
"""