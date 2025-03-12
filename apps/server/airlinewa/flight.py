from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .air import Aircraft, Airport

class FlightSchedule:
    def __init__(
        self, id: str, day_of_week, departure_time: str, arrive_time: str, duration
    ):
        self.__id = id
        self.__day_of_week = day_of_week
        self.__departure_time = departure_time
        self.__arrive_time = arrive_time
        self.__duration = duration

    @property
    def info(self):
        return {
            "id": self.__id,
            "day_of_week": self.__day_of_week,
            "departure": self.__departure_time,
            "arrive": self.__arrive_time,
            "duration": self.__duration,
        }

    @property
    def departure(self):
        return self.__departure_time

    @property
    def arrival(self):
        return self.__arrive_time

    # def gen_aircraft(self)-> Aircraft:
    #     model_aircrafts = ["FMS P-51D Mustang", "E-flite F-16 Thunderbirds", "HobbyZone Carbon Cub S2", "Freewing A-10 Thunderbolt II", "Dynam Spitfire Mk IX", "E-flite Extra 300 3D", "VolantexRC Trainstar Ascent", "Freewing F-22 Raptor", "Dancing Wings Piper J-3 Cub", "Skywalker X8"]

    #     num = random.randint(0,9)
    #     model = model_aircrafts[num]
    #     aircarft = Aircraft(f"aircarft_00${num}", model)

    #     return aircarft


class FlightRoute:
    STATUS_AVALIABLE = "AVALIABLE"
    STATUS_BOARDED = "BOARDED"
    STATUS_COMPLETED = "COMPLETED"
    STATUS_NOT_AVALIABLE = "NOT_AVALIABLE"

    def __init__(
        self,
        id: str,
        origin: "Airport",
        destination: "Airport",
        status: str,
        flight_schedule: "FlightSchedule",
        base_price: int,
        date: datetime,
    ):
        self.__id = id
        self.__schedule = flight_schedule
        self.__origin = origin
        self.__destination = destination
        self.__status = status
        self.__base_price = base_price
        self.__date = date

    @property
    def id(self) -> str:
        return self.__id

    @property
    def schedule(self):
        return self.__schedule

    @property
    def origin(self):
        return self.__origin.info

    @property
    def destination(self):
        return self.__destination.info

    def __get_status(self):
        return self.__status

    def __set_status(self, status):
        self.__status = status

    @property
    def is_avaliable(self):
        return self.__status == FlightRoute.STATUS_AVALIABLE

    @property
    def price(self):
        return self.__base_price

    @property
    def tax(self):
        return round(self.__base_price * 0.15, 2)

    @property
    def date(self) -> datetime:
        return self.__date

    status = property(__get_status, __set_status)


class Flight:
    def __init__(self, flight_route: "FlightRoute", aircraft: "Aircraft"):
        self.__flight_route = flight_route
        self.__aircraft = aircraft

    @property
    def route(self):
        return self.__flight_route

    @property
    def aircraft(self):
        return self.__aircraft
