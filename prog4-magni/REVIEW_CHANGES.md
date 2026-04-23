# Review Changes - TP Nro 5 (Gestión de Estado con useReducer + Context)

Este documento resume las modificaciones aplicadas al proyecto para cumplir con los requerimientos del **TP Nro 5 - PROG4**, enfocado en la migración del manejo de estado y la implementación de la funcionalidad de edición full-stack.

## ⚛️ Cambios en el Frontend (React)

### 1. Migración a `useReducer`
- Se reemplazó el uso disperso de `useState` por el hook `useReducer` dentro de `ParticipantesContext.tsx`. Esto centraliza toda la lógica de mutación de estado.

### 2. Creación del Reducer (`src/reducers/participantesReducer.ts`)
- Se movió y creó la estructura exacta solicitada por el TP (`reducers > participantesReducer`).
- Se definieron los tipos de acciones explícitamente requeridos:
  - `GET_PARTICIPANTES`
  - `AGREGAR`
  - `ELIMINAR`
  - `EDITAR`
  - `RESET`
  - `SET`

### 3. Funcionalidad de Edición
- **`TarjetaParticipante.tsx`**: Se agregó el botón "Editar". Al hacer click, despacha la acción para seleccionar al participante y cargarlo en el estado de edición.
- **`Formulario.tsx`**: 
  - Ahora escucha si hay un participante seleccionado en el Contexto (`useEffect`) y autocompleta todos los inputs (incluyendo checkboxes y selects).
  - El botón principal cambia dinámicamente de "Registrar" a "Actualizar" según el modo en el que se encuentre.
  - Al procesar el envío (`onSubmit`), el sistema discrimina si debe invocar a la API de creación (`POST`) o a la de actualización (`PUT`).
  - Se sumó un botón de "Cancelar" para salir del modo edición.

### 4. Servicio de API (`src/services/participanteService.ts`)
- Se implementó el método `update(id, participante)` para gestionar las peticiones HTTP `PUT` contra el servidor.

---

## 🐍 Cambios en el Backend (FastAPI)

### 1. Nuevo Endpoint de Actualización
- Se agregó el endpoint `@router.put("/{participante_id}")` en `back/app/modules/participante/router.py`.
- Llama a la función `update_participante` en `service.py`, buscando el registro en SQLite, actualizando sus campos (juntando las tecnologías como un string) y commiteando los cambios en la base de datos.

### 2. Estructura y Validación
- Todo el flujo del nuevo método `PUT` se apoya correctamente en el esquema de validación que ya existía: `schema.ParticipanteUpdate`.

---

## 🏗️ Impacto Arquitectónico
Con estos cambios, la lógica de presentación (UI) quedó totalmente desacoplada de la lógica de negocio (manejo del estado de los participantes). Ahora, para hacer cualquier alteración en los participantes, los componentes simplemente despachan "intenciones" (`dispatch`), y es el **Reducer** el único responsable de decidir cómo mutar esa información.
