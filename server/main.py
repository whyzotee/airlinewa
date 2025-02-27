import uuid
import random

from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class Account:
    def __init__(self):
        self.__email = ""
        self.__password = ""

    def login(self, email, password):
        if self.__email != email or self.__password != password:
            return "Wrong username or password"
        
        return True
    
    def register(self, email, password):
        self.__email = email
        self.__password = password

        return self

class User:
    def __init__(self, id, name, phone, accout:Account):
        self.__id = id
        self.__name = name
        self.__phone_num = phone
        self.__account = accout

    @property
    def get_id(self):
        return self.__id
    
    @property
    def get_name(self):
        return self.__name

    @property
    def get_phone_number(self):
        return self.__phone_num

    @property
    def get_accout(self) -> Account:
        return self.__account

class SeatStatus:
    OK = "avaliable"

class Seat:
    def __init__(self, id, status, price):
        self.__id = id
        self.__status = status
        self.__price = price
    
    @property
    def get_id(self):
        return self.__id
    
    @property
    def get_status(self):
        return self.__status
    
    @property
    def get_price(self):
        return self.__price

class Airport:
    pass

class Aircraft:
    def __init__(self, id, model):
        self.__id = id
        self.__model = model
        self.__seats = self.gen_seat()

    def gen_seat(self) -> list[Seat]:
        return [Seat(f"seat_00{index}", SeatStatus.OK, "$59.49") for index in range(50)]

    @property
    def get_id(self):
        return self.__id
    
    @property
    def get_model(self):
        return self.__model

    @property
    def get_seats(self):
        return self.__seats

class FlightRoute:
    def __init__(self, id, origin, destination, status):
        self.__id = id
        self.__origin = origin
        self.__destination = destination
        self.__status = status
    
    @property
    def get_id(self):
        return self.__id

    @property
    def get_origin(self):
        return self.__origin
    
    @property
    def get_destination(self):
        return self.__destination
    
    @property
    def get_status(self):
        return self.__status

    @property
    def get_price(self):
        return 1900

class FlightSchedule:
    def __init__(self, id, dayOfWeek, departureTime, arriveTime):
        self.__id = id
        self.__origin = Airport()
        self.__destination = Airport()
        self.__dayOfWeek = dayOfWeek
        self.__departureTime = departureTime
        self.__arriveTime = arriveTime
    
    def gen_aircraft(self)-> Aircraft:
        model_aircrafts = ["FMS P-51D Mustang", "E-flite F-16 Thunderbirds", "HobbyZone Carbon Cub S2", "Freewing A-10 Thunderbolt II", "Dynam Spitfire Mk IX", "E-flite Extra 300 3D", "VolantexRC Trainstar Ascent", "Freewing F-22 Raptor", "Dancing Wings Piper J-3 Cub", "Skywalker X8"]
        
        num = random.randint(0,9)
        model = model_aircrafts[num]
        aircarft = Aircraft(f"aircarft_00${num}", model)

        return aircarft

# class Flight:
#     #  def __init__(self, id, schedule: FlightSchedule, aircarft: Aircraft):
#     def __init__(self, id):
#         self.__id = id
#         self.__schedule = self.gen_schedule()

#     def gen_schedule(self) -> FlightSchedule:
#         flightRoute = FlightRoute(f"route_${self.__id}", "BKK", "CNX", FlightRouteStatus.BOARDING)
#         schedule = FlightSchedule(f"schedule_${self.__id}", flightRoute, ["mon","tues","fri"], "15:00", "17:00")

#         return schedule
            

#     @property
#     def get_id(self):
#         return self.__id
    
#     @property
#     def get_schedule(self):
#         return self.__schedule

class Service:

    @classmethod
    def get_all_services():
        return [Food, Package, Insurance, Assistance]

class Food(Service):
    pass

class Package(Service):
    pass

class Insurance(Service):
    pass

class Assistance(Service):
    pass

class Passenger:
    def __init__(self, id):
        self.id =id
        self.first_name = "Chatnarint"
        self.last_name = "Boonsaeng"
        self.nationality = "Thailand"
        self.birthday = "26/10/2546"

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
    
class Airlinewa:
    def __init__(self):
        self.__user_list: list[User] = []
        self.__fight_route_list: list[FlightRoute] = []
        self.__booking_list: list[Booking] = []

    def set_user(self, list_user: list[User]):
        self.__user_list = list_user

    def set_flight(self, list_flight_route: list[FlightRoute]):
        self.__fight_route_list = list_flight_route

    # ============================ API ============================ #
    def api_checkout(self, flight_route_id):
        flight = self.get_flight_instance(flight_route_id)

        if flight == None:
            return None

        return [flight.get_id, flight.get_price, flight.get_origin, flight.get_destination, Service.get_all_services]
    
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
            
    def get_user(self, user_id) -> User:
        for user in self.__user_list:
            if user.get_id == user_id:
                return user

    def get_flight_instance(self, flight_instance_id) -> FlightRoute:
        for flight in self.__fight_route_list:
            if flight.get_id == flight_instance_id:
                return flight

    def create_booking(self, user_instance: User, flight_route: FlightRoute, list_pssenger: list[Passenger], list_service: list[Service] | None) -> Booking:
        booking_instance = Booking("booking_test_001", user_instance, flight_route, list_pssenger, list_service)
        self.__booking_list.append(booking_instance)
        return booking_instance

    def create_passenger(self, passenger_data) -> list[Passenger]:
        return [Passenger("passenger_001")]

def gen_users():
    gen_name = ["Teerapat", "Kawin", "Araya", "Phumipat", "Nannaphat", "Wit", "Supitcha", "Rawiphat", "Chayanan", "Peeraphat"]
    gen_phone_numbers = ["089-123-4567", "082-987-6543", "095-555-7890", "081-246-1357", "090-333-1122", "087-654-3210", "098-777-8888", "084-111-2223", "091-369-2587", "086-543-2109"]
    gen_emails = ["alex.johnson@example.com", "sophia.miller@example.com", "david.lee@example.com", "emma.wilson@example.com", "michael.brown@example.com", "olivia.smith@example.com", "william.taylor@example.com", "ava.jones@example.com", "james.garcia@example.com", "mia.martinez@example.com"]
    gen_passwords = ["Xy9@pLq3!", "aB#12$4xYz", "P@ssW0rd789", "Qz8!Mn@56", "5tG#lPqX!", "Rf2@Yx7LpQ", "Za1!QxYtP3", "KpX#98@LmT", "Tq7@ZxLpX2", "WmX!PqL@Y5"]

    gen_user = []

    for index in range(10):
        # gen_id = f"a752e161-d6a2-4e5b-8c55-1dc59b7f123{index}"
        gen_id = uuid.uuid4()
        gen_account = Account().register(gen_emails[index], gen_passwords[index])
        user = User(gen_id, gen_name[index], gen_phone_numbers[index], gen_account)
        gen_user.append(user)

    return gen_user

def initialize() -> Airlinewa:
    airline = Airlinewa()
    
    airline.set_user(gen_users())
    airline.set_flight([FlightRoute(f"flight_00{i}", "BKK", "CNX", "OK") for i in range(9)])

    return airline

airline = initialize()

@app.get("/")
def read_root():
    return {"Hello World!": "This is root path FastAPI"}

class APICheckout(BaseModel):
    id: str

@app.post("/api_checkout")
async def api_checkout(model: APICheckout):
    res = airline.api_checkout(model.id)

    return {"res": res}

class GetPaymentIdentity(BaseModel):
    type: str
    number: str
    out_date: str

class GetPaymentContact(BaseModel):
    prefix: str
    name: str
    lastname: str
    email: str
    countryCode: str
    phoneNumber: str

class GetPayment(BaseModel):
    name: str
    lastname: str
    gender: str
    country: str
    birthday: str
    identityType: GetPaymentIdentity
    contact: GetPaymentContact

@app.post("/api_payment")
def get_payment(model: GetPayment):
    print(model)
    # res = airline.api_booking(airline.get_test_user.get_id, "flight_001", [])
    # return {"price": res, "type": "dollar", "q":q}
    return {"res": "OK", "data": model}

# def main():
#     airline = initialize()

#     # Test
#     res = airline.api_booking(airline.get_test_user.get_id, "flight_001", [])
#     print("Api Booking response: ", res, "dollar")
#     print("Get Test Booking Detail....")

#     for i in airline.get_booking_list:
#         i.get_booking_details

# if __name__ == "__main__":
#     main()