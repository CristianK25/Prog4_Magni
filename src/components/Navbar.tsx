import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ParticipantesContext } from "../context/ParticipantesContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { participantes } = useContext(ParticipantesContext);
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Si no hay usuario (estamos en login o publica), mostramos un navbar simplificado o nada
  if (!user) {
    return (
      <nav className="w-full bg-green-500 shadow-sm mb-4 px-5 py-3 flex justify-between items-center">
        <Link to="/publica" className="text-2xl font-bold text-black">Registro de Participantes</Link>
        <Link to="/login" className="bg-white text-green-600 px-4 py-1 rounded font-bold">Login</Link>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white shadow-sm mb-4 sticky top-0 z-50">
      {/* Barra Principal Verde */}
      <div className="bg-green-500 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-black hover:scale-110 transition-transform cursor-pointer focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <Link
            to="/lista"
            onClick={() => setIsOpen(false)}
            className="text-2xl sm:text-3xl font-bold text-left text-black hover:opacity-80 transition-opacity"
          >
            Registro de Participantes
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block text-black font-medium">Hola, <b>{user.username}</b> ({user.rol})</span>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-bold transition-colors shadow-md"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Menú Desplegable */}
      <div className={`overflow-hidden transition-all duration-300 bg-green-600 ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col p-4 gap-3">
          <Link 
            to="/lista" 
            onClick={() => setIsOpen(false)}
            className="text-white font-semibold hover:bg-green-700 p-2 rounded transition-colors"
          >
            📋 Lista de Participantes
          </Link>
          {user.rol === "ADMIN" && (
            <Link 
              to="/nuevo" 
              onClick={() => setIsOpen(false)}
              className="text-white font-semibold hover:bg-green-700 p-2 rounded transition-colors"
            >
              ➕ Nuevo Participante
            </Link>
          )}
          <Link 
            to="/publica" 
            onClick={() => setIsOpen(false)}
            className="text-white font-semibold hover:bg-green-700 p-2 rounded transition-colors"
          >
            🌐 Página Pública
          </Link>
        </div>
      </div>

      {/* Barra de Estadísticas */}
      <div className="flex justify-between items-center px-10 py-4 max-w-4xl mx-auto w-full">
        <p className="font-semibold text-lg text-gray-700">
          Participantes Registrados: {participantes.length}
        </p>
        {user.rol === "ADMIN" && (
          <Link
            to="/nuevo"
            className="hidden sm:block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-bold transition-colors"
          >
            + Nuevo Participante
          </Link>
        )}
      </div>
    </nav>
  );
}
