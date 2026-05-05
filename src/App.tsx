import { Routes, Route } from "react-router-dom";
import ListaPage from "./pages/ListaPage";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaPage />} />
        <Route path="/nuevo" element={<FormularioPage />} />
        <Route path="/editar/:id" element={<EditarPage />} />
      </Routes>
    </div>
  );
}

export default App;
