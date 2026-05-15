import { useState, useContext, useEffect } from "react";
import { ParticipantesContext } from "../context/ParticipantesContext";

/**
 * Estado inicial por defecto para el formulario de participantes.
 */
const ESTADO_INICIAL = {
  nombre: "",
  email: "",
  edad: "",
  pais: "Argentina",
  modalidad: "",
  tecnologias: [] as string[],
  nivel: "principiante",
  aceptaTerminos: false,
};

/**
 * Propiedades para el componente Formulario.
 */
interface FormularioProps {
  /** Callback opcional que se ejecuta tras un registro o edición exitosa */
  onSuccess?: () => void;
}

/**
 * Componente de formulario para la creación y edición de participantes.
 * 
 * Gestiona su propio estado interno para los campos de entrada y se sincroniza
 * con el participante seleccionado del contexto cuando se entra en modo edición.
 * 
 * @param {FormularioProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un formulario completo con validaciones básicas.
 */
export default function Formulario({ onSuccess }: FormularioProps) {
  const { agregar, editar, participanteSeleccionado, seleccionarParaEdicion } =
    useContext(ParticipantesContext);

  // El estado donde tenemos el borrador de nuestro formulario
  const [formData, setFormData] = useState(ESTADO_INICIAL);

  useEffect(() => {
    if (participanteSeleccionado) {
      setFormData({
        ...participanteSeleccionado,
        edad: participanteSeleccionado.edad.toString(),
      });
    } else {
      setFormData(ESTADO_INICIAL);
    }
  }, [participanteSeleccionado]);

  // =============== FUNCIONES ESPECÍFICAS Y CLARAS ===============

  /**
   * Agrega o quita una tecnología del listado seleccionado.
   * 
   * @param {string} tecnologia - Nombre de la tecnología.
   * @param {boolean} estaChequeado - Estado del checkbox.
   */
  const manejarTecnologias = (tecnologia: string, estaChequeado: boolean) => {
    setFormData((prev) => ({
      ...prev,
      tecnologias: estaChequeado
        ? [...prev.tecnologias, tecnologia]
        : prev.tecnologias.filter((tec) => tec !== tecnologia),
    }));
  };

  /**
   * Procesa el envío del formulario para agregar o editar un participante.
   * Valida que los campos obligatorios estén completos antes de llamar al servicio.
   * 
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const botonRegistrarClickeado = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.email ||
      !formData.edad ||
      !formData.modalidad ||
      formData.tecnologias.length === 0 ||
      !formData.aceptaTerminos
    ) {
      alert("Por favor, completa todos los campos y acepta los términos.");
      return;
    }

    const participanteArmado = {
      ...formData,
      edad: Number(formData.edad),
    };

    if (participanteSeleccionado) {
      await editar(participanteSeleccionado.id, participanteArmado);
      seleccionarParaEdicion(null);
    } else {
      await agregar(participanteArmado);
      setFormData(ESTADO_INICIAL);
    }

    onSuccess?.();
  };

  /**
   * Cancela el modo edición y limpia el formulario.
   */
  const cancelarEdicion = () => {
    seleccionarParaEdicion(null);
  };

  const opcionesModalidad = [
    { valor: "presencial", etiqueta: "Presencial" },
    { valor: "virtual", etiqueta: "Virtual" },
    { valor: "hibrido", etiqueta: "Híbrido" },
  ];

  const opcionesTecnologias = [
    { valor: "react", etiqueta: "React" },
    { valor: "angular", etiqueta: "Angular" },
    { valor: "vue", etiqueta: "Vue" },
    { valor: "node", etiqueta: "Node" },
    { valor: "python", etiqueta: "Python" },
    { valor: "java", etiqueta: "Java" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-8 mt-8">
      <form
        onSubmit={botonRegistrarClickeado}
        className="flex flex-col gap-6 border border-gray-200 p-4 shadow-sm rounded"
      >
        <div className="grid grid-cols-2 gap-6 w-full">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <input
            type="number"
            placeholder="Edad"
            value={formData.edad}
            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded shadow-sm"
          />
          <select
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

        <div>
          <p className="text-lg font-bold text-gray-700">Modalidad</p>
          <div className="flex gap-4 mt-2">
            {opcionesModalidad.map((opcion) => (
              <label
                key={opcion.valor}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="modalidad"
                  value={opcion.valor}
                  checked={formData.modalidad === opcion.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, modalidad: e.target.value })
                  }
                />
                {opcion.etiqueta}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg font-bold text-gray-700">Tecnologías</p>
          <div className="grid grid-cols-3 gap-y-4 gap-x-12 mt-2 w-full text-lg font-medium">
            {opcionesTecnologias.map((opcion) => (
              <label
                key={opcion.valor}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.tecnologias.includes(opcion.valor)}
                  onChange={(e) =>
                    manejarTecnologias(opcion.valor, e.target.checked)
                  }
                />
                {opcion.etiqueta}
              </label>
            ))}
          </div>
        </div>

        <select
          value={formData.nivel}
          onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
        >
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>

        <div className="flex gap-4 flex-col mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.aceptaTerminos}
              onChange={(e) =>
                setFormData({ ...formData, aceptaTerminos: e.target.checked })
              }
            />
            Acepto términos y condiciones
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
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
