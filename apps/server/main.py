import uuid
import random
from datetime import datetime

class Account:
    def __init__(self):
        self.__email = None
        self.__password = None

    def login(self, email, password):
        return self.__email == email and self.__password == password
    
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
    def __init__(self, name, address, code):
        self.__name = name
        self.__address = address
        self.__code = code

    @property
    def get_info(self):
        return [self.__name, self.__address, self.__code]

    @property
    def get_name(self):
        return self.__name

    @property
    def get_address(self):
        return self.__address
    
    @property
    def get_code(self):
        return self.__code

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

class FlightSchedule:
    def __init__(self, id, dayOfWeek, departureTime, arriveTime, duration):
        self.__id = id
        self.__dayOfWeek = dayOfWeek
        self.__departureTime = departureTime
        self.__arriveTime = arriveTime
        self.__duration = duration

    @property
    def get_info(self):
        return {
            "id":self.__id,
            "dayOfWeek": self.__dayOfWeek,
            "departure": self.__departureTime,
            "arrive": self.__arriveTime,
            "duration":  self.__duration
        }
    
    # def gen_aircraft(self)-> Aircraft:
    #     model_aircrafts = ["FMS P-51D Mustang", "E-flite F-16 Thunderbirds", "HobbyZone Carbon Cub S2", "Freewing A-10 Thunderbolt II", "Dynam Spitfire Mk IX", "E-flite Extra 300 3D", "VolantexRC Trainstar Ascent", "Freewing F-22 Raptor", "Dancing Wings Piper J-3 Cub", "Skywalker X8"]
        
    #     num = random.randint(0,9)
    #     model = model_aircrafts[num]
    #     aircarft = Aircraft(f"aircarft_00${num}", model)

    #     return aircarft
    
class FlightRoute:
    def __init__(self, id, origin: Airport, destination:Airport, status, flight_schedule:FlightSchedule, base_price, date):
        self.__id = id
        self.__schedule = flight_schedule
        self.__origin = origin
        self.__destination = destination
        self.__status = status
        self.__base_price = base_price
        self.__date = date
    
    @property
    def get_id(self):
        return self.__id
    
    @property
    def get_schedule(self):
        return self.__schedule

    @property
    def get_origin(self):
        return self.__origin.get_info
    
    @property
    def get_destination(self):
        return self.__destination.get_info
    
    @property
    def get_status(self):
        return self.__status

    @property
    def get_price(self):
        return self.__base_price

    @property
    def get_tax(self):
        return round(self.__base_price * 0.15, 2)
    
    @property
    def get_date(self):
        return self.__date

class Service:
    def get_all_services():
        return {
            "food": Food.get_service(),
            "package": Package.get_service(),
            "insurance": Insurance.get_service(),
            "assistance": Assistance.get_service()
        }
        # return [Food.get_service(), Package.get_service(), Insurance.get_service(), Assistance.get_service()]

class Food(Service):
    def get_service():
        return ["Mama", "Coke"]

class Package(Service):
    def get_service():
        return []

class Insurance(Service):
    def get_service():
        return []

class Assistance(Service):
    def get_service():
        return []

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

# ============================ Initialize Backend ============================ #
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

def initialize() -> Airlinewa:
    airline = Airlinewa()
    
    airline.set_user(gen_users())
    airline.set_airport(gen_airport())

    bkk = Airport("Bangkok", "Suvarnabhumi Airport", "BKK")
    cnx = Airport("ChaingMai", "ChaingMai Airport", "CNX")

    sche_001 = FlightSchedule("sche_001", {1, 2, 3}, "18:00", "19:40", 100)

    airline.set_flight([FlightRoute(f"AW 010{i}", bkk, cnx, "OK", sche_001, 1500, datetime.today().isoformat()) for i in range(9)])

    return airline

airline = initialize()

# ============================ Fast API Section ============================ #
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

class APICheckout(BaseModel):
    id: str

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

class LoginModel(BaseModel):
    username: str
    password: str

@app.get("/")
def read_root():
    return {"Hello World!": "This is root path FastAPI"}

@app.post("/api_checkout")
async def api_checkout(model: APICheckout):
    return airline.api_checkout(model.id)

@app.post("/api_payment")
def get_payment(model: GetPayment):
    # print(model)
    # res = airline.api_booking(airline.get_test_user.get_id, "flight_001", [])
    # return {"price": res, "type": "dollar", "q":q}
    return {"res": "OK", "data": model}

@app.post("/api_login")
def login(model: LoginModel):
    return airline.api_login(model.username, model.password)

@app.get("/api_get_airport")
def get_airport():
    return airline.api_get_all_airport()