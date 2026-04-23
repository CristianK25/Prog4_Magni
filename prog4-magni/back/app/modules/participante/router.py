from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from app.core.database import get_session
from . import service, schema

router = APIRouter(prefix="/participantes", tags=["Participantes"])

@router.get("", response_model=List[schema.ParticipanteResponse])
def get_participantes(session: Session = Depends(get_session)):
    return service.get_all_participantes(session)

@router.post("", response_model=schema.ParticipanteResponse)
def create_participante(participante_in: schema.ParticipanteCreate, session: Session = Depends(get_session)):
    return service.create_participante(participante_in, session)

@router.delete("/{participante_id}")
def delete_participante(participante_id: int, session: Session = Depends(get_session)):
    exito = service.delete_participante(participante_id, session)
    if not exito:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    return {"message": "Borrado con éxito campeón"}

@router.put("/{participante_id}", response_model=schema.ParticipanteResponse)
def update_participante(participante_id: int, datos: schema.ParticipanteUpdate, session: Session = Depends(get_session)):
    actualizado = service.update_participante(participante_id, datos, session)
    if not actualizado:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    return actualizado
