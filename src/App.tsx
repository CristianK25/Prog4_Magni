/*import { useState } from "react";*/
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Busqueda from "./components/Busqueda";
import ListaParticipantes from "./components/ListaParticipantes";

function App() {
  /*const [count, setCount] = useState(0);*/

  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-start bg-white pb-20">
      <Header />

      <Formulario />

      <Busqueda />

      <ListaParticipantes />
    </div>
  );
}

export default App;
