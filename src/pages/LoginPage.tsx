import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      // Una vez logueado, lo mandamos a la lista o al inicio
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Iniciar Sesión - Registro de Participantes
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input 
          type="text" 
          placeholder="Usuario" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button 
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded shadow hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>

      <Link 
        to="/publica" 
        className="mt-6 text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors"
      >
        Ir a la página pública
      </Link>
    </div>
  );
};

export default LoginPage;
