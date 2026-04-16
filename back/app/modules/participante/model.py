from sqlmodel import SQLModel, Field
from typing import Optional

class Participante(SQLModel, table=True):
    """
    Representa la tabla 'participante' en la base de datos.
    Como SQLite no soporta Listas de forma nativa, las tecnologías 
    las guardaremos como un string separado por comas (ej: "react,node").
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    nivel: str
    aceptaTerminos: bool
    tecnologias: str 
