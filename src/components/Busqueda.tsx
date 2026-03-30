export default function Busqueda() {
  return (
    <div className="grid grid-cols-3 m-4 mb-6 gap-2 w-full max-w-4xl mx-auto px-8 mt-8 border border-gray-200 p-4 shadow-sm rounded">
      <input
        type="text"
        placeholder="Buscar"
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      />
      <select
        name="modalidad"
        id="select-modalidad"
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      >
        <option value="presencial">Presencial</option>
        <option value="virtual">Virtual</option>
        <option value="hibrido">Hibrido</option>
      </select>
      <select
        name="nivel"
        id="select-nivel"
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      >
        <option value="principiante">Principiante</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>
    </div>
  );
}
