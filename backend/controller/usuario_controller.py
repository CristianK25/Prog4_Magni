from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Importamos nuestros schemas
from schema.usuario_schema import UsuarioCreate, UsuarioResponse
# Importamos la conexión a la BD
from database import SessionLocal

# 1. AHORA SÍ importamos el servicio:
import service.usuario_service as usuario_service

# Creamos el enrutador
router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

# Dependencia para obtener la sesión de la base de datos en cada petición
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. POST: Ingresar un nuevo usuario
@router.post("/", response_model=UsuarioResponse)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    # Aquí llamamos al servicio real
    return usuario_service.crear_usuario(db=db, usuario=usuario)

# 2. GET: Obtener todos los usuarios
@router.get("/", response_model=List[UsuarioResponse])
def obtener_usuarios(db: Session = Depends(get_db)):
    # Aquí llamamos al servicio real
    return usuario_service.obtener_todos(db=db)

# 3. GET: Buscar usuario por nombre de usuario (usuario)
@router.get("/{nombre_usuario}", response_model=UsuarioResponse)
def obtener_usuario_por_nombre(nombre_usuario: str, db: Session = Depends(get_db)):
    # Aquí llamamos al servicio real
    user = usuario_service.obtener_por_nombre(db=db, nombre_usuario=nombre_usuario)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

# 4. PUT: Actualizar el estado de bloqueo de un usuario
@router.put("/{usuario_id}/bloquear", response_model=UsuarioResponse)
def actualizar_bloqueo(usuario_id: int, bloqueado: str, db: Session = Depends(get_db)):
    # Validamos rápidamente que solo manden Y o N
    if bloqueado not in ["Y", "N"]:
        raise HTTPException(status_code=400, detail="El valor debe ser 'Y' o 'N'")
    
    # Aquí llamamos al servicio real
    user = usuario_service.actualizar_bloqueo(db=db, usuario_id=usuario_id, bloqueado=bloqueado)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user
