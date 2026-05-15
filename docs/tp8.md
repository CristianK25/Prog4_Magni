# TP Nº 8

### Agregue e implemente en la aplicación de Participantes los siguientes hooks
### **useRef, useId y Custom Hooks**

---

## Objetivos
El alumno deberá:

- **Implementar** `useRef`
- **Implementar** `useId`
- **Crear y utilizar** Custom Hooks
- **Mejorar** la experiencia de usuario
- **Reutilizar** lógica
- **Mantener** la arquitectura actual de la aplicación

---

## **PARTE 1 — useRef**

### Implementar:
### **✅ Foco automático**

**Al ingresar a la pantalla:**
- El input **“Nombre”** deberá recibir foco automáticamente.
- En el listado de participantes, automatizar el traslado del foco a la sección de filtros de búsqueda aplicando una combinación de teclas (ejemplo: al presionar **Ctrl + B**).

---

## **PARTE 2 — useId** (genera identificadores únicos automáticamente)

Implementar IDs accesibles para los componentes de formulario:
- Inputs
- Labels
- Checkbox
- Radio buttons

### Ejemplo:
```javascript
const nombreId = useId();

<label htmlFor={nombreId}>Nombre</label>
<input id={nombreId} />
```

---

## **PARTE 3 — Custom Hook**

> **Es una función reutilizable que usa hooks internamente.**

Crear **2 funciones** aplicando hooks personalizados que doten al sistema de funcionalidades útiles.
