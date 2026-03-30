from sqlalchemy import Column, Integer, String, CHAR
from database import Base # Importamos la 'Base' que creamos antes

class Usuario(Base):
    # 1. Definimos el nombre exacto que tendrá la tabla en la BD
    __tablename__ = "usuarios_utn"

    # 2. Definimos las columnas según tus especificaciones
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    usuario = Column(String(20), unique=True, index=True, nullable=False)
    clave = Column(String(20), nullable=False)
    apellido = Column(String(50), nullable=False)
    nombre = Column(String(50), nullable=False)
    bloqueado = Column(CHAR(1), default="N") # 'Y' o 'N'
