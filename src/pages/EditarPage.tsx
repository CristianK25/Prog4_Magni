import { useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ParticipantesContext } from "../context/ParticipantesContext";
import Formulario from "../components/Formulario";

export default function EditarPage() {
  // 1. Atrapamos el ID que viene en la URL (/editar/5)
  const { id } = useParams();
  const navigate = useNavigate();
  // 2. Traemos las herramientas del contexto
  const { participantes, seleccionarParaEdicion, cargando } =
    useContext(ParticipantesContext);

  // 3. Buscamos al participante cuando carga la página o cambia la lista
  useEffect(() => {
    // Solo buscamos si ya terminó de cargar la lista de la base de datos
    if (!cargando && participantes.length > 0) {
      const p = participantes.find((item) => item.id === Number(id));
      if (p) {
        seleccionarParaEdicion(p);
      }
    }
  }, [id, participantes, cargando, seleccionarParaEdicion]);

  // Si la página se refresca y todavía está pidiendo los datos al back, mostramos un aviso
  if (cargando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600">
            Buscando participante...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-start bg-white pb-20">
      <div className="w-full">
        {/* Usamos el fondo amarillo para que pegue con el botón de "Editar" de las tarjetas */}
        <h1 className="text-3xl font-bold text-left mb-6 bg-yellow-500 px-5 py-2 text-white">
          Modificar Participante
        </h1>
        <div className="px-10 max-w-4xl mx-auto w-full">
          <Link
            to="/"
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
          >
            ← Cancelar y volver al listado
          </Link>
        </div>
      </div>

      <div className="w-full mt-4">
        <Formulario onSuccess={() => navigate("/")} />
      </div>
    </div>
  );
}
