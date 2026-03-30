from sqlalchemy.orm import Session
from model.usuario_model import Usuario
from schema.usuario_schema import UsuarioCreate

# 1. POST: Ingresar un nuevo usuario
def crear_usuario(db: Session, usuario: UsuarioCreate):
    # Creamos una instancia de nuestro modelo de base de datos
    # usamos **usuario.model_dump() para extraer los datos del Schema
    db_usuario = Usuario(**usuario.model_dump())
    
    # Lo agregamos a la sesión (equivalente a armar el "INSERT en SQL")
    db.add(db_usuario)
    
    # Hacemos el commit (ejecutamos realmente el cambio en la base de datos)
    db.commit()
    
    # Refrescamos para obtener el ID recién generado y otros campos por defecto
    db.refresh(db_usuario)
    return db_usuario

# 2. GET: Obtener todos los usuarios
def obtener_todos(db: Session):
    # Equivalente a: SELECT * FROM usuarios_utn
    return db.query(Usuario).all()

# 3. GET: Buscar usuario por nombre de usuario
def obtener_por_nombre(db: Session, nombre_usuario: str):
    # Equivalente a: SELECT * FROM usuarios_utn WHERE usuario = 'nombre_usuario'
    return db.query(Usuario).filter(Usuario.usuario == nombre_usuario).first()

# 4. PUT: Actualizar el estado de bloqueo de un usuario
def actualizar_bloqueo(db: Session, usuario_id: int, bloqueado: str):
    # Primero buscamos si el usuario existe por ID
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    
    # Si existe, actualizamos su campo y guardamos
    if db_usuario:
        db_usuario.bloqueado = bloqueado
        db.commit()
        db.refresh(db_usuario)
        
    return db_usuario

# 5. LOGIN: Validar usuario y contraseña
def login(db: Session, user: str, password: str):
    """
    Busca el usuario por nombre y verifica la clave.
    Retorna una tupla (exito: bool, mensaje: str)
    """
    db_usuario = db.query(Usuario).filter(Usuario.usuario == user).first()
    
    if not db_usuario:
        return (False, "Ingreso Invalido, usuario y/o clave incorrecta")
    
    if db_usuario.clave != password:
        return (False, "Ingreso Invalido, usuario y/o clave incorrecta")
    
    if db_usuario.bloqueado == "Y":
        return (False, "El usuario se encuentra bloqueado")
    
    return (True, f"Ingreso Valido. Usuario {user}")

# 6. BUSCAR: Buscar usuarios con LIKE (filtro parcial)
def buscar_usuarios(db: Session, filtro: str):
    """
    Si hay filtro, busca usuarios cuyo nombre de usuario contenga el texto (LIKE).
    Si no hay filtro, devuelve todos.
    """
    if filtro:
        return db.query(Usuario).filter(Usuario.usuario.like(f"%{filtro}%")).all()
    else:
        return db.query(Usuario).all()

