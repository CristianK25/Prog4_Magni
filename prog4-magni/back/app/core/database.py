from sqlmodel import create_engine, Session, SQLModel
from typing import Generator

# Archivo local de SQLite
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# check_same_thread=False es necesario para SQLite con FastAPI
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

def create_db_and_tables():
    """Crea las tablas en la base de datos si no existen"""
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    """Provee una sesión de base de datos para los requests"""
    with Session(engine) as session:
        yield session
