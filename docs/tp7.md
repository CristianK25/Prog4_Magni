# Trabajo Práctico N° 7
## “Rutas públicas, privadas y control de acceso por rol”

### Objetivo
El alumno deberá:
*   Implementar login
*   Manejar sesión (simulada)
*   Crear rutas privadas
*   Restringir acceso según rol
*   Adaptar UI según permisos
*   Implementar JWT

---

### Base de Datos: Tabla Usuarios
Cree una tabla `usuarios_db` con los siguientes campos:
*   **id**: PK autonumérica
*   **username**: cadena
*   **password**: cadena
*   **rol**: cadena

**Roles definidos:**
```typescript
type Rol = "ADMIN" | "CONSULTA";
```

---

### Estructura de archivos
Agregar los siguientes archivos a la estructura de la app para dar soporte al sistema de autenticación y rutas protegidas:

```text
src/
├── context/
│   └── AuthContext.tsx
├── routes/
│   └── PrivateRoute.tsx
└── pages/
    └── LoginPage.tsx
```

---

### Private Route
#### Implementación del control de acceso
Este componente se encarga de interceptar la navegación y validar si el usuario tiene una sesión activa y si posee el rol necesario para acceder a la ruta solicitada.

```tsx
export default function PrivateRoute({ children, rol }: any) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rol && user.rol !== rol) {
    return <Navigate to="/" />;
  }

  return children;
}
```

---

### Login Page
#### Interfaz de usuario para autenticación
La página de login debe permitir al usuario ingresar sus credenciales para iniciar sesión en el sistema.

```tsx
// LoginPage.tsx - Estructura visual sugerida
return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">
      Iniciar Sesión - Registro de Participantes
    </h1>
    
    <form className="flex flex-col gap-4 w-80">
      <input 
        type="text" 
        placeholder="Usuario" 
        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button 
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 rounded shadow hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </form>
  </div>
);
```

---

### Main tsx
#### Configuración del Provider y Router
En el punto de entrada de la aplicación, debemos envolver nuestra app con los Providers necesarios para que el contexto de autenticación esté disponible en toda la jerarquía de componentes.

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ParticipantesProvider>
          <Home />
        </ParticipantesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
```
