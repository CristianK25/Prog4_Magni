from sqlmodel import Session, select
from .model import Usuario
from . import schema
from app.core.security import get_password_hash, verify_password

def get_user_by_username(username: str, session: Session) -> Usuario:
    """Busca un usuario por su nombre de usuario"""
    return session.exec(select(Usuario).where(Usuario.username == username)).first()

def authenticate_user(login_data: schema.LoginRequest, session: Session):
    """
    Valida credenciales. 
    Devuelve el objeto Usuario si es válido, None si no.
    """
    user = get_user_by_username(login_data.username, session)
    if not user:
        return None
    
    if not verify_password(login_data.password, user.password):
        return None
        
    return user

def create_user(user_in: schema.UsuarioCreate, session: Session) -> Usuario:
    """Crea un nuevo usuario con la contraseña hasheada"""
    hashed_password = get_password_hash(user_in.password)
    db_user = Usuario(
        username=user_in.username,
        password=hashed_password,
        rol=user_in.rol
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user
