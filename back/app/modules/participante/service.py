from sqlmodel import Session, select
from typing import List
from .model import Participante
from . import schema

def get_all_participantes(session: Session) -> List[schema.ParticipanteResponse]:
    db_participantes = session.exec(select(Participante)).all()
    
    # Hacemos el mapeo acá, el servicio se encarga de masticar los datos
    response = []
    for p in db_participantes:
        tecs = p.tecnologias.split(",") if p.tecnologias else []
        response.append(
            schema.ParticipanteResponse(
                id=p.id,
                nombre=p.nombre,
                email=p.email,
                edad=p.edad,
                pais=p.pais,
                modalidad=p.modalidad,
                nivel=p.nivel,
                aceptaTerminos=p.aceptaTerminos,
                tecnologias=tecs
            )
        )
    return response

def create_participante(participante_in: schema.ParticipanteCreate, session: Session) -> schema.ParticipanteResponse:
    # El servicio se encarga de acomodar el string para SQLite
    tecs_str = ",".join(participante_in.tecnologias)
    
    nuevo_db = Participante(
        nombre=participante_in.nombre,
        email=participante_in.email,
        edad=participante_in.edad,
        pais=participante_in.pais,
        modalidad=participante_in.modalidad,
        nivel=participante_in.nivel,
        aceptaTerminos=participante_in.aceptaTerminos,
        tecnologias=tecs_str
    )
    
    session.add(nuevo_db)
    session.commit()
    session.refresh(nuevo_db)
    
    # Y devuelve ya el Schema listo para FastAPI/React
    return schema.ParticipanteResponse(
        id=nuevo_db.id,
        nombre=nuevo_db.nombre,
        email=nuevo_db.email,
        edad=nuevo_db.edad,
        pais=nuevo_db.pais,
        modalidad=nuevo_db.modalidad,
        nivel=nuevo_db.nivel,
        aceptaTerminos=nuevo_db.aceptaTerminos,
        tecnologias=nuevo_db.tecnologias.split(",") if nuevo_db.tecnologias else []
    )

def delete_participante(participante_id: int, session: Session) -> bool:
    db_participante = session.get(Participante, participante_id)
    if db_participante:
        session.delete(db_participante)
        session.commit()
        return True
    return False
