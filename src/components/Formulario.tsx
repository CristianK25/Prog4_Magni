import { useState } from "react";
import type Participante from "../models/Participante";

/**Le hago saber como funciona el prop que viene de app */
interface FormularioProps {
  onAgregar: (nuevoParticipante: Participante) => void;
}

export default function Formulario({ onAgregar }: FormularioProps) {
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

  // Esta funcion junta todo, valida y se lo tira al App.tsx
  const botonRegistrarClickeado = (e: React.FormEvent) => {
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

    // Armamos el paquetito oficial que App.tsx espera (Ojo: convertimos edad a Number)
    const nuevoParticipante: Participante = {
      id: Date.now(), // Un ID super random usando la hora actual para que no se repitan
      nombre: formData.nombre,
      email: formData.email,
      edad: Number(formData.edad),
      pais: formData.pais,
      modalidad: formData.modalidad,
      nivel: formData.nivel,
      tecnologias: formData.tecnologias,
      aceptaTerminos: formData.aceptaTerminos,
    };

    // ¡Se lo tiramos al padre usando la mochila de las Props!
    onAgregar(nuevoParticipante);

    // Borrón y cuenta nueva: vaciamos todo para que pueda cargar a otro
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
  };

  const opcionesModalidad = [
    { valor: "presencial", etiqueta: "Presencial" },
    { valor: "virtual", etiqueta: "Virtual" },
    { valor: "hibrido", etiqueta: "Híbrido" },
  ];

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
        /**Refactorizado */
        <div>
          <p className="text-lg font-bold">Modalidad</p>
          <br />
          <input
            type="radio"
            id="presencial"
            name="modalidad"
            value="presencial"
            checked={formData.modalidad === "presencial"}
            onChange={(e) =>
              setFormData({ ...formData, modalidad: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, modalidad: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, modalidad: e.target.value })
            }
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
              value="react"
              checked={formData.tecnologias.includes("react")}
              onChange={(e) =>
                manejarTecnologias(e.target.value, e.target.checked)
              }
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
              value="angular"
              checked={formData.tecnologias.includes("angular")}
              onChange={(e) =>
                manejarTecnologias(e.target.value, e.target.checked)
              }
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
              value="vue"
              checked={formData.tecnologias.includes("vue")}
              onChange={(e) =>
                manejarTecnologias(e.target.value, e.target.checked)
              }
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
              value="node"
              checked={formData.tecnologias.includes("node")}
              onChange={(e) =>
                manejarTecnologias(e.target.value, e.target.checked)
              }
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
              value="python"
              checked={formData.tecnologias.includes("python")}
              onChange={(e) =>
                manejarTecnologias(e.target.value, e.target.checked)
              }
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
              value="java"
              checked={formData.tecnologias.includes("java")}
              onChange={(e) =>
                manejarTecnologias(e.target.value, e.target.checked)
              }
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
          <button
            onClick={botonRegistrarClickeado}
            className="w-fit px-10 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold shadow-sm"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
