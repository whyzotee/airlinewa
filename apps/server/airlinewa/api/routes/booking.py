from datetime import datetime

from airlinewa.models import Airport
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/booking", tags=["booking"])


class BookingModel(BaseModel):
    id: str
    user_id: str
    date: datetime
    departure: datetime
    origin: str
    destination: str
    arrive: datetime
    status: str


@router.get("/")
def bookings() -> list[BookingModel]:
    # return [BookingModel(id=booking.id) for booking in airline.bookings]

    return [
        BookingModel(
            id="booking_1234",
            user_id="user_123",
            date=datetime.now(),
            departure=datetime.now(),
            origin="BKK",
            destination="CNX",
            arrive=datetime.now(),
            status="CONFIRMED",
        )
    ]
