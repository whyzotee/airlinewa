from .air import *
from .user import *
from .flight import *
from .service import *
from .booking import Booking
from .passenger import Passenger

from datetime import datetime

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
    
    def get_test():
        return {"res":"ok", "data": "test"}
            
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
    
    # ===================== Initialize ===================== #

    def gen_users():
        gen_id = ["ca47592b-9bff-4336-8adf-ed8411d4a2a0", "02a93808-d0ce-4a70-8fe2-552472401547", "3b2d75e3-028f-4480-80ee-af0132d8b884", "ba786bd4-20ac-4446-9a8d-8df1ad1e74f1", "2c6e36ba-14b5-4f43-b33e-c21842810fbe", "dff42e64-c16e-4607-b91b-77d5e4d5e121", "a7c51caf-bdce-4602-b819-3d9c88d43f56", "38377cc5-c96f-448a-94ee-37cbc18a8f1a", "79c69bca-2a9f-4a0f-a373-0f301a12a4d0", "92711594-2719-4947-8417-54f996b4dd3c", "be46fe6f-a105-420f-aabe-c30bcf2644cd"]
        gen_name = ["whyzotee", "Teerapat", "Kawin", "Araya", "Phumipat", "Nannaphat", "Wit", "Supitcha", "Rawiphat", "Chayanan", "Peeraphat"]
        gen_phone_numbers = ["000-000-0000", "089-123-4567", "082-987-6543", "095-555-7890", "081-246-1357", "090-333-1122", "087-654-3210", "098-777-8888", "084-111-2223", "091-369-2587", "086-543-2109"]
        gen_emails = ["t","alex.johnson@example.com", "sophia.miller@example.com", "david.lee@example.com", "emma.wilson@example.com", "michael.brown@example.com", "olivia.smith@example.com", "william.taylor@example.com", "ava.jones@example.com", "james.garcia@example.com", "mia.martinez@example.com"]
        gen_passwords = ["t","Xy9@pLq3!", "aB#12$4xYz", "P@ssW0rd789", "Qz8!Mn@56", "5tG#lPqX!", "Rf2@Yx7LpQ", "Za1!QxYtP3", "KpX#98@LmT", "Tq7@ZxLpX2", "WmX!PqL@Y5"]

        gen_user = []

        for index in range(10):
            gen_account = Account().register(gen_emails[index], gen_passwords[index])
            user = User(gen_id[index], gen_name[index], gen_phone_numbers[index], gen_account)
            gen_user.append(user)

        return gen_user

    def gen_airport():
        list_airport_name = [
            "Bangkok", "Bangkok", "Chiang Mai", "Phuket", "Krabi",
            "Surat Thani", "Hat Yai", "Ubon Ratchathani", "Udon Thani", "Khon Kaen",
            "Chiang Rai", "Buri Ram", "Loei", "Pattaya", "Trang",
            "Nakhon Si Thammarat", "Roi Et", "Sakon Nakhon", "Nakhon Phanom", "Mae Hong Son"
        ]

        list_airport_addr = [
            "Suvarnabhumi Airport", "Don Mueang International Airport", "Chiang Mai International Airport",
            "Phuket International Airport", "Krabi International Airport",
            "Surat Thani International Airport", "Hat Yai International Airport", "Ubon Ratchathani Airport",
            "Udon Thani International Airport", "Khon Kaen Airport",
            "Mae Fah Luang - Chiang Rai International Airport", "Buri Ram Airport", "Loei Airport",
            "U-Tapao Rayong-Pattaya International Airport", "Trang Airport",
            "Nakhon Si Thammarat Airport", "Roi Et Airport", "Sakon Nakhon Airport",
            "Nakhon Phanom Airport", "Mae Hong Son Airport"
        ]

        list_airport_code = [
            "BKK", "DMK", "CNX", "HKT", "KBV",
            "URT", "HDY", "UBP", "UTH", "KKC",
            "CEI", "BFV", "LOE", "UTP", "TST",
            "NST", "ROI", "SNO", "KOP", "HGN"
        ]

        return [Airport(list_airport_name[i], list_airport_addr[i], list_airport_code[i]) for i in range(20)]

    @classmethod
    def initialize(self):
        airline = Airlinewa()
        
        airline.set_user(self.gen_users())
        airline.set_airport(self.gen_airport())

        bkk = Airport("Bangkok", "Suvarnabhumi Airport", "BKK")
        cnx = Airport("ChaingMai", "ChaingMai Airport", "CNX")

        sche_001 = FlightSchedule("sche_001", {1, 2, 3}, "18:00", "19:40", 100)

        airline.set_flight([FlightRoute(f"AW 010{i}", bkk, cnx, "OK", sche_001, 1500, datetime.today().isoformat()) for i in range(9)])

        return airline