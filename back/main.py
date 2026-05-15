from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.database import create_db_and_tables
from app.modules.participante.router import router as participante_router
from app.modules.usuarios.router import router as usuarios_router
from app.modules.usuarios.model import Usuario
from seed import seed_users

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gestiona el ciclo de vida de la aplicación.
    Inicializa la base de datos y ejecuta los seeds al iniciar.
    """
    create_db_and_tables()
    seed_users()
    yield


app = FastAPI(title="Prog4 Magni API", lifespan=lifespan)

origenes_permitidos = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(participante_router, prefix="/api")
app.include_router(usuarios_router, prefix="/api")

@app.get("/")
def home():
    """Endpoint de verificación de salud de la API."""
    return {"status": "Vibes check passed! Backend andando 😎"}
