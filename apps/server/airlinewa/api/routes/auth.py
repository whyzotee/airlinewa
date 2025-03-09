from airlinewa.models import LoginModel
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(model: LoginModel):
    users = airline.users

    for user in users:
        response = user.get_accout.login(model.username, model.password)

        if response:
            return {"id": user.get_id}

        break

    # return {"error": "Username or password wrong, please try again."}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="CREDENTIAL_INVALID"
    )
