from pydantic import BaseModel, Field
from typing import Optional

# Schema de respuesta genérica (lo que el TP exige para login y bloqueo)
class RespuestaGeneral(BaseModel):
    respuesta: str  # "OK" o "ERROR"
    mje: str        # Mensaje descriptivo

# 1. Base comun para todos
class UsuarioBase(BaseModel):
    usuario: str = Field(..., max_length=20, description="El nombre de usuario")
    apellido: str = Field(..., max_length=50)
    nombre: str = Field(..., max_length=50)
    bloqueado: Optional[str] = Field("N", max_length=1)

# 2. Schema para CREAR (Request)
# Hereda de UsuarioBase, pero aquí exigimos la contraseña
class UsuarioCreate(UsuarioBase):
    clave: str = Field(..., max_length=20)

# 3. Schema para RESPONDER (Response)
# Hereda de UsuarioBase, le suma el ID, pero NO incluye la clave
class UsuarioResponse(UsuarioBase):
    id: int
    
    # Esta configuración es clave: le dice a Pydantic que estos datos
    # pueden venir de un modelo de SQLAlchemy (un objeto, no un diccionario)
    class Config:
        from_attributes = True
