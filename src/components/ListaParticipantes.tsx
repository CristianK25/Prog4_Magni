import TarjetaParticipantes from "./TarjetaParticipante";

export default function ListaParticipantes() {
  // Array de prueba (Mock Data) para que veas cómo se renderizan las múltiples tarjetas solas
  const participantes = [
    { id: 1, nombre: "Juan Perez", pais: "Argentina", modalidad: "Presencial", nivel: "Intermedio", tecnologias: "React, Node" },
    { id: 2, nombre: "Ana Gómez", pais: "Chile", modalidad: "Virtual", nivel: "Avanzado", tecnologias: "Angular, Spring" },
    { id: 3, nombre: "Luis Negri", pais: "Brasil", modalidad: "Híbrido", nivel: "Principiante", tecnologias: "Python" }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
      {participantes.length === 0 ? (
        <div className="col-span-3 text-center">No hay participantes aun</div>
      ) : (
        participantes.map(persona => (
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
