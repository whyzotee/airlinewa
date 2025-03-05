import uuid
import random
from datetime import datetime

from airlinewa import *

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