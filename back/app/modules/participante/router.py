from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from app.core.database import get_session
from app.modules.usuarios.router import get_current_user, get_current_admin_user
from . import service, schema

router = APIRouter(prefix="/participantes", tags=["Participantes"])

@router.get("", response_model=List[schema.ParticipanteResponse])
def get_participantes(
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    return service.get_all_participantes(session)

@router.post("", response_model=schema.ParticipanteResponse)
def create_participante(
    participante_in: schema.ParticipanteCreate, 
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    return service.create_participante(participante_in, session)

@router.delete("/{participante_id}")
def delete_participante(
    participante_id: int, 
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    exito = service.delete_participante(participante_id, session)
    if not exito:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    return {"message": "Borrado con éxito campeón"}

@router.put("/{participante_id}", response_model=schema.ParticipanteResponse)
def update_participante(
    participante_id: int, 
    datos: schema.ParticipanteUpdate, 
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    actualizado = service.update_participante(participante_id, datos, session)
    if not actualizado:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    return actualizado
