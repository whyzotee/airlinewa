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
    users = airline.users

    for user in users:
        response = user.get_accout.login(body.email, body.password)

        if response:
            # return {"id": user.id}
            return LoginResponse(id=user.id)

        break

    # return {"error": "Username or password wrong, please try again."}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="CREDENTIAL_INVALID"
    )
