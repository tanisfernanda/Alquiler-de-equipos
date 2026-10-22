from bson import ObjectId
from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient

from models import Alquiler, UpdateAlquiler


cliente_db = AsyncIOMotorClient(
    config("MONGODB_URL", default="mongodb://localhost:27017"),
    serverSelectionTimeoutMS=3000,
)
database = cliente_db.alquiler_equipos_db
coleccion = database.alquileres


async def get_todos_alquileres():
    alquileres = []
    async for document in coleccion.find({}):
        document["_id"] = str(document["_id"])
        alquileres.append(Alquiler(**document))
    return alquileres


async def get_one_alquiler_id(id: str):
    alquiler = await coleccion.find_one({"_id": ObjectId(id)})
    if alquiler:
        alquiler["_id"] = str(alquiler["_id"])
    return alquiler


async def create_alquiler(alquiler: dict):
    result = await coleccion.insert_one(alquiler)
    created = await coleccion.find_one({"_id": result.inserted_id})
    if created:
        created["_id"] = str(created["_id"])
    return created


async def update_alquiler_db(id: str, data: UpdateAlquiler):
    fields = data.model_dump(exclude_none=True)
    await coleccion.update_one({"_id": ObjectId(id)}, {"$set": fields})
    return await get_one_alquiler_id(id)


async def delete_alquiler_db(id: str):
    result = await coleccion.delete_one({"_id": ObjectId(id)})
    return result.deleted_count == 1


async def get_alquiler_por_equipo_y_cliente(equipo_renta: str, cliente: str):
    return await coleccion.find_one(
        {"equipo_renta": equipo_renta, "cliente": cliente}
    )
