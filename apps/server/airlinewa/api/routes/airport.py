from airlinewa.models import Airport
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/airport", tags=["airport"])


@router.get(
    "/",
    name="Get airports",
    description="get all airports",
    status_code=status.HTTP_200_OK,
)
async def airports() -> list[Airport]:
    airports = airline.airport_list

    if len(airports) <= 0 or airports is None:
        return []

    return [
        Airport(code=airport.code, name=airport.name, address=airport.address)
        for airport in airports
    ]
