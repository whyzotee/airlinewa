from airlinewa.models import LoginModel
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(model: LoginModel):
    result = airline.login(model.username, model.password)

    if isinstance(result, str):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=result)

    return result