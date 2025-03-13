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
    duration: int


class FlightRoute(BaseModel):
    id: str
    origin: list[str]
    destination: list[str]
    schedule: FlightRoutSchedule
    date: datetime
    price: float | None


class CheckoutModel(BaseModel):
    flight_id: str
    uid: str
    return_flight_id: str | None

class PaymentIdentity(BaseModel):
    type: str
    number: str
    out_date: str | None


class PaymentContact(BaseModel):
    prefix: str
    name: str
    lastname: str
    email: str
    country_code: str
    phone_number: str


class PassengerModel(BaseModel):
    name: str
    lastname: str
    gender: str
    country: str
    birthday: str
    identity: PaymentIdentity


class PaymentModel(BaseModel):
    user_id: str
    seat_class: str
    flight_route_id: str
    passengers: list[PassengerModel]
    contact: PaymentContact


class PaymentGateway(BaseModel):
    payment_id: str
    user_id: str
    type: str
    number: str
    out_date: str
    cvv: str
    holder_name: str
    
    
class CancelModel(BaseModel):
    flight_route_id: str
    booking_id: str

