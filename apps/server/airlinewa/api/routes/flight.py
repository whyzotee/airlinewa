from airlinewa.models import FlightRoute, FlightRoutSchedule
from fastapi import APIRouter, HTTPException, status

from airlinewa import airline

router = APIRouter(prefix="/flight", tags=["flight"])


@router.get("/")
def search_flight(origin: str, destination: str, date: str):
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

    for flight_route in airline.flight_route_list:
        origin = flight_route.origin
        destination = flight_route.destination
        # date = flight_route.date
        price = flight_route.price

        if (
            origin[-1] == origin
            and destination[-1] == destination
            and flight_route.is_avaliable
        ):
            departure = flight_route.schedule.departure
            arrival = flight_route.schedule.arrival
            # flight_route_list.append({
            #     "id": str(flight_route.get_id),
            #     "origin": flight_route.get_origin,
            #     "destination": flight_route.get_destination,
            #     "schedule": {
            #         "departure": flight_route.get_schedule.get_departure(),
            #         "arrival": flight_route.get_schedule.get_arrival()
            #     },
            #     "date": flight_date,
            #     "price": flight_route.get_price,
            #     # "status": flight_status
            # })
            schedule = FlightRoutSchedule(departure=departure, arrival=arrival)
            flight_route_list.append(
                FlightRoute(
                    id=flight_route.id,
                    origin=flight_route.origin,
                    schedule=schedule,
                    destination=flight_route.destination,
                    date=flight_route.date,
                    price=price,
                )
            )

    return flight_route_list
