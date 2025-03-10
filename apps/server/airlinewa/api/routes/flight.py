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

    if destination is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="DATE_INVALID"
        )

    flight_route_list = []
    people_count = adult + child + kid

    for flight_route in airline.flight_route_list:
        src = flight_route.origin[-1] == origin
        dest = flight_route.destination[-1] == destination
        depart_date = flight_route.date.timetuple().tm_yday == datetime.fromisoformat(date).timetuple().tm_yday
        avaliable = flight_route.is_avaliable
        flight = airline.get_flight(flight_route.id)

        if flight == None:
            continue

        seats = len(flight.aircraft.get_avaliable_seat(seat_class)) >= people_count

        if (src and dest  and depart_date and seats and avaliable):
            departure = flight_route.schedule.departure
            arrival = flight_route.schedule.arrival

            schedule = FlightRoutSchedule(departure=departure, arrival=arrival)

            flight_route_list.append(
                FlightRoute(
                    id=flight_route.id,
                    origin=flight_route.origin,
                    schedule=schedule,
                    destination=flight_route.destination,
                    date=flight_route.date,
                    price=flight_route.price,
                )
            )

    return flight_route_list

