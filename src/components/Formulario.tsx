import { useState } from "react";
import type Participante from "../models/Participante";

/**Le hago saber como funciona el prop que viene de app */
interface FormularioProps {
  onAgregar: (nuevoParticipante: Participante) => void;
}

export default function Formulario({ onAgregar }: FormularioProps) { // <-- FALTABAN LAS LLAVES
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    edad: "",
    pais: "Argentina",
    modalidad: "",
    tecnologias: [] as string[],
    nivel: "principiante",
    aceptaTerminos: false,
  });

  // CASCARONES VACIOS PARA QUE NO TIRE ERROR EL HTML
  const handleChange = (e: any) => {
    // Acá vamos a armar el código nuevo después
  };

  const handleRegistrar = (e: any) => {
    e.preventDefault();
    // Acá vamos a armar el código nuevo después
  };

  return (
    // 1. Contenedor principal ancho pero con márgenes laterales (px-8) y separado de arriba (mt-8)
    <div className="w-full max-w-4xl mx-auto px-8 mt-8">
      <form className="flex flex-col gap-6 border border-gray-200 p-4 shadow-sm rounded">
        {/* --- SECCIÓN 1: INPUTS ---*/}
        <div className="grid grid-cols-2 gap-6 w-full">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formData.edad}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <select
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
          >
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Mexico">Mexico</option>
            <option value="España">España</option>
          </select>
        </div>

        {/* --- SECCIÓN 2: MODALIDAD --- */}
        <div>
          <p className="text-lg font-bold">Modalidad</p>
          <br />
          <input
            type="radio"
            id="presencial"
            name="modalidad"
            value="presencial"
            checked={formData.modalidad === "presencial"}
            onChange={handleChange}
            className="p-7 mr-2"
          />
          <label htmlFor="presencial" className="pr-5">
            Presencial
          </label>

          <input
            type="radio"
            id="virtual"
            name="modalidad"
            value="virtual"
            checked={formData.modalidad === "virtual"}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="virtual" className="pr-5">
            Virtual
          </label>

          <input
            type="radio"
            id="hibrido"
            name="modalidad"
            value="hibrido"
            checked={formData.modalidad === "hibrido"}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="hibrido" className="pr-5">
            Hibrido
          </label>
        </div>

        {/* --- SECCIÓN 3: TECNOLOGÍAS --- */}
        <p className="text-lg font-bold">Tecnologias</p>
        <div className="grid grid-cols-[auto_auto_auto] justify-between gap-y-4 gap-x-12 mt-2 w-4/5 mx-auto text-lg font-medium">
          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id="check-react"
              name="tecnologias"
              value="react"
              checked={formData.tecnologias.includes("react")}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="check-react" className="cursor-pointer">
              React
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id="check-angular"
              name="tecnologias"
              value="angular"
              checked={formData.tecnologias.includes("angular")}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="check-angular" className="cursor-pointer">
              Angular
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id="check-vue"
              name="tecnologias"
              value="vue"
              checked={formData.tecnologias.includes("vue")}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="check-vue" className="cursor-pointer">
              Vue
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id="check-node"
              name="tecnologias"
              value="node"
              checked={formData.tecnologias.includes("node")}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="check-node" className="cursor-pointer">
              Node
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id="check-python"
              name="tecnologias"
              value="python"
              checked={formData.tecnologias.includes("python")}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="check-python" className="cursor-pointer">
              Python
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id="check-java"
              name="tecnologias"
              value="java"
              checked={formData.tecnologias.includes("java")}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="check-java" className="cursor-pointer">
              Java
            </label>
          </div>
        </div>
        <select
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
        >
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>

        {/* --- SECCIÓN 4: REGISTRO --- */}
        <div className="flex gap-4 flex-col mt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="check-aceptar"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="check-aceptar" className="cursor-pointer">
              Acepto términos
            </label>
          </div>
          <button
            onClick={handleRegistrar}
            className="w-fit px-10 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold shadow-sm"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
