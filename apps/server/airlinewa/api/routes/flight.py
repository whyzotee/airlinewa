from datetime import datetime

from airlinewa.models import FlightRoute, FlightRoutSchedule
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/flight", tags=["flight"])


class FlightScheduleResponse(BaseModel):
    arrival: str
    day_of_week: list[int]
    departure: str
    duration: int


class FlightRouteResponse(BaseModel):
    id: str
    date: datetime
    destination: list[str]
    origin: list[str]
    status: str
    is_avaliable: bool
    price: int
    schedule: FlightScheduleResponse


class SeatResponse(BaseModel):
    id: str
    price: str
    class_str: str
    status: str


class AircraftResponse(BaseModel):
    id: str
    model: str
    # seats: list[SeatResponse]


class FlightResponse(BaseModel):
    aircraft: AircraftResponse
    route: FlightRouteResponse


@router.get("/")
def search_flight(
    tripe_type: str,
    seat_class: str,
    origin: str,
    destination: str,
    date: str,
    adult: int,
    child: int,
    kid: int,
) -> list[FlightRoute]:

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
    result, schedule_list, price_list = airline.search_flight_route(
        origin, destination, date, seat_class, people_count
    )

    flight_route_list = []

    for index in range(len(result)):
        flight_route = result[index]
        sche = schedule_list[index]

        schedule = FlightRoutSchedule(
            departure=sche[0], arrival=sche[1], duration=int(sche[2])
        )

        format_flight = FlightRoute(
            id=flight_route.id,
            origin=flight_route.origin,
            schedule=schedule,
            destination=flight_route.destination,
            date=flight_route.date,
            price=price_list[index],
        )
        flight_route_list.append(format_flight)

    return flight_route_list


@router.post("/{flight_number}")
def find_flight(flight_number: str, date: str) -> FlightResponse:
    flight = airline.find_flight(flight_number)
    if flight is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="FLIGHT_NOT_FOUND"
        )

    flight_route = flight.route
    flight_schedule = flight_route.schedule
    aircraft = flight.aircraft
    # seats = [
    #     SeatResponse(
    #         id=seat.id, price=seat.price, class_str=seat.class_str, status="asd"
    #     )
    #     for seat in aircraft.seats
    # ]

    return FlightResponse(
        aircraft=AircraftResponse(id=aircraft.id, model=aircraft.model),
        route=FlightRouteResponse(
            id=flight_route.id,
            date=flight_route.date,
            destination=flight_route.destination,
            is_avaliable=flight_route.is_avaliable,
            status=flight_route.status,
            origin=flight_route.origin,
            price=flight_route.price,
            schedule=FlightScheduleResponse(
                arrival=flight_schedule.arrival,
                day_of_week=flight_schedule.day_of_week,
                departure=flight_schedule.departure,
                duration=flight_schedule.duration,
            ),
        ),
    )
