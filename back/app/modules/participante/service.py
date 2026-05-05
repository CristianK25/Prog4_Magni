from sqlmodel import Session, select
from typing import List
from .model import Participante
from . import schema

def get_all_participantes(session: Session) -> List[schema.ParticipanteResponse]:
    db_participantes = session.exec(select(Participante)).all()
    
    # Mapeo dinámico: extraemos el diccionario y ajustamos el campo especial
    response = []
    for p in db_participantes:
        p_dict = p.model_dump()
        p_dict["tecnologias"] = p.tecnologias.split(",") if p.tecnologias else []
        response.append(schema.ParticipanteResponse(**p_dict))
    return response

def create_participante(participante_in: schema.ParticipanteCreate, session: Session) -> schema.ParticipanteResponse:
    # Extraemos todos los datos y convertimos la lista a string para SQLite
    create_data = participante_in.model_dump()
    create_data["tecnologias"] = ",".join(create_data["tecnologias"])
    
    # Creamos la instancia desempaquetando el diccionario completo
    nuevo_db = Participante(**create_data)
    
    session.add(nuevo_db)
    session.commit()
    session.refresh(nuevo_db)
    
    # Retornamos el schema usando mapeo dinámico
    response_dict = nuevo_db.model_dump()
    response_dict["tecnologias"] = nuevo_db.tecnologias.split(",") if nuevo_db.tecnologias else []
    return schema.ParticipanteResponse(**response_dict)

def delete_participante(participante_id: int, session: Session) -> bool:
    db_participante = session.get(Participante, participante_id)
    if db_participante:
        session.delete(db_participante)
        session.commit()
        return True
    return False

def update_participante(participante_id: int, datos: schema.ParticipanteUpdate, session: Session):
    # 1. Buscamos al participante en la BD por su ID
    db_participante = session.get(Participante, participante_id)
    
    # 2. Si no existe, devolvemos None para que el router sepa que hay que tirar 404
    if not db_participante:
        return None
    
    # 3. Extraemos los datos a actualizar del schema
    update_data = datos.model_dump(exclude_unset=True)
    
    if "tecnologias" in update_data:
        update_data["tecnologias"] = ",".join(update_data["tecnologias"])

    # 5. Aplicamos los cambios al objeto de la base de datos de una sola vez
    db_participante.sqlmodel_update(update_data)

    session.commit()
    session.refresh(db_participante)
    
    # 6. Devolvemos el schema usando mapeo dinámico
    response_dict = db_participante.model_dump()
    response_dict["tecnologias"] = db_participante.tecnologias.split(",") if db_participante.tecnologias else []
    return schema.ParticipanteResponse(**response_dict)
