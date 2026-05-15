# Trabajo Práctico N° 7

## “Rutas públicas, privadas y control de acceso por rol”

### Objetivo

El alumno deberá:

- Implementar login
- Manejar sesión (simulada)
- Crear rutas privadas
- Restringir acceso según rol
- Adaptar UI según permisos
- Implementar JWT

---

### Base de Datos: Tabla Usuarios

Cree una tabla `usuarios_db` con los siguientes campos:

- **id**: PK autonumérica
- **username**: cadena
- **password**: cadena
- **rol**: cadena

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

Cerrar Sesión  
Realizado un ingreso exitoso agregue y muestre una opción al menú que permita Cerrar
Sesión

El menú de navegación debe actualizarse tras el inicio de sesión para incluir la opción de finalizar la sesión. Como se observa en la imagen de referencia, se espera una interfaz que liste las páginas disponibles ("Lista de Participantes", "Nuevo participante") y presente un botón de **Cerrar sesión** visualmente diferenciado (preferentemente en color rojo) para facilitar su identificación.

---

### Main tsx

#### Configuración del Provider y Router

En el punto de entrada de la aplicación, debemos envolver nuestra app con los Providers necesarios para que el contexto de autenticación esté disponible en toda la jerarquía de componentes.

```tsx
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ParticipantesProvider>
          <Home />
        </ParticipantesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

### Definición de Rutas

#### Implementación de rutas protegidas

Agregue una página publica que no tendrá validación de ningún tipo, el resto de las rutas a excepción del Login serán rutas privadas.

```tsx
<Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/publica" element={<PublicaPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route
    path="/lista"
    element={
      <PrivateRoute>
        <ListaPage />
      </PrivateRoute>
    }
  />
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
  <Route
    path="/menu_inicio"
    element={
      <PrivateRoute>
        <App />
      </PrivateRoute>
    }
  />
</Routes>
```

Mostrar botón Nuevo y Editar solo si es ADMIN
{user?.rol === "ADMIN" && (

<Link to="/nuevo">Nuevo participante</Link> 
)} 
Mostrar opción del menú con acceso al formulario solo si es ADMIN 
 
Token JWT 
Implemente Tokens JWT para realizar la validación del usuario en la app, implemente la 
generación del Token en el backend.  
Persistir Token Login 
Una vez generado el Token persista el mismo en el localStorage, o en el sessionStorage o 
mediante cookies y valide cada endpoint cliente/servidor mediante el Token. 
Resultado final 
Usuario Rol Permisos 
ADMIN Leer, Crear, Editar, Eliminar 
CONSULTA Solo ver Participantes, no puede acceder al Formulario
