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
  // Forma ultra simple: analizamos el texto que llegó en `nivel`
  // y armamos una variable con las clases de Tailwind correspondientes
  let colorNivel = "";

  if (nivel === "principiante") {
    colorNivel = "bg-green-200 text-green-900";
  } else if (nivel === "intermedio") {
    colorNivel = "bg-yellow-200 text-yellow-900";
  } else if (nivel === "avanzado") {
    colorNivel = "bg-red-200 text-red-900";
  }

  return (
    <div
      className={`border border-gray-200 shadow-sm rounded p-4 ${colorNivel}`}
    >
      <p id="nombreParticipante" className="text-lg font-bold">
        {nombre}
      </p>
      <p id="paisParticipante">{pais}</p>
      <p id="modalidadParticipante">Modalidad: {modalidad}</p>

      {/* Acá inyectamos la variable colorNivel adentro del className.
          El inline-block y el px-2 py-1 son para que parezca una pilorita (badge) */}
      <p
        className={`inline-block px-2 py-1 rounded font-semibold mt-2 mb-2 ${colorNivel}`}
      >
        Nivel: {nivel}
      </p>
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
