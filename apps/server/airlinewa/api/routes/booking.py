from datetime import datetime

from airlinewa.models import Airport
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/booking", tags=["booking"])


class BookingResponse(BaseModel):
    id: str
    user_id: str
    date: datetime
    departure: str
    origin: list[str]
    destination: list[str]
    arrive: str
    status: str


@router.get("/")
def bookings() -> list[BookingResponse]:
    user = airline.find_user("ca47592b-9bff-4336-8adf-ed8411d4a2a0")
    if user is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    [booking.flight_route.destination for booking in user.bookings]
    user_bookings = [
        BookingResponse(
            id=booking.id,
            user_id=booking.user.id,
            date=booking.flight_route.date,
            departure=booking.flight_route.schedule.departure,
            origin=booking.flight_route.origin,
            arrive=booking.flight_route.schedule.arrival,
            destination=booking.flight_route.destination,
            status=booking.flight_route.status,
        )
        for booking in user.bookings
    ]

    return user_bookings
    # return [
    #     BookingResponse(
    #         id="booking_1234",
    #         user_id="user_123",
    #         date=datetime.now(),
    #         departure=datetime.now(),
    #         origin="BKK",
    #         destination="CNX",
    #         arrive=datetime.now(),
    #         status="CONFIRMED",
    #     )
    # ]
