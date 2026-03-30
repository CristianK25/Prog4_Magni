# Cuestionario de Defensa TP1: Backend FastAPI 🚀

Este documento contiene las preguntas clave para entender a fondo cómo funciona tu proyecto. El objetivo es que sepas justificar por qué se usó cada herramienta y qué hace cada parte del código.

## 1. Conceptos Generales y HTTP 🌐

### 1. **¿Qué es una API REST?** 
¿Cuál es su rol principal en nuestro Trabajo Práctico comunicando el Frontend con la Base de datos?

**🗣️ Tu Respuesta:**
> Una api es una interfaz con protocolos o reglas para que dos aplicaciones se comuniquen. API REST es una interfaz que utiliza el protocolo HTTP para comunicar una app con un servidor. En este caso el backend fastapi es el servidor y el protocolo se sigue en los controllers. Cuando se define un controlador se define su "metodo" tambien. Si hay varios metodos y los mas famosos son "POST", "GET", "PUT", "PATCH", "DELETE", entre otros

**🤖 Corrección de la IA:**
> **¡Excelente!** Definiste perfecto qué es una API y mencionaste muy bien que REST se basa en aprovechar los métodos de HTTP. Para la defensa, tenés esto súper claro.


### 2. **Métodos HTTP:** 
Habitualmente se usa `POST` para crear, `PUT` para actualizar y `GET` para leer. En nuestro TP el profesor pidió usar `GET` para bloquear/desbloquear. ¿Por qué esto rompe un poco las reglas de REST puro y cómo lo resolvimos?

**🗣️ Tu Respuesta:**
> Para actualizar el bloqueo de un usuario no tiene sentido usar GET, nosotros utilizamos PUT, para actualizar completamente el usuario con la variable del bloque que queramos

**🤖 Corrección de la IA:**
> **¡Cuidado acá!** En tu controlador REST original (`usuario_controller.py`) sí usaste un `PUT`, lo cual es arquitectónicamente correctísimo. Pero acuérdate que en el controlador final (`tp_controller.py`), el documento del TP exigía explícitamente hacerlo con un **GET** (`GET /tp1/lista?action=BLOQUEAR`). Tuvimos que hacer un GET porque el enunciado del TP lo pedía así. Rompe las reglas de REST porque un GET solo debería usarse para "*leer/obtener*" datos, no para modificarlos en la BD. Está buenísimo que le menciones el por qué al profesor en la defensa si te hace la pregunta trampa de si un GET está bien para actualizar.


### 3. **CORS (Cross-Origin Resource Sharing):** 
En el archivo `main.py` habilitamos `CORSMiddleware`. ¿Qué es CORS y qué error nos tiraría el navegador desde el frontend si quitáramos ese código?

**🗣️ Tu Respuesta:**
> Resumidamente, CORS se refiere a configurar las urls que podrian acceder a nuestros endpoints atravez de http. Si lo quitamos, no podriamos utilizar el backend a travez del fronend, a menos que especifiquemos desde donde esta intentando llamar el frontend, su url con puerto o dominio

**🤖 Corrección de la IA:**
> **¡Muy bien!** Tienes el concepto general. Para hacerlo más técnico: CORS es un mecanismo de seguridad **del navegador de internet** (no del backend). Como tu frontend (HTML+JS) correrá por ejemplo en `localhost:5500` y tu backend corre en `localhost:8000`, el navegador bloquea la consulta por seguridad, asumiendo que el frontend quiere mandar datos a un servidor desconocido. Al agregar el `CORSMiddleware`, el backend le avisa al navegador: *"¡Tranquilo, estoy configurado para permitir a este frontend pasar!"*.


### 4. **Variables de Entorno:** 
Usamos un archivo `.env` y la librería `dotenv`. ¿Por qué es una mala práctica quemar (hardcodear) la contraseña de tu base de datos directamente en el código de Python?

**🗣️ Tu Respuesta:**
> Dos razones: El archivo .env es un archivo ignorado en entornos con manejo de versiones como git, para evitar subir contenido sensible a plataformas como github o gitlab. El problema de hardcodear el nombre y contraseña de la base de datos es que para cambiar ese dato o variable, tenemos que buscar cada archivo y linea de codigo donde se utiliza y cambiarlo, en cambio, teniendo .env y leyendo sus variables atraves de dotenv, podemos cambiar las variables desde ese archivo y se cambiara en todo el proyecto.

**🤖 Corrección de la IA:**
> **¡Excelente, un 10!** Tocaste los dos puntos más importantes y con palabras súper correctas: **seguridad** (no subir credenciales exponiéndote en un repositorio) y **mantenibilidad** (cambiar la clave en un solo archivo centralizado en vez de alterar el código duro).


## 2. Herramientas y Librerías 🛠️

### 5. **FastAPI vs Uvicorn:** 
Nuestro código usa FastAPI, pero para correr el servidor tipeamos `uvicorn main:app --reload`. ¿Qué diferencia hay entre FastAPI y Uvicorn?

**🗣️ Tu Respuesta:**
> FastApi es un framework, un marco de trabajo que contiene librerias y funcionalidades para ayudar al desarrollador a programar o codificar un servidor backend mas rapido, sin perder el tiempo en funcionalidades que no tengan que ver con el negocio final al que apunta el backend. Uvicorn es un servidor que corre nuestra aplicacion y abre algun puerto en especifico para que sea accesible. Realiza la misma funcion que TomCat en Springboot.

**🤖 Corrección de la IA:**
> **¡Fantástica comparación!** Lo explicaste perfecto. FastAPI construye la lógica (el código) sobre qué responder y en qué formato. `Uvicorn` es el servidor (ASGI) que se para en el puerto 8000 esperando físicamente conexiones de red y se las "tira" a FastAPI. Hacer la analogía con `Tomcat` y `Springboot` de Java es una jugada brillante para la defensa.


### 6. **SQLAlchemy vs Pydantic:** 
Estas son las dos grandes librerías de nuestro proyecto. Ambas definen cosas parecidas pero tienen propósitos totalmente distintos. ¿Para qué se usa exactamente **SQLAlchemy** (Models) y para qué se usa **Pydantic** (Schemas)?

**🗣️ Tu Respuesta:**
> SQLAlchemy se utiliza en los modelos de nuestra app y realiza la transformacion de datos de nuestras clases o objetos, en tablas y filas de la base de datos. Pydantic solo se que se utiliza para transformar los json en objetos y se encarga de los datos que entran y los datos que salen del servidor. Solo se hasta ahi de los dos. SQLAlchemy es el equivalente a JPA y pydantic son los dtos.

**🤖 Corrección de la IA:**
> **¡Impecable!** Es 100% correcta tu analogía. `SQLAlchemy` es tu ORM (como JPA/Hibernate en Java) usado exclusivo para lidiar con la persistencia en el motor SQL de la base de datos. `Pydantic` define la forma estricta de las validaciones web; es literalmente el concepto de **DTO** (Data Transfer Object). Teniendo esto en claro, no te agarran en bajada.


## 3. Arquitectura del Proyecto (Capas) 🏗️

### 7. **Controlador (`controller`):** 
¿De qué se encarga específicamente el archivo `tp_controller.py`? ¿Por qué no le pusimos ahí la lógica de consultar la base de datos?

**🗣️ Tu Respuesta:**
> El controller se encarga de armar la api y sus reglas aparte del protocolo http. Por ejemplo: Que datos recibe, que datos devuelve, por cual url me puedo comunicar, errores o excepciones que devuelve, y utilizar el servicio que corresponda. Para dividir responsabilidades y que el controller se encarge de recibir y enviar datos solamente.

**🤖 Corrección de la IA:**
> **¡Perfecto!** Muy bien remarcada la idea de la división de responsabilidades. El controlador actúa como el "recepcionista". Atiende la puerta, verifica quién llegó y con qué peticiones, le pasa el laburo pesado a los del área de adentro (`Service`) y luego se encarga de devolverle la respuesta servidita al cliente.


### 8. **Servicio (`service`):** 
¿Qué rol cumple `usuario_service.py`? ¿Por qué dividimos las responsabilidades entre el Controlador y el Servicio?

**🗣️ Tu Respuesta:**
> El service se encarga de la logica de negocio. Se comunica con la base de datos haciendo querys, buscando datos, trayendo y mandandoselos al controller de vuelta si estan bien o si no se encontraron.

**🤖 Corrección de la IA:**
> **¡Exacto!** Todo bien justificado. El servicio encapsula las reglas de negocio puro (validar si la contraseña dada es en serio la de la BD y gestionar la transacción).


### 9. **Ruteo (`router`):** 
En `main.py` usamos la instrucción `app.include_router(tp_controller.router)`. ¿Para qué sirve esto y cómo nos ayuda si nuestro proyecto crece y sumamos, por ejemplo, "Materia" y "Examen"?

**🗣️ Tu Respuesta:**
> Esto sirve para poner todos los controladores de una sola vez en el main. Si mañana voy a manejar Materias, voy a desarrollar un controlador especifico para las materias y añadire todo eso con `app.include_router(materia_controller.router)` y exponer todos los endpoints de materias

**🤖 Corrección de la IA:**
> **¡Implacable!** Modularización pura y dura. Nos permite mantener el `main.py` chiquito y ordenadito, dejando cada recurso con su propio router separado.


## 4. Base de Datos (`database.py` y `model`) 🗄️

### 10. **El Motor:** 
En `database.py` tenemos `engine = create_engine(...)`. ¿Qué representa el `engine` en SQLAlchemy?

**🗣️ Tu Respuesta:**
> Nose exactamente que es engine. Supongo que es un cable de conexion entre nuestro codigo y Postgres. Pero especificamente nose

**🤖 Corrección de la IA:**
> **La intuición no falló:** Literalmente el `engine` en SQLAlchemy maneja la comunicación física. Administra un mecanismo llamado **"Connection Pool"** (piscina de conexiones). Básicamente, en vez de arrancar un motor de red lento cada vez que llega alguna consulta web, SQLAlchemy mantiene abiertos por las dudas un número de "cables/tubos" (ej. 5) hacia PostgreSQL, listos para usar todo el tiempo, agilizando todo.


### 11. **Dependencia y Sesiones:** 
Cada vez que hacemos una ruta (ej. `def login(...)`), pasamos como parámetro `db: Session = Depends(get_db)`. ¿Por qué pedimos una sesión para cada petición web en lugar de mantener una sola sesión abierta globalmente para todo el backend?

**🗣️ Tu Respuesta:**
> Nose

**🤖 Corrección de la IA:**
> **Acá va el aspecto súper técnico:** Una `Session` en las bases de datos es un área temporal de trabajo. Si tuviéramos una sesión "global compartida" para todo el sistema y entran dos usuarios al mismo tiempo apuntando a modificar sus perfiles, se van a confundir los datos sucios guardados en la memoria temporal. Al usar `Depends(get_db)`, FastAPI "crea desde cero" una sesión limpia enteramente nueva por cada Request (petición) web. Y apenas termina el trabajo de esa petición, cierra y destruye esa sesión liberando memoria con `db.close()`. Esto garantiza cero problemas de concurrencia.


### 12. **Mapeo:** 
En `usuario_model.py` creamos una clase llamada `Usuario(Base)`. ¿Qué instrucción de ese archivo le permite a SQLAlchemy saber qué tabla de PostgreSQL tiene que ir a mirar?

**🗣️ Tu Respuesta:**
> *(Escribe aquí tu respuesta)*

**🤖 Corrección de la IA:**
> *(La IA corregirá esto cuando respondas)*


## 5. Decisiones Específicas del Código del TP 💻

### 13. **Seguridad en Endpoints:** 
En la función `lista` con acción `BUSCAR`, reconstruimos la respuesta mediante un diccionario y evitamos devolver el campo `clave`. ¿Por qué hicimos esto y qué problema nos traería mandar los datos en crudo al frontend?

**🗣️ Tu Respuesta:**
> *(Escribe aquí tu respuesta)*

**🤖 Corrección de la IA:**
> *(La IA corregirá esto cuando respondas)*


### 14. **Búsqueda (LIKE):** 
En `usuario_service.py` programaste la búsqueda con `.filter(Usuario.usuario.like(f"%{filtro}%"))`. ¿Qué hace el símbolo `%` dentro de esa sentencia SQL?

**🗣️ Tu Respuesta:**
> *(Escribe aquí tu respuesta)*

**🤖 Corrección de la IA:**
> *(La IA corregirá esto cuando respondas)*


### 15. **Query Params vs Path Params:** 
Nuestro login funciona así: `GET /tp1/login?user=cristian&pass=123`. ¿Cómo hace FastAPI en el código (con `Query(...)`) para extraer esos datos de la URL e inyectarlos en la función de Python?

**🗣️ Tu Respuesta:**
> *(Escribe aquí tu respuesta)*

**🤖 Corrección de la IA:**
> *(La IA corregirá esto cuando respondas)*
