from airlinewa.core.config import settings
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/")
def users():
    return []
