# Trabajo Práctico N° 1 – Programación 4

En el presente Trabajo Práctico deberá desarrollar una aplicación **Full Stack**, gestionando tanto la parte visible para el usuario (**Frontend**) como la lógica del servidor, bases de datos y APIs (**Backend**).

---

## 1. DATABASE

Las bases de datos permitidas en el práctico son **MySQL** o **PostgreSQL** (puede usar la que prefiera).

- Cree una base de datos llamada `utn_db`
- Cree una tabla en esta base de datos llamada `usuarios_utn`

### Columnas de la tabla

| Columna     | Tipo            | Descripción                     |
|-------------|-----------------|----------------------------------|
| `id`        | Numérico (PK)   | Auto numérico / Auto incremental |
| `usuario`   | `varchar(20)`   | Nombre de usuario                |
| `clave`     | `varchar(20)`   | Contraseña                       |
| `apellido`  | `varchar(50)`   | Apellido del usuario             |
| `nombre`    | `varchar(50)`   | Nombre del usuario               |
| `bloqueado` | `char(1)`       | Estado: `Y` = bloqueado, `N` = no bloqueado |

---

## 2. Backend

> **Lenguaje:** El backend puede codificarse con el lenguaje que desee.

El backend deberá estar conformado por una **API REST** que permita responder a las peticiones emitidas desde el frontend, procesarlas y retornar la respuesta correspondiente. Deberá codificar el **Acceso a Datos** correspondiente para poder interactuar con la base de datos.

---

## 3. Frontend

> **Restricción:** Solo **HTML + JavaScript Nativo + CSS**. No se puede utilizar librerías o frameworks de ningún tipo.

### 3.1 Login (`login.html`)

Implemente un formulario HTML que permita el ingreso de usuario y contraseña.

Al ejecutar el botón **Ingresar**, se deberá llamar a una función JavaScript que emita una petición al backend. Ejemplo de URL (si el backend fuese PHP):

```
http://localhost:8080/tp1/login.php
```

La petición envía `usuario` y `clave` como parámetros y retorna el siguiente JSON:

```json
{"respuesta": "", "mje": ""}
```

#### Respuestas posibles

**Login exitoso:**
```
GET http://localhost:8080/tp1/login.php?user=mjmartinez&pass=123456
```
```json
{"respuesta": "OK", "mje": "Ingreso Valido. Usuario mjmartinez"}
```

**Login fallido:**
```json
{"respuesta": "ERROR", "mje": "Ingreso Invalido, usuario y/o clave incorrecta"}
```

#### Comportamiento

- Si retorna `ERROR` → mostrar el mensaje `mje` por pantalla al usuario.
- Si retorna `OK` → redirigir la aplicación a la página `lista.html`.

---

### 3.2 Lista de Usuarios (`lista.html`)

En esta página se deberá mostrar una **grilla** con la totalidad de los usuarios obtenidos mediante una petición al backend.

#### Petición de búsqueda

```
GET http://localhost:8080/tp/lista.php?action=BUSCAR
```

#### Respuesta JSON de ejemplo

```json
[
  {"id": "121", "usuario": "rcsiri",      "bloqueado": "N", "apellido": "SIRI",      "nombre": "Rocio Cecilia"},
  {"id": "422", "usuario": "mfsilvestre", "bloqueado": "N", "apellido": "SILVESTRE", "nombre": "MARIA FLORENCIA"},
  {"id": "223", "usuario": "apessina",    "bloqueado": "N", "apellido": "PESSINA",   "nombre": "ALCIDES NORMAN"},
  {"id": "349", "usuario": "mesposito",   "bloqueado": "N", "apellido": "ESPOSITO",  "nombre": "MARCELA LILIANA"}
]
```

El JSON se procesa y carga dinámicamente en la grilla de la página.

---

### 3.3 Funcionalidad de Búsqueda

Agregue en la parte superior de la grilla una **caja de texto** y un **botón** que permita ingresar texto para buscar un usuario. La búsqueda se realiza mediante `LIKE`.

#### Ejemplo de petición con filtro

```
GET http://localhost:8080/tp/lista.php?action=BUSCAR&usuario=si
```

- El resultado de la búsqueda se carga en la grilla.
- Si no se obtienen resultados, se deberá **indicar al usuario** dicha situación.

---

### 3.4 Bloquear / Desbloquear Usuarios

Agregue a la derecha de la grilla **2 nuevas columnas** para marcar al usuario como bloqueado o desbloqueado:

| Id | Usuario | Bloqueado | Apellido | Nombre | Bloquear | Desbloquear |
|----|---------|-----------|----------|--------|----------|-------------|
| xx | Xx      | xx        | xx       | xx     | 👍       | 👎           |

#### Endpoints

**Bloquear un usuario:**
```
GET http://localhost:8080/tp/lista.php?action=BLOQUEAR&idUser=XXXX&estado=Y
```

**Desbloquear un usuario:**
```
GET http://localhost:8080/tp/lista.php?action=BLOQUEAR&idUser=XXXX&estado=N
```

Donde `XXXX` es el `id` del usuario de la grilla, `Y` = bloquear, `N` = desbloquear.

#### Respuestas del backend

**Bloqueo exitoso:**
```json
{"respuesta": "OK", "mje": "Bloqueo Exitoso"}
```

**Bloqueo fallido:**
```json
{"respuesta": "ERROR", "mje": "XXXXXXXXX"}
```

Siendo `XXXXXXXXX` la excepción capturada que provocó que el bloqueo fracasara.

---

### 3.5 Estilos CSS de la Grilla

Aplique el CSS necesario para que:

- Las filas con usuarios **bloqueados** (`bloqueado = Y`) tengan fondo de color `#fd9f8b` 🟥
- Las filas con usuarios **no bloqueados** (`bloqueado = N`) tengan fondo de color `#cef8c6` 🟩

---

## 4. Vista de referencia

A continuación se muestra un ejemplo visual de cómo debería verse la grilla de usuarios con las columnas de bloqueo y los colores correspondientes:

![Grilla de usuarios con bloqueo/desbloqueo](grilla_usuarios.png)

![alt text](image.png)