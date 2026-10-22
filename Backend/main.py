from fastapi import FastAPI, Request
from router.alquileres import router_alquileres
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from fastapi.responses import JSONResponse
from pymongo.errors import ServerSelectionTimeoutError

app = FastAPI()

origins = [
    config("FRONTEND_URL", default="http://localhost:5173"),
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.exception_handler(ServerSelectionTimeoutError)
async def mongo_unavailable_handler(request: Request, error: ServerSelectionTimeoutError):
    return JSONResponse(
        status_code=503,
        content={
            "detail": (
                "MongoDB no está disponible. Inicia el servicio MongoDB "
                "y vuelve a intentar."
            )
        },
    )


@app.get('/')
def welcome():
    return {'message': 'Bienvenido a la API de Alquiler de Equipos'}

app.include_router(router_alquileres)