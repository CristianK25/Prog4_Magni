# Guía de Instalación y Configuración del Entorno Backend (FastAPI)

Esta guía contiene todos los comandos necesarios para clonar este repositorio, configurar el entorno virtual, instalar las dependencias y levantar el proyecto de manera idéntica en otra computadora.

## 1. Clonar el repositorio y acceder a la carpeta

Primero debes descargar el proyecto y ubicarte en el directorio correspondiente al backend:

```bash
# Reemplaza la URL por el enlace de tu repositorio
git clone <URL_DEL_REPOSITORIO>
cd tp1/backend
```

## 2. Crear el Entorno Virtual

Es fundamental crear un entorno virtual (`venv`) para que las dependencias instaladas en el proyecto no hagan conflicto con otras librerías globales de tu PC.

```bash
# Comando general en Linux / macOS / WSL
python3 -m venv venv

# Comando general en Windows
python -m venv venv
```

## 3. Activar el Entorno Virtual

Una vez creado, debes activarlo. Sabrás que está activo porque aparecerá `(venv)` al inicio de la línea en tu terminal.

**En Linux / macOS / WSL:**

```bash
source venv/bin/activate
```

**En Windows (CMD / PowerShell):**

```cmd
venv\Scripts\activate
```

## 4. Instalar Dependencias

Lo ideal es que las dependencias estén guardadas en un archivo de texto para que todos utilicen las mismas versiones.

Si ya has subido al repositorio el archivo `requirements.txt`, instálalo todo con:

```bash
pip install -r requirements.txt
```

> **Nota:** Si en algún momento instalas algo nuevo en tu entorno local original, recuerda exportar los componentes utilizando **`pip freeze > requirements.txt`** antes subir los cambios a Git.

Si **no** cuentas con el archivo `requirements.txt`, instala nuevamente el stack que estamos utilizando (FastAPI, entorno de base de datos Postgres con SQLAlchemy, lectura de variables .env):

```bash
pip install fastapi "uvicorn[standard]" sqlalchemy psycopg2-binary python-dotenv
```

## 5. Configurar Variables de Entorno

Los archivos `.env` (donde van las contraseñas) generalmente NO se suben a GitHub por seguridad, por ende vas a tener que crearlo en la otra computadora.

Crea un archivo llamado `.env` dentro de la carpeta `/backend` y coloca dentro tus valores de conexión:

```env
DATABASE_NAME='utn_db'
DATABASE_PASSWORD='123456789'
```

Puedes crearlo rápidamente desde la terminal en Linux/Mac así:

```bash
echo "DATABASE_NAME='nombre'" > .env
echo "DATABASE_PASSWORD=contraseña" >> .env
```

## 6. Instalar y Configurar la Base de Datos PostgreSQL

Para que la nueva PC se comporte de la misma forma, es necesario instalar PostgreSQL, asegurarse de que el servicio esté corriendo y crear la base de datos localmente.

### Instalación en Linux / Debian / Ubuntu (WSL)

Si no tienes PostgreSQL instalado, abre otra terminal y ejecuta los siguientes comandos:

```bash
# Actualizar lista de paquetes
sudo apt update

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Iniciar el servicio de base de datos
sudo service postgresql start
```

### Configuración del Usuario y la Base de Datos

Una vez instalado y con el servicio iniciado, vamos a configurarlo:

```bash
# Cambiar al administrador de postgres
sudo su - postgres
psql

# Una vez dentro de PostgresQL (el prompt cambia a "postgres=#"):
# 1. Cambias la password al usuario "postgres"
ALTER USER postgres WITH PASSWORD '123456789';

# 2. Creas la base de datos para el proyecto
CREATE DATABASE utn_db;

# Salir de postgres
\q
exit
```

## 7. Ejecutar el Servidor FastAPI

Con las librerías instaladas, base de datos local predispuesta y el entorno virtual activo, simplemente inicia el servidor:

```bash
uvicorn main:app --reload
```

_También, en versiones modernas de FastAPI puedes usar `fastapi dev main.py`._

¡Listo! Para comprobar que esté funcionando, abre en tu navegador:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)** (Para ver la documentación interactiva de Swagger).
