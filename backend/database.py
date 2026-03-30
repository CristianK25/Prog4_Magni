import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. Cargar las variables de entorno desde el archivo .env
load_dotenv()

# 2. Obtener la URL de conexión que escribiste en el .env
URL_BASE_DATOS = os.getenv("DB_URL")

# 3. Crear el "Motor" (engine) que se conecta a PostgreSQL
engine = create_engine(URL_BASE_DATOS)

# 4. Crear la fábrica de sesiones. 
# Esto nos permitirá abrir una "conversación" con la base de datos cada vez que hagamos una consulta.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5. Crear la clase Base. 
# Todos los modelos (las tablas) que creemos más adelante van a heredar de esta clase.
Base = declarative_base()
