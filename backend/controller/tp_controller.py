from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

# Importamos nuestros schemas
from schema.usuario_schema import RespuestaGeneral, UsuarioResponse
# Importamos la conexión a la BD
from database import SessionLocal

# Importamos el servicio
import service.usuario_service as usuario_service

# Creamos el enrutador con el prefijo /tp1 (como pide el TP)
router = APIRouter(
    prefix="/tp1",
    tags=["TP1 - Endpoints del Trabajo Práctico"]
)

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================================================
# ENDPOINT 1: LOGIN
# GET /tp1/login?user=mjmartinez&pass=123456
# ============================================================
@router.get("/login", response_model=RespuestaGeneral)
def login(
    user: str = Query(..., description="Nombre de usuario"),
    # Usamos alias porque 'pass' es palabra reservada en Python
    password: str = Query(..., alias="pass", description="Contraseña"),
    db: Session = Depends(get_db)
):
    exito, mensaje = usuario_service.login(db=db, user=user, password=password)
    
    if exito:
        return {"respuesta": "OK", "mje": mensaje}
    else:
        return {"respuesta": "ERROR", "mje": mensaje}


# ============================================================
# ENDPOINT 2: LISTA (Buscar + Bloquear/Desbloquear)
# GET /tp1/lista?action=BUSCAR
# GET /tp1/lista?action=BUSCAR&usuario=si
# GET /tp1/lista?action=BLOQUEAR&idUser=121&estado=Y
# GET /tp1/lista?action=BLOQUEAR&idUser=121&estado=N
# ============================================================
@router.get("/lista")
def lista(
    action: str = Query(..., description="Acción: BUSCAR o BLOQUEAR"),
    usuario: Optional[str] = Query(None, description="Filtro de búsqueda por usuario (LIKE)"),
    idUser: Optional[int] = Query(None, description="ID del usuario a bloquear/desbloquear"),
    estado: Optional[str] = Query(None, description="Estado: Y (bloquear) o N (desbloquear)"),
    db: Session = Depends(get_db)
):
    # --- ACCIÓN: BUSCAR ---
    if action == "BUSCAR":
        usuarios = usuario_service.buscar_usuarios(db=db, filtro=usuario)
        # Retornamos el array de usuarios mapeando a diccionarios
        # IMPORTANTE: No incluimos la 'clave' por seguridad y para cumplir el TP
        return [
            {
                "id": str(u.id),  # El TP lo muestra como string en el ejemplo
                "usuario": u.usuario,
                "apellido": u.apellido,
                "nombre": u.nombre,
                "bloqueado": u.bloqueado
            }
            for u in usuarios
        ]

    # --- ACCIÓN: BLOQUEAR / DESBLOQUEAR ---
    elif action == "BLOQUEAR":
        # Validamos que vengan los parámetros necesarios
        if idUser is None or estado is None:
            return {"respuesta": "ERROR", "mje": "Faltan parámetros: idUser y estado son obligatorios"}
        
        if estado not in ["Y", "N"]:
            return {"respuesta": "ERROR", "mje": "El valor de estado debe ser 'Y' o 'N'"}
        
        try:
            user = usuario_service.actualizar_bloqueo(db=db, usuario_id=idUser, bloqueado=estado)
            if not user:
                return {"respuesta": "ERROR", "mje": "Usuario no encontrado"}
            return {"respuesta": "OK", "mje": "Bloqueo Exitoso"}
        except Exception as e:
            return {"respuesta": "ERROR", "mje": str(e)}

    else:
        return {"respuesta": "ERROR", "mje": f"Acción '{action}' no reconocida"}
