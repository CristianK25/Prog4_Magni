import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Busqueda from "./components/Busqueda";
import TarjetaParticipantes from "./components/TarjetaParticipante";
import type Participante from "./models/Participante";

const LLAVE_PARTICIPANTE = "participantes";

function App() {
  /*El estado de los participantes empieza sin nada*/
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  const [filtros, setFiltros] = useState({
    texto: "",
    modalidad: "",
    nivel: "",
  });

  /*Funcion que nose que hace */
  useEffect(() => {
    const participantesGuardados = localStorage.getItem(LLAVE_PARTICIPANTE);
    if (participantesGuardados) {
      setParticipantes(JSON.parse(participantesGuardados));
    }
  }, []); // <--- AGREGADO EL ARRAY ACA

  /*Funcion para Agregar */
  const agregarParticipante = (nuevoParticipante: Participante) => {
    /*Creo una nueva lista con los participantes existentes y el nuevo */
    const nuevaLista = [...participantes, nuevoParticipante];

    /**Le envio la nueva lista a set participantes pero nose que hace ni donde esta */
    setParticipantes(nuevaLista);

    /**Actualizo el local storage convirtiendo el json en string */
    localStorage.setItem(LLAVE_PARTICIPANTE, JSON.stringify(nuevaLista));
  };

  const eliminarParticipante = (idParticipante: number) => {
    /**Los participantes existentes son ingresados en una nueva lista excepto el que tenga un p.id igual al idParticipante */
    const nuevaLista = participantes.filter((p) => p.id !== idParticipante);
    /**La lista de participantes se actualiza con la lista nueva */
    setParticipantes(nuevaLista);
    /**Se actualiza el localstorage para utilizar la nueva lista sin el participante */
    localStorage.setItem(LLAVE_PARTICIPANTE, JSON.stringify(nuevaLista));
  };

  // -- LÓGICA DEL EMBUDO MÁGICO (FILTROS) --
  const listaFiltrada = participantes.filter((persona) => {
    // 1. Filtro de Texto (si está vacío, pasa. Si tiene algo, se fija si el nombre lo incluye en minúsculas)
    const coincideTexto =
      filtros.texto === "" ||
      persona.nombre.toLowerCase().includes(filtros.texto.toLowerCase());

    // 2. Filtro de Modalidad
    const coincideModalidad =
      filtros.modalidad === "" || persona.modalidad === filtros.modalidad;

    // 3. Filtro de Nivel
    const coincideNivel =
      filtros.nivel === "" || persona.nivel === filtros.nivel;

    // Solo pasan los que cumplan las 3 condiciones a la vez
    return coincideTexto && coincideModalidad && coincideNivel;
  });

  // -- LÓGICA DE LA LISTA SEPARADA CON IF/ELSE --
  let contenidoLista;

  if (participantes.length === 0) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">No hay participantes aún. ¡Agregá el primero!</div>
    );
  } else if (listaFiltrada.length === 0) {
    // Escenario extra: ¡Tienen datos pero apretaron tantos filtros que no hay coincidencias!
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">No se encontraron resultados para esos filtros.</div>
    );
  } else {
    // Acá mapeamos el EMBUDO (listaFiltrada), ya no mapeamos el tanque entero (participantes)
    contenidoLista = listaFiltrada.map((persona) => (
      <TarjetaParticipantes
        key={persona.id}
        id={persona.id}
        nombre={persona.nombre}
        pais={persona.pais}
        modalidad={persona.modalidad}
        nivel={persona.nivel}
        tecnologias={persona.tecnologias}
        onEliminar={eliminarParticipante}
      />
    ));
  }

  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-start bg-white pb-20">
      <Header />

      <Formulario onAgregar={agregarParticipante} />

      <Busqueda filtros={filtros} onFiltrar={setFiltros} />

      <div className="grid grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
        {contenidoLista}
      </div>
    </div>
  );
}

export default App;
