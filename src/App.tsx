import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Busqueda from "./components/Busqueda";
import ListaParticipantes from "./components/ListaParticipantes";
import type Participante from "./models/Participante";

const LLAVE_PARTICIPANTE = "participantes";

function App() {
  /*El estado de los participantes empieza sin nada*/
  const [participantes, setParticipantes] = useState<Participante[]>([]);

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

  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-start bg-white pb-20">
      <Header />

      <Formulario onAgregar={agregarParticipante} />

      <Busqueda />

      <ListaParticipantes
        onEliminar={eliminarParticipante}
        participantes={participantes}
      />
    </div>
  );
}

export default App;
