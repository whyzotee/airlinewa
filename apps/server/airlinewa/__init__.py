import random
from datetime import datetime

from .air import *
from .user import *
from .flight import *
from .service import *
from .booking import Booking
from .passenger import Passenger

from .mockup import MockUp

class Airlinewa:
    def __init__(self):
        self.__user_list: list[User] = []
        self.__fight_route_list: list[FlightRoute] = []
        self.__booking_list: list[Booking] = []
        self.__airport_list: list[Airport] = []

    def set_user(self, list_user: list[User]):
        self.__user_list = list_user

    def set_flight(self, list_flight_route: list[FlightRoute]):
        self.__fight_route_list = list_flight_route

    def set_airport(self, list_airport: list[Airport]):
        self.__airport_list = list_airport

    # ============================ Medthod ============================ #
    def get_all_services():
        return Service.get_all_services()

    @property
    def get_all_users(self):
        return self.__user_list

    @property
    def get_booking_list(self) -> list[Booking]:
        return self.__booking_list

    @property
    def get_test_user(self) -> User:
        return self.__user_list[0]

    def get_user(self, user_id) -> User:
        for user in self.__user_list:
            if user.get_id == user_id:
                return user

    def get_flight_route_list(self) -> list[FlightRoute] :
        return self.__fight_route_list

    def get_flight_route(self, flight_id) -> FlightRoute:
        for flight in self.__fight_route_list:
            if flight.get_id == flight_id:
                return flight

    def get_airport(self, code) -> Airport | None:
        for airport in self.__airport_list:
            if airport.get_code == code:
                return airport

        return None

    def get_airport_list(self) -> list[Airport]:
        return self.__airport_list

    def create_booking(
        self,
        user_instance: User,
        flight_route: FlightRoute,
        list_pssenger: list[Passenger],
        list_service: list[Service] | None,
    ) -> Booking:
        booking_instance = Booking(
            "booking_test_001", user_instance, flight_route, list_pssenger, list_service
        )
        self.__booking_list.append(booking_instance)
        return booking_instance

    def create_passenger(self, passenger_data) -> list[Passenger]:
        return [Passenger("passenger_001")]

    # ===================== Initialize ===================== #
    @classmethod
    def initialize(self):
        airline = Airlinewa()

        airline.set_user(MockUp.gen_users())
        airline.set_airport(MockUp.gen_airport())

        sche_001 = FlightSchedule("sche_001", {1, 2, 3}, "18:00", "19:40", 100)
        all_airport = airline.get_airport_list()

        gen_flights = []
        flight_id = 1

        for l in range(3):
            for i in range(len(all_airport)):
                for j in range(len(all_airport)):
                    if i != j:
                        flight = FlightRoute(
                            f"AW {flight_id:03d}",
                            all_airport[i],
                            all_airport[j],
                            STATUS_AVALIABLE,
                            sche_001,
                            random.randint(1000, 5000),
                            datetime.today().isoformat(),
                        )
                        gen_flights.append(flight)
                        flight_id += 1

        airline.set_flight(gen_flights)
        
        return airline
