from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    id: str


@router.post("/login")
def login(body: LoginRequest) -> LoginResponse:
    result = airline.login(body.email, body.password)

    if result == "CREDENTIAL_INVALID":
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="CREDENTIAL_INVALID"
    )

    return LoginResponse(id=result)
    # return {"error": "Username or password wrong, please try again."}