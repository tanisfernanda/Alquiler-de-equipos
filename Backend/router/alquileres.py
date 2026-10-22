from bson import ObjectId
from fastapi import APIRouter, HTTPException

from database import (
    create_alquiler,
    delete_alquiler_db,
    get_alquiler_por_equipo_y_cliente,
    get_one_alquiler_id,
    get_todos_alquileres,
    update_alquiler_db,
)
from models import Alquiler, UpdateAlquiler


router_alquileres = APIRouter()


@router_alquileres.get("/api/alquileres", response_model=list[Alquiler])
async def get_alquileres():
    return await get_todos_alquileres()


@router_alquileres.post("/api/alquileres", response_model=Alquiler)
async def save_alquiler(alquiler: Alquiler):
    existente = await get_alquiler_por_equipo_y_cliente(
        alquiler.equipo_renta, alquiler.cliente
    )
    if existente:
        raise HTTPException(
            status_code=400,
            detail="Este alquiler para este cliente y equipo ya existe",
        )

    datos = alquiler.model_dump(by_alias=True, exclude={"id"})
    return await create_alquiler(datos)


@router_alquileres.get("/api/alquileres/{id}", response_model=Alquiler)
async def get_alquiler(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")

    alquiler = await get_one_alquiler_id(id)
    if not alquiler:
        raise HTTPException(status_code=404, detail=f"Alquiler con ID {id} no encontrado")
    return alquiler


@router_alquileres.put("/api/alquileres/{id}", response_model=Alquiler)
async def put_alquiler(id: str, alquiler: UpdateAlquiler):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")

    response = await update_alquiler_db(id, alquiler)
    if not response:
        raise HTTPException(status_code=404, detail=f"Alquiler con ID {id} no encontrado")
    return response


@router_alquileres.delete("/api/alquileres/{id}")
async def remove_alquiler(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")

    if not await delete_alquiler_db(id):
        raise HTTPException(status_code=404, detail=f"Alquiler con ID {id} no encontrado")
    return {"message": "Alquiler borrado satisfactoriamente"}
