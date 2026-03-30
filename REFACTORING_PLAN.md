# Plan de Refactoring: Registro de Eventos

Este documento detalla los problemas arquitectónicos encontrados en los componentes actuales y el plan de acción paso a paso para llevar el proyecto a un estándar de calidad superior, respetando las buenas prácticas de React y TypeScript.

## 1. Problemas Identificados

### 1.1. Estado Desconectado (Islas de Componentes)
Actualmente, los componentes no se comunican entre sí. 
- `Formulario.tsx` guarda los datos directamente en `localStorage`.
- `ListaParticipantes.tsx` utiliza datos falsos (mock data) estáticos.
- `Header.tsx` muestra un contador estático (`Participantes Registrados: 0`).

**Problema:** Al agregar un participante en el formulario, ni la lista ni el header se actualizan. Falla el principio básico de React de *Unidirectional Data Flow*.

### 1.2. HTML Semántico y Manejo de Eventos en el Formulario
El formulario actual maneja el envío a través del evento `onClick` de un botón, en lugar de utilizar el evento nativo del formulario.

```tsx
// ❌ INCORRECTO
<form ...>
   {/* ... */}
   <button onClick={handleRegistrar}>Registrar</button>
</form>

// ✅ CORRECTO
<form onSubmit={handleRegistrar} ...>
   {/* ... */}
   <button type="submit">Registrar</button>
</form>
```
Usar `onSubmit` permite que el formulario se envíe naturalmente al presionar `Enter` en cualquier campo de texto.

### 1.3. Código Repetido (Violación del principio DRY)
En `Formulario.tsx`, hay múltiples inputs de tipo `checkbox` (para las tecnologías) e inputs de tipo `radio` (para modalidad) copiados y pegados. Esto hace que el componente sea gigante y difícil de mantener.

**Solución iterativa:**
```tsx
const TECNOLOGIAS_DISPONIBLES = ["React", "Angular", "Vue", "Node", "Python", "Java"];

{TECNOLOGIAS_DISPONIBLES.map(tec => (
  <div key={tec}>
     <input type="checkbox" value={tec.toLowerCase()} />
     <label>{tec}</label>
  </div>
))}
```

### 1.4. Inconsistencia de Interfaces (TypeScript)
El tipado entre los componentes y el modelo principal está roto. En el modelo `Participante`, la propiedad `tecnologias` es un array de strings (`string[]`). Sin embargo, en `TarjetaParticipante.tsx` se define como un `string` simple:

```tsx
// ❌ INCORRECTO (TarjetaParticipante.tsx)
interface PropsTarjeta {
  // ...
  tecnologias: string; // Debería ser un array, respetando el modelo
}
```
Si la tarjeta necesita mostrar las tecnologías como un texto separado por comas, debe recibir el array y unirse en la vista (`tecnologias.join(', ')`), en lugar de mutar el tipo de dato.

---

## 2. Plan de Acción

Para corregir estos problemas y tener una arquitectura sólida, seguiremos estos pasos:

### Paso 1: Unificar el Estado (Lifting State Up)
- Mover el estado principal (la lista de participantes) al componente padre, idealmente `App.tsx` o un custom hook (`useParticipantes.ts`).
- Este estado central debe inicializarse leyendo de `localStorage` y actualizar `localStorage` cada vez que cambie.

### Paso 2: Pasar Props a los Componentes
- **A `Header.tsx`**: Pasarle la cantidad de participantes.
  `<Header cantidad={participantes.length} />`
- **A `ListaParticipantes.tsx`**: Pasarle el array real de participantes.
  `<ListaParticipantes participantes={participantes} />`
- **A `Formulario.tsx`**: Pasarle una función para agregar nuevos registros.
  `<Formulario onRegistrar={agregarParticipante} />`

### Paso 3: Refactorizar el Formulario
- Cambiar el manejo del submit al `<form>` (`onSubmit`).
- Utilizar `.map()` para renderizar los `checkboxes` de tecnologías y los `radios` de modalidad dinámicamente.
- Limpiar el código para reducir drásticamente las líneas del componente.

### Paso 4: Respetar el Modelo de Datos
- Importar y utilizar la interfaz `Participante` (o extender de ella) en `ListaParticipantes` y `TarjetaParticipante`.
- Asegurar que `tecnologias` se maneje de forma consistente como un `string[]` a lo largo de toda la aplicación.
