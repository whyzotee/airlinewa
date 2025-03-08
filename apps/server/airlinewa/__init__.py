from .air import *
from .user import *
from .flight import *
from .service import *
from .booking import Booking
from .payment import Payment
from .passenger import GENDER, IDENTITY_TYPE, Passenger

from .mockup import MockUp

class Airlinewa:
    def __init__(self):
        self.__user_list: list[User] = MockUp.gen_users()
        self.__fight_list: list[Flight] = []
        self.__fight_route_list: list[FlightRoute] = []
        self.__booking_list: list[Booking] = []
        self.__aircraft_list: list[Aircraft] = MockUp.gen_aircraft()
        self.__airport_list: list[Airport] = MockUp.gen_airport()

    def set_flight(self, list_flight: list[Flight]):
        self.__fight_list = list_flight

    def set_flight_route(self, list_flight_route: list[FlightRoute]):
        self.__fight_route_list = list_flight_route

    # ============================ Medthod ============================ #

    # Function Section
    def get_flight(self, flight_id) -> Flight:
        for flight in self.__fight_list:
            if flight.flight_route.get_id == flight_id:
                return flight
            
    def get_flight_route(self, flight_route_id) -> FlightRoute:
         for flight_route in self.__fight_route_list:
            if flight_route.get_id == flight_route_id:
                return flight_route
    
    @staticmethod
    def is_flight_route(flight_route) -> bool:
        return isinstance(flight_route, FlightRoute)
    
    def booking_flight_route(self, 
                             user_id, 
                             flight_route_id, 
                             passengers: list[Passenger] | None, 
                             contact: Contact) ->  tuple[FlightRoute, list[str]]:
        
        user = self.get_user(user_id)
        
        if user == None:
            raise Exception("USER_NOT_FOUND")
        
        flight = self.get_flight(flight_route_id)
        if flight == None:
            raise Exception("FLIGHT_NOT_FOUND")

        seats = flight.aircraft.get_avaliable_seat()
        if len(seats) <= 0 or len(seats) < len(passengers):
            raise Exception("NO_SEAT_LEFT")
        
        reserve_seat = flight.aircraft.reserve_seat(len(passengers))
        print("reserve_seat", reserve_seat)

        payment_method = Payment.method()

        return flight.flight_route, payment_method

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
        test = Passenger(GENDER.MALE, "Chatnarint", "Boonsaeng", datetime(2546, 1, 26), IDENTITY_TYPE.CARD, "1581878512")
   
        return [test]
    
    def create_contact(self, title, name, lastname, email, country_code, phone_number) -> Contact:
        contact = Contact(title, name, lastname, email, country_code, phone_number)

        return contact

    # Property Section
    @property
    def get_all_services(self):
        return Service.get_services()
    
    @property
    def get_all_users(self):
        return self.__user_list

    # @property
    # def get_booking_list(self) -> list[Booking]:
    #     return self.__booking_list

    def get_user(self, user_id) -> User:
        for user in self.__user_list:
            if user.get_id == user_id:
                return user

    @property
    def get_flight_list(self) -> list[Flight]:
        return self.__fight_list

    @property
    def get_flight_route_list(self) -> list[FlightRoute]:
        return self.__fight_route_list

    @property
    def get_aircraft_list(self) -> list[Aircraft]:
        return self.__aircraft_list

    @property
    def get_airport_list(self) -> list[Airport]:
        return self.__airport_list
    
    # ===================== Initialize ===================== #
    @classmethod
    def initialize(self):
        airline = Airlinewa()

        airport_list = airline.get_airport_list
        aircraft_list = airline.get_aircraft_list

        gen_flights, gen_flight_route  = MockUp.gen_flight_and_flight_route(airport_list, aircraft_list)

        airline.set_flight(gen_flights)
        airline.set_flight_route(gen_flight_route)
        
        return airline