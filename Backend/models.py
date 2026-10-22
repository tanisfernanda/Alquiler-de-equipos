from typing import Annotated, Optional

from pydantic import BaseModel, BeforeValidator, Field


PyObjectId = Annotated[str, BeforeValidator(lambda value: str(value) if value is not None else value)]


class Alquiler(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    equipo_renta: str = Field(min_length=1)
    cliente: str = Field(min_length=1)
    dias_alquiler: str = Field(min_length=1)
    devuelto: bool = False

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
    }


class UpdateAlquiler(BaseModel):
    equipo_renta: Optional[str] = Field(default=None, min_length=1)
    cliente: Optional[str] = Field(default=None, min_length=1)
    dias_alquiler: Optional[str] = Field(default=None, min_length=1)
    devuelto: Optional[bool] = None

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
    }
