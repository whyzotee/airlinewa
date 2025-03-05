import uuid
import random

from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
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