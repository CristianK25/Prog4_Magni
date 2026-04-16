from pydantic import BaseModel
from typing import List

# El Schema sirve para decirle a FastAPI qué datos ESPERAR de React
# y qué datos DEVOLVERLE a React. Pydantic hace la validación mágica.

class ParticipanteBase(BaseModel):
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    nivel: str
    aceptaTerminos: bool
    tecnologias: List[str] # Fijate que acá SÍ es una Lista, como quiere React

class ParticipanteCreate(ParticipanteBase):
    pass

class ParticipanteResponse(ParticipanteBase):
    id: int
