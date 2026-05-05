import { useContext } from "react";
import { Link } from "react-router-dom";
import { ParticipantesContext } from "../context/ParticipantesContext";

export default function Navbar() {
  const { participantes } = useContext(ParticipantesContext);

  return (
    <div className="w-full bg-white shadow-sm mb-4">
      <div className="bg-green-500 px-5 py-3 flex items-center gap-4">
        <button className="text-black hover:scale-110 transition-transform cursor-pointer">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link
          to="/"
          className="text-3xl font-bold text-left text-black hover:opacity-80 transition-opacity"
        >
          Registro de Participantes
        </Link>
      </div>
      <div className="flex justify-between items-center px-10 py-4 max-w-4xl mx-auto w-full">
        <p className="font-semibold text-lg text-gray-700">
          Participantes Registrados: {participantes.length}
        </p>
        <Link
          to="/nuevo"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-bold transition-colors"
        >
          + Nuevo Participante
        </Link>
      </div>
    </div>
  );
}
