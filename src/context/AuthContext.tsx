import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../services/api";

// Definimos la forma del usuario según la rúbrica
export interface User {
  id: number;
  username: string;
  rol: "ADMIN" | "CONSULTA";
}

// Lo que el resto de la app puede ver y usar
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  cargando: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  // EFECTO DE PERSISTENCIA: Se ejecuta una sola vez al cargar la pestaña
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setCargando(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Usamos la instancia centralizada
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { access_token, user: userData } = response.data;

      // Guardamos en memoria (React state)
      setToken(access_token);
      setUser(userData);

      // Guardamos en disco (LocalStorage) para persistir
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error en el login", error);
      throw new Error("Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    // Limpiamos todo
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de forma fácil: const { user } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
