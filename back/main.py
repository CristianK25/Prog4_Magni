from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.database import create_db_and_tables
from app.modules.participante.router import router as participante_router

# Esto es un "lifespan", se ejecuta una única vez al prender el servidor.
# Es ideal para decirle a la BD "creame las tablas si no existen".
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    # Acá iría código al apagar el server si hiciera falta.

app = FastAPI(title="Prog4 Magni API", lifespan=lifespan)

# -- BLOQUEO DE SEGURIDAD MUNDIAL: EL C.O.R.S. -- #
# Si no ponés esto, React jamás va a poder hablar con la API.
origenes_permitidos = [
    "http://localhost:5173", # Puerto de Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origenes_permitidos,
    allow_credentials=True,
    allow_methods=["*"], # Permitimos GET, POST, DELETE...
    allow_headers=["*"], # Permitimos cualquier tipo de Header (JSON, Text, etc)
)

# Enchufamos la zapatilla de los endpoints con el prefijo /api
app.include_router(participante_router, prefix="/api")

@app.get("/")
def home():
    return {"status": "Vibes check passed! Backend andando 😎"}
