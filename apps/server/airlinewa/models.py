# import uuid

from datetime import datetime

from pydantic import BaseModel

# from sqlmodel import Field, Relationship, SQLModel


class Airport(BaseModel):
    name: str
    address: str
    code: str


class FlightRoutSchedule(BaseModel):
    departure: str
    arrival: str


class FlightRoute(BaseModel):
    id: str
    origin: list[str]
    destination: list[str]
    schedule: FlightRoutSchedule
    date: datetime
    price: int


class CheckoutModel(BaseModel):
    id: str


class PaymentIdentity(BaseModel):
    type: str
    number: str
    out_date: str


class PaymentContact(BaseModel):
    prefix: str
    name: str
    lastname: str
    email: str
    country_code: str
    phone_number: str


class Passenger(BaseModel):
    name: str
    lastname: str
    gender: str
    country: str
    birthday: str
    identity_type: PaymentIdentity


class PaymentModel(BaseModel):
    user_id: str
    flight_route_id: str
    passengers: list[Passenger]
    contact: PaymentContact


class LoginModel(BaseModel):
    username: str
    password: str
