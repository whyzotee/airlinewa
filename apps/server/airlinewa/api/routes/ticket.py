from typing import List
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/ticket", tags=["ticket"])

class TicketResponse(BaseModel):
    ticket_id: str
    passenger_name: str
    seat: str

class FlightRoute(BaseModel):
    origin: str
    dest: str

class BookingResponse(BaseModel):
    flight_id: str
    booking_id: str
    user: str
    flight: FlightRoute
    tickets: List[TicketResponse]
    gate: str
    boarding_time: str
    flight_date: str

@router.get("/")
def ticket(booking_id: str) -> BookingResponse:
    booking = airline.find_booking(booking_id)

    if booking == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="NO_BOOKING_FOUND")

    ticket_list = []
    for ticket in booking.ticket:
        ticket_list.append(
            TicketResponse(
                ticket_id=ticket.id,
                passenger_name=f"{ticket.passenger.first_name} {ticket.passenger.last_name}",
                seat=ticket.seat.id
                ))
        
    origin = booking.flight_route.origin[0]
    origin_code = booking.flight_route.origin[-1]
    dest = booking.flight_route.destination[0]
    dest_code = booking.flight_route.destination[-1]

    flight = FlightRoute(origin=f"{origin} ({origin_code})", dest=f"{dest} ({dest_code})")

    return BookingResponse(
        flight_id= booking.flight_route.id,
        booking_id=booking.id,
        user=booking.user.name,
        flight=flight,
        gate=booking.flight_route.schedule.gate,
        boarding_time=booking.flight_route.schedule.departure,
        flight_date=booking.flight_route.date.isoformat(),
        tickets=ticket_list
    )