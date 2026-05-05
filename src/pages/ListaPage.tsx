import { useState, useContext } from "react";
import { ParticipantesContext } from "../context/ParticipantesContext";
import { filtrarParticipantes } from "../utils/filtros";
import Busqueda from "../components/Busqueda";
import TarjetaParticipantes from "../components/TarjetaParticipante";

export default function ListaPage() {
  // 1. Traemos los datos del contexto global
  const { participantes, cargando } = useContext(ParticipantesContext);

  // 2. Estado local para los filtros (se queda en la página, no en el contexto)
  const [filtros, setFiltros] = useState({
    texto: "",
    modalidad: "",
    nivel: "",
  });

  // 3. Aplicamos el filtro a la lista
  const listaFiltrada = filtrarParticipantes(participantes, filtros);

  // 4. Lógica de renderizado condicional (Cargando, Vacío, Resultados)
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
    contenidoLista = listaFiltrada.map((persona) => (
      <TarjetaParticipantes key={persona.id} participante={persona} />
    ));
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-start bg-white pb-20">
      {/* Buscador */}
      <Busqueda filtros={filtros} onFiltrar={setFiltros} />

      {/* Listado de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
        {contenidoLista}
      </div>
    </div>
  );
}
