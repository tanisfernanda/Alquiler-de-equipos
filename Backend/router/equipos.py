from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import (
    get_todos_equipos,
    get_one_equipo_id,
    get_equipo_por_nombre,
    update_equipo,
    create_equipo,
    delete_equipo
)
from models import Equipo, UpdateEquipo

equipo = APIRouter()

@equipo.get('/api/equipos')
async def get_equipos():
    equipos = await get_todos_equipos()
    return equipos

@equipo.post('/api/equipos')
async def save_equipo(equipo_data: Equipo):
    equipo_existente = await get_equipo_por_nombre(equipo_data.nombre)
    if equipo_existente:
        raise HTTPException(status_code=400, detail="El nombre del equipo ya existe")
    
    dict_equipo = equipo_data.model_dump()
    if dict_equipo.get('id') is None:
        del dict_equipo['id']
        
    responsive = await create_equipo(dict_equipo)
    return responsive

@equipo.get('/api/equipos/{id}', response_model=Equipo)
async def get_equipo(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")
    
    equipo_res = await get_one_equipo_id(id)
    if equipo_res:
        return equipo_res
    raise HTTPException(404, f'Equipo {id} no encontrado')

@equipo.put('/api/equipos/{id}', response_model=Equipo)
async def put_equipo(id: str, equipo_data: UpdateEquipo):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")
    
    response = await update_equipo(id, equipo_data)
    if response:
        return response
    raise HTTPException(404, f'Equipo {id} no encontrado')

@equipo.delete('/api/equipos/{id}')
async def remove_equipo(id: str):
    response = await delete_equipo(id)
    if response:
        return 'Equipo borrado satisfactoriamente'
    raise HTTPException(404, f'Equipo {id} no encontrado')