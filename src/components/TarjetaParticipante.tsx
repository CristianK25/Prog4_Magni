// Definimos exactamente qué tipo de datos va a recibir nuestra tarjeta
interface PropsTarjeta {
  nombre: string;
  pais: string;
  modalidad: string;
  nivel: string;
  tecnologias: string;
}

export default function TarjetaParticipantes({
  nombre,
  pais,
  modalidad,
  nivel,
  tecnologias,
}: PropsTarjeta) {
  return (
    <div className="border border-gray-200 shadow-sm rounded p-4 bg-white">
      <p id="nombreParticipante" className="text-lg font-bold">
        {nombre}
      </p>
      <p id="paisParticipante">{pais}</p>
      <p id="modalidadParticipante">Modalidad: {modalidad}</p>
      <p id="nivelParticipante">Nivel: {nivel}</p>
      <p id="tecParticipante">{tecnologias}</p>
    </div>
  );
}
