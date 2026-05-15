from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
import jwt
from datetime import datetime

from app.core.database import get_session
from app.core.security import create_access_token
from app.core.config import settings
from . import service, schema

router = APIRouter(prefix="/auth", tags=["Auth"])

# Esto le dice a FastAPI de dónde sacar el token en los endpoints protegidos
# Apunta al endpoint de login (ajustado al prefijo /api que usás en main.py)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# --- ENDPOINT DE LOGIN ---
@router.post("/login", response_model=schema.TokenResponse)
def login(login_data: schema.LoginRequest, session: Session = Depends(get_session)):
    """
    Recibe usuario y password, valida y devuelve el JWT + info del usuario.
    """
    user = service.authenticate_user(login_data, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Creamos el token guardando el 'username' en el campo 'sub' (subject)
    access_token = create_access_token(data={"sub": user.username})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": user
    }

# --- DEPENDENCIAS DE SEGURIDAD ---

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    """
    Dependencia para validar el token JWT y devolver el usuario actual.
    Si el token es inválido o el usuario no existe, tira 401.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar el token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decodificamos el token usando nuestra SECRET_KEY
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception
    
    user = service.get_user_by_username(username, session)
    if user is None:
        raise credentials_exception
    
    return user

def get_current_admin_user(current_user: schema.UsuarioResponse = Depends(get_current_user)):
    """
    Dependencia extra que además de validar el token, chequea que el rol sea ADMIN.
    """
    if current_user.rol != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tenés los permisos necesarios para esta acción (Se requiere rol ADMIN)"
        )
    return current_user
