interface PropsTarjeta {
  id: number;
  nombre: string;
  pais: string;
  modalidad: string;
  nivel: string;
  tecnologias: string[];
  onEliminar: (id: number) => void;
}

export default function TarjetaParticipantes({
  id,
  nombre,
  pais,
  modalidad,
  nivel,
  tecnologias,
  onEliminar,
}: PropsTarjeta) {
  return (
    <div className="border border-gray-200 shadow-sm rounded p-4 bg-white">
      <p id="nombreParticipante" className="text-lg font-bold">
        {nombre}
      </p>
      <p id="paisParticipante">{pais}</p>
      <p id="modalidadParticipante">Modalidad: {modalidad}</p>
      <p id="nivelParticipante">Nivel: {nivel}</p>
      {/* SE JOINAN LOS ELEMENTOS DEL ARRAY CON UNA COMA Y ESPACIO PARA MOSTRARLOS LINDO */}
      <p id="tecParticipante">{tecnologias.join(", ")}</p>

      <button
        onClick={() => onEliminar(id)}
        className="mt-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
      >
        Eliminar
      </button>
    </div>
  );
}
