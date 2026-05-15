import { Routes, Route, Navigate } from "react-router-dom";
import ListaPage from "./pages/ListaPage";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";
import LoginPage from "./pages/LoginPage";
import PublicaPage from "./pages/PublicaPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/publica" element={<PublicaPage />} />

        {/* El "/" lo mandamos al login o a la lista según la lógica de la rúbrica */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas Privadas (Cualquier rol logueado) */}
        <Route 
          path="/lista" 
          element={
            <PrivateRoute>
              <ListaPage />
            </PrivateRoute>
          } 
        />

        {/* Rutas Privadas (Solo ADMIN) */}
        <Route 
          path="/nuevo" 
          element={
            <PrivateRoute rol="ADMIN">
              <FormularioPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/editar/:id" 
          element={
            <PrivateRoute rol="ADMIN">
              <EditarPage />
            </PrivateRoute>
          } 
        />
        
        {/* Fallback para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
