import { useState, useContext } from "react";
import Formulario from "./components/Formulario";
import Busqueda from "./components/Busqueda";
import TarjetaParticipantes from "./components/TarjetaParticipante";
import { ParticipantesContext } from "./context/ParticipantesContext";
import { filtrarParticipantes } from "./utils/filtros";

function App() {
  // ACÁ ESTÁ LA MAGIA: App ya no maneja los estados de participantes. Los pide directo de la nube.
  const { participantes, cargando } = useContext(ParticipantesContext);

  const [filtros, setFiltros] = useState({
    texto: "",
    modalidad: "",
    nivel: "",
  });

  // Usamos nuestra función pura y limpia de utils para filtrar
  const listaFiltrada = filtrarParticipantes(participantes, filtros);

  let contenidoLista;

  if (cargando) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">
        Cargando participantes, bancame un toque...
      </div>
    );
  } else if (participantes.length === 0) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">
        No hay participantes aún. ¡Agregá el primero!
      </div>
    );
  } else if (listaFiltrada.length === 0) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">
        No se encontraron resultados para esos filtros.
      </div>
    );
  } else {
    // Acá mapeamos el EMBUDO (listaFiltrada) y le pasamos EL OBJETO ENTERO, como pidió el profe
    contenidoLista = listaFiltrada.map((persona) => (
      <TarjetaParticipantes
        key={persona.id}
        participante={persona}
      />
    ));
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-start bg-white pb-20">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-left mb-6 bg-green-500 px-5 py-2">
          Registro de Participantes
        </h1>
        <p className="px-5 py-0 font-semibold text-lg text-center">
          Participantes Registrados: {participantes.length}
        </p>
      </div>

      {/* Formulario ya no recibe props. Se las arregla solo usando Context */}
      <Formulario />

      <Busqueda filtros={filtros} onFiltrar={setFiltros} />

      <div className="grid grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
        {contenidoLista}
      </div>
    </div>
  );
}

export default App;
