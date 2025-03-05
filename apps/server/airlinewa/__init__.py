from air import *
from user import *
from flight import *
from service import *
from passenger import Passenger
from booking import Booking
    
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

    # ============================ API ============================ #
    def api_get_all_airport(self):
        return_list = []
        for airport in self.__airport_list:
            return_list.append({"name":airport.get_name, "address":airport.get_address, "code":airport.get_code})

        return {"res": "ok", "airport_list": return_list}

    def api_search_flight(self, src, dest):
        for flight in self.__fight_route_list:
            if flight.get_origin == src and flight.get_origin == dest:
                return {"res": "ok", "id": flight.get_id}
            
        return {"error": "Can't search flight"}

    def api_login(self, username, password):
        for user in self.__user_list:
            response = user.get_accout.login(username, password)
            if response:
                return  {"res": "ok", "id": user.get_id} 
            
        return {"error": "Username or password wrong, please try again."}

    def api_checkout(self, flight_route_id):
        flight = self.get_flight_instance(flight_route_id)

        if flight == None:
            return {"error": "Can't find id"}
        
        return {
            "id": flight.get_id,
            "info":  {
                "origin": flight.get_origin,
                "destination": flight.get_destination,
                "schedule": flight.get_schedule.get_info,
                "date": flight.get_date
            },
            "price":[flight.get_price, flight.get_tax],
            "service": Service.get_all_services()
        }
    
    def api_booking(self, user_id, flight_route_id, list_passenger:list, list_service: list[Service] = None):
        user = self.get_user(user_id)
        flight = self.get_flight_instance(flight_route_id)
        list_passenger_data = self.create_passenger(list_passenger)

        booking_instance = self.create_booking(user, flight, list_passenger_data, list_service)

        return booking_instance.calculate_payment()

    # ============================ Medthod ============================ #
    @property
    def get_booking_list(self) -> list[Booking]:
        return self.__booking_list

    @property
    def get_test_user(self) -> User:
        return self.__user_list[0]
    
    def get_test(self):
        return "ok"
            
    def get_user(self, user_id) -> User:
        for user in self.__user_list:
            if user.get_id == user_id:
                return user

    def get_flight_instance(self, flight_instance_id) -> FlightRoute:
        for flight in self.__fight_route_list:
            if flight.get_id == flight_instance_id:
                return flight
    
    def get_airport(self, code) -> Airport | None:
        for airport in self.__airport_list:
            if airport.get_code == code:
                return airport
            
        return None

    def get_all_airport(self) -> list[Airport]:
        return self.__airport_list

    def create_booking(self, user_instance: User, flight_route: FlightRoute, list_pssenger: list[Passenger], list_service: list[Service] | None) -> Booking:
        booking_instance = Booking("booking_test_001", user_instance, flight_route, list_pssenger, list_service)
        self.__booking_list.append(booking_instance)
        return booking_instance

    def create_passenger(self, passenger_data) -> list[Passenger]:
        return [Passenger("passenger_001")]