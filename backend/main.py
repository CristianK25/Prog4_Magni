from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importamos la conexión a la BD y nuestros modelos
from database import engine, Base
from model import usuario_model

# Importamos los controladores (routers)
from controller import usuario_controller
from controller import tp_controller

# 1. Crear las tablas en PostgreSQL si no existen
Base.metadata.create_all(bind=engine)

# 2. Instancia de la app
app = FastAPI()

# 3. Configuraciones Globales (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ], # Orígenes permitidos (Tu frontend de Live Server)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. "Enchufar" los controladores
app.include_router(usuario_controller.router)
app.include_router(tp_controller.router)

# Endpoint de health check
@app.get("/")
async def probar_back():
    return {
        "mensaje": "Backend conectado a PostgreSQL correctamente y funcionando..."
    }