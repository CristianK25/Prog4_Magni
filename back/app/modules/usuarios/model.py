from sqlmodel import SQLModel, Field
from typing import Optional

class Usuario(SQLModel, table=True):
    """
    Representa la tabla 'usuarios_db' en la base de datos.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    password: str
    rol: str # "ADMIN" o "CONSULTA"
