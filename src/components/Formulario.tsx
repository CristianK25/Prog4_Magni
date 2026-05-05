import { useState, useContext, useEffect } from "react";
import type Participante from "../models/Participante";
import { ParticipantesContext } from "../context/ParticipantesContext";

export default function Formulario({ onSuccess }: { onSuccess?: () => void }) {
  const { agregar, editar, participanteSeleccionado, seleccionarParaEdicion } = useContext(ParticipantesContext);
  // El estado donde tenemos el borrador de nuestro formulario
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

  useEffect(() => {
    if (participanteSeleccionado) {
      setFormData({
        nombre: participanteSeleccionado.nombre,
        email: participanteSeleccionado.email,
        edad: participanteSeleccionado.edad.toString(),
        pais: participanteSeleccionado.pais,
        modalidad: participanteSeleccionado.modalidad,
        tecnologias: participanteSeleccionado.tecnologias,
        nivel: participanteSeleccionado.nivel,
        aceptaTerminos: participanteSeleccionado.aceptaTerminos,
      });
    } else {
      setFormData({
        nombre: "",
        email: "",
        edad: "",
        pais: "Argentina",
        modalidad: "",
        tecnologias: [],
        nivel: "principiante",
        aceptaTerminos: false,
      });
    }
  }, [participanteSeleccionado]);

  // =============== FUNCIONES ESPECÍFICAS Y CLARAS ===============

  // Esta funcion SOLO se encarga de entender los checkboxes de las tecnologías
  // Si le pasas "react" y "true", lo suma a la bolsa. Si le pasas "react" y "false", lo saca.
  const manejarTecnologias = (tecnologia: string, estaChequeado: boolean) => {
    if (estaChequeado) {
      setFormData({
        ...formData,
        tecnologias: [...formData.tecnologias, tecnologia],
      });
    } else {
      setFormData({
        ...formData,
        tecnologias: formData.tecnologias.filter((tec) => tec !== tecnologia),
      });
    }
  };

  // Esta funcion junta todo, valida y se lo tira al Contexto
  const botonRegistrarClickeado = async (e: React.FormEvent) => {
    e.preventDefault(); // Frena la recarga molesta de la pagina

    // Validacion boba y simple
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.edad ||
      !formData.modalidad ||
      formData.tecnologias.length === 0 ||
      !formData.aceptaTerminos
    ) {
      alert("Por favor, completa todos los campos y acepta los términos.");
      return; // Lo corta acá, lo de abajo no se ejecuta
    }

    // Armamos el paquetito oficial que espera el backend (Ojo: convertimos edad a Number)
    const participanteArmado = {
      nombre: formData.nombre,
      email: formData.email,
      edad: Number(formData.edad),
      pais: formData.pais,
      modalidad: formData.modalidad,
      nivel: formData.nivel,
      tecnologias: formData.tecnologias,
      aceptaTerminos: formData.aceptaTerminos,
    };

    if (participanteSeleccionado) {
      await editar(participanteSeleccionado.id, participanteArmado);
      seleccionarParaEdicion(null); // Sale del modo edición
    } else {
      await agregar(participanteArmado);
      setFormData({
        nombre: "",
        email: "",
        edad: "",
        pais: "Argentina",
        modalidad: "",
        tecnologias: [],
        nivel: "principiante",
        aceptaTerminos: false,
      });
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  const cancelarEdicion = () => {
    seleccionarParaEdicion(null);
  };

  const opcionesModalidad = [
    { valor: "presencial", etiqueta: "Presencial" },
    { valor: "virtual", etiqueta: "Virtual" },
    { valor: "hibrido", etiqueta: "Híbrido" },
  ];

  const opcionesTecnologias = [
    {valor:"react", etiqueta: "React"},
    {valor:"angular", etiqueta: "Angular"},
    {valor:"vue", etiqueta: "Vue"},
    {valor:"node", etiqueta: "Node"},
    {valor:"python", etiqueta: "Python"},
    {valor:"java", etiqueta: "Java"},
  ]
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
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formData.edad}
            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <select
            name="pais"
            value={formData.pais}
            onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
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

          {opcionesModalidad.map((opcion) => (
            <span key={opcion.valor}>
              <input
                type="radio"
                id={opcion.valor}
                name="modalidad"
                value={opcion.valor}
                checked={formData.modalidad === opcion.valor}
                onChange={(e) =>
                  setFormData({ ...formData, modalidad: e.target.value })
                }
                className="mr-2"
              />
              <label htmlFor={opcion.valor} className="pr-5">
                {opcion.etiqueta}
              </label>
            </span>
          ))}
        </div>

        {/* --- SECCIÓN 3: TECNOLOGÍAS --- */}
        <p className="text-lg font-bold">Tecnologias</p>
        <div className="grid grid-cols-[auto_auto_auto] justify-between gap-y-4 gap-x-12 mt-2 w-4/5 mx-auto text-lg font-medium">
          {opcionesTecnologias.map((opcion) => (
            <div key={opcion.valor} className="flex items-center gap-1.5">
              <input
                type="checkbox"
                id={opcion.valor}
                name="tecnologia"
                value={opcion.valor}
                checked={formData.tecnologias.includes(opcion.valor)}
                onChange={(e) => manejarTecnologias(opcion.valor, e.target.checked)}
                className="cursor-pointer"
              />
              <label htmlFor={opcion.valor}> {opcion.etiqueta} </label>
            </div>
          ))}
        </div>
        
        <select
          name="nivel"
          value={formData.nivel}
          onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
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
              checked={formData.aceptaTerminos}
              onChange={(e) =>
                setFormData({ ...formData, aceptaTerminos: e.target.checked })
              }
              className="cursor-pointer"
            />
            <label htmlFor="check-aceptar" className="cursor-pointer">
              Acepto términos
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={botonRegistrarClickeado}
              className="w-fit px-10 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold shadow-sm"
            >
              {participanteSeleccionado ? "Actualizar" : "Registrar"}
            </button>
            {participanteSeleccionado && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="w-fit px-10 py-2 rounded-md bg-gray-500 hover:bg-gray-600 transition-colors text-white font-semibold shadow-sm"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
