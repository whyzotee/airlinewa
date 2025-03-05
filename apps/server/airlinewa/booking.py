from .user import User
from .flight import FlightRoute
from .passenger import Passenger

class Booking:
    # def __init__(self, id, user:User, flight_instance: Flight, ticket, payment, passenger:list[Passenger],service):
    def __init__(self, id, user: User, flight_route: FlightRoute, passenger:list[Passenger], services: list):
        self.__id = id
        self.__user = user
        self.__flight_route = flight_route
        self.__passenger = passenger
        self.__services = services
    
    @property
    def get_booking_details(self):
        print("========== Booking detail ==============")
        print("ID: ", self.__id)
        print("User: ", self.__user)
        print("Flight: ", self.__flight_route)
        print("Passenger: ", self.__passenger)
        print("Service: ", self.__services)

    def calculate_payment(self):
        return 100.00