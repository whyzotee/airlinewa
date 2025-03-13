from typing import List
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/ticket", tags=["ticket"])

class TicketResponse(BaseModel):
    ticket_id: str
    passenger_name: str
    seat: str
    isback: bool

class FlightRoute(BaseModel):
    id:str
    origin: str
    dest: str
    gate: str
    flight_date: str
    boarding_time: str

class BookingResponse(BaseModel):
    user: str
    booking_id: str
    flight: FlightRoute
    flight_back: FlightRoute | None
    tickets: List[TicketResponse]
    

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
                seat=ticket.seat.id,
                isback=ticket.isback
                ))
        
    origin = booking.flight_route.origin[0]
    origin_code = booking.flight_route.origin[-1]
    dest = booking.flight_route.destination[0]
    dest_code = booking.flight_route.destination[-1]

    flight = FlightRoute(
            id=booking.flight_route.id,
            origin=f"{origin} ({origin_code})", 
            dest=f"{dest} ({dest_code})",
            gate=booking.flight_route.schedule.gate,
            flight_date=booking.flight_route.date.isoformat(),
            boarding_time=booking.flight_route.schedule.departure
        )
    
    flight_back = None

    if booking.flight_route_back != None:
        origin = booking.flight_route_back.origin[0]
        origin_code = booking.flight_route_back.origin[-1]
        dest = booking.flight_route_back.destination[0]
        dest_code = booking.flight_route_back.destination[-1]

        flight_back = FlightRoute(
            id=booking.flight_route_back.id,
            origin=f"{origin} ({origin_code})", 
            dest=f"{dest} ({dest_code})",
            gate=booking.flight_route_back.schedule.gate,
            flight_date=booking.flight_route_back.date.isoformat(),
            boarding_time=booking.flight_route_back.schedule.departure
        )

    return BookingResponse(
        user=booking.user.name,
        booking_id=booking.id,
        flight=flight,
        flight_back=flight_back,
        tickets=ticket_list
    )