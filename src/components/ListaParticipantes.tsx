import TarjetaParticipantes from "./TarjetaParticipante";
import type Participante from "../models/Participante"; // <-- FALTABA EL IMPORT

interface ListaParticipanteProps {
  onEliminar: (idParticipante: number) => void;
  participantes: Participante[];
}

// FALTABAN LAS LLAVES {} PARA RECIBIR Y LA ACLARACION DEL TIPO
export default function ListaParticipantes({ onEliminar, participantes }: ListaParticipanteProps) {
  return (
    <div className="grid grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
      {participantes.length === 0 ? (
        <div className="col-span-3 text-center">No hay participantes aun</div>
      ) : (
        participantes.map((persona) => (
          <TarjetaParticipantes
            key={persona.id}
            nombre={persona.nombre}
            pais={persona.pais}
            modalidad={persona.modalidad}
            nivel={persona.nivel}
            tecnologias={persona.tecnologias}
          />
        ))
      )}
    </div>
  );
}
