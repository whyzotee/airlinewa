from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    id: str
    name: str
    email: str


@router.post("/login")
def login(body: LoginRequest) -> LoginResponse:
    user = airline.login(body.email, body.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="CREDENTIAL_INVALID"
        )

    return LoginResponse(id=user.id, name=user.name, email=user.accout.email)
