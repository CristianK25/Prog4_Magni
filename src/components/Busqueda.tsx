// Le definimos a TS qué cositas vamos a recibir en la "mochila" de los props
interface BusquedaProps {
  filtros: {
    texto: string;
    modalidad: string;
    nivel: string;
  };
  onFiltrar: (nuevosFiltros: any) => void;
}

export default function Busqueda({ filtros, onFiltrar }: BusquedaProps) {
  return (
    <div className="grid grid-cols-3 m-4 mb-6 gap-2 w-full max-w-4xl mx-auto px-8 mt-8 border border-gray-200 p-4 shadow-sm rounded">
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
        <option value="">Cualquier modalidad</option>
        <option value="presencial">Presencial</option>
        <option value="virtual">Virtual</option>
        <option value="hibrido">Hibrido</option>
      </select>
      <select
        name="nivel"
        id="select-nivel"
        value={filtros.nivel}
        onChange={(e) => onFiltrar({ ...filtros, nivel: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      >
        <option value="">Cualquier nivel</option>
        <option value="principiante">Principiante</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>
    </div>
  );
}
