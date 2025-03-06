import uuid
import random

from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware

# ============================ Initialize Backend ============================ #
from airlinewa import Airlinewa

airline = Airlinewa.initialize()
# ============================ Fast API Section ============================ #
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class Airport(BaseModel):
    name: str
    address: str
    code: str

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

@app.post("/api/checkout")
async def api_checkout(model: APICheckout):
    return airline.api_checkout(model.id)

@app.post("/api/payment")
def get_payment(model: GetPayment):
    # print(model)
    # res = airline.api_booking(airline.get_test_user.get_id, "flight_001", [])
    # return {"price": res, "type": "dollar", "q":q}
    return {"res": "OK", "data": model}

@app.post("/api/auth/login")
def login(model: LoginModel):
    return airline.api_login(model.username, model.password)

@app.get("/api/airport")
async def api_get_airport_list() -> list[Airport]:
    airport_list = airline.get_airport_list()

    if len(airport_list) <= 0:
        raise HTTPException(status_code=404, detail="no flight found")

    airports = []
    
    for airport in airport_list:
        # return_list.append(
        #         {
        #             "name": airport.get_name,
        #             "address": airport.get_address,
        #             "code": airport.get_code,
        #         }
        #     )
        airports.append(Airport(code=airport.get_code, name=airport.get_name, address=airport.get_address))

    return airports

@app.get("/api/test")
def get_test():
    return {"res": "test"}

@app.get("/api/flight")
def api_search_flight(src: str, dest: str, date: str):
    return airline.api_search_flight(src, dest, date)
