import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  rol?: "ADMIN" | "CONSULTA";
}

const PrivateRoute = ({ children, rol }: PrivateRouteProps) => {
  const { user, cargando } = useAuth();

  // Si todavía estamos viendo si hay un token en el localStorage, esperamos
  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  // Si no hay usuario logueado, mandalo al login de una
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico (ej: ADMIN) y el usuario no lo tiene
  if (rol && user.rol !== rol) {
    return <Navigate to="/" />;
  }

  // Si todo está ok, renderizamos la página protegida
  return <>{children}</>;
};

export default PrivateRoute;
