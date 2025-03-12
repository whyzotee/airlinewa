from datetime import datetime
from airlinewa.models import FlightRoute, FlightRoutSchedule
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/flight", tags=["flight"])


@router.get("/")
def search_flight(
    tripe_type: str, 
    seat_class: str, 
    origin: str, 
    destination: str, 
    date: str, 
    adult: int, 
    child: int, 
    kid: int) -> list[FlightRoute]:

    if origin is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="ORIGIN_INVALID"
        )

    if destination is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="DESTINATION_INVALID"
        )

    if date is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="DATE_INVALID"
        )

    people_count = adult + child + kid
    result, schedule_list = airline.search_flight_route(origin, destination, date, seat_class, people_count)

    flight_route_list = []

    for index in range(len(result)):
        flight_route = result[index]
        sche = schedule_list[index]

        schedule = FlightRoutSchedule(departure=sche[0],arrival=sche[1],duration=int(sche[2]))

        format_flight = FlightRoute(
            id=flight_route.id,
            origin=flight_route.origin,
            schedule=schedule,
            destination=flight_route.destination,
            date=flight_route.date,
            price=flight_route.price
        )
        flight_route_list.append(format_flight)

    return flight_route_list