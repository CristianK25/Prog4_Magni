import type { FiltrosBusqueda } from "../utils/filtros";

interface BusquedaProps {
  filtros: FiltrosBusqueda;
  onFiltrar: (nuevosFiltros: FiltrosBusqueda) => void;
}

export default function Busqueda({ filtros, onFiltrar }: BusquedaProps) {
  // Función para resetear todo a vacío
  const limpiarFiltros = () => {
    onFiltrar({
      texto: "",
      modalidad: "",
      nivel: "",
    });
  };

  // Como agregamos un botón, cambiamos grid-cols-3 a grid-cols-[1fr_1fr_1fr_auto] para que el botón ocupe lo mínimo
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center m-4 mb-6 gap-2 w-full max-w-4xl mx-auto px-8 mt-8 border border-gray-200 p-4 shadow-sm rounded bg-gray-50">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtros.texto}
        onChange={(e) => onFiltrar({ ...filtros, texto: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      />
      <select
        name="modalidad"
        id="select-modalidad"
        value={filtros.modalidad}
        onChange={(e) => onFiltrar({ ...filtros, modalidad: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      >
        <option value="">Todas las modalidades</option>
        <option value="presencial">Presencial</option>
        <option value="virtual">Virtual</option>
        <option value="hibrido">Híbrido</option>
      </select>
      <select
        name="nivel"
        id="select-nivel"
        value={filtros.nivel}
        onChange={(e) => onFiltrar({ ...filtros, nivel: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      >
        <option value="">Todos los niveles</option>
        <option value="principiante">Principiante</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>

      {/* Botón purificador */}
      <button
        onClick={limpiarFiltros}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm transition"
        title="Limpiar filtros"
      >
        Limpiar
      </button>
    </div>
  );
}
