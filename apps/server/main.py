import random
import uuid
from typing import Union

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class Passenger(BaseModel):
    name: str
    lastname: str
    gender: str
    country: str
    birthday: str
    identityType: GetPaymentIdentity

class GetPayment(BaseModel):
    flight_id: str
    passenger: Passenger
    contact: GetPaymentContact

class LoginModel(BaseModel):
    username: str
    password: str

@app.get("/")
def read_root():
    return {"Hello World!": "This is root path FastAPI"}


@app.post("/api/checkout")
async def api_checkout(model: APICheckout):
    flight = airline.get_flight_route(model.id)
    if flight == None:
        return {"error": "Can't find id"}

    return {
        "id": flight.get_id,
        "info": {
            "origin": flight.get_origin,
            "destination": flight.get_destination,
            "schedule": flight.get_schedule.get_info,
            "date": flight.get_date,
        },
        "price": [flight.get_price, flight.get_tax],
        "service": airline.get_all_services,
        }

@app.post("/api/payment")
def get_payment(model: GetPayment):
    print(model)
    # res = airline.

    return {"flight_details": "OK", "data": model}

@app.post("/api/auth/login")
def login(model: LoginModel):
    for user in airline.get_all_users:
        response = user.get_accout.login(model.username, model.password)
        if response:
            return {"id": user.get_id}
        else:
            break
        # return {"error": "Username or password wrong, please try again."}
    raise HTTPException(status_code=401, detail="CREDENTIAL_INVALID")

@app.get(
    "/api/airport",
    name="Get airports",
    description="get all airports",
    status_code=status.HTTP_200_OK,
)
async def api_get_airport_list() -> list[Airport]:
    airports = airline.get_airport_list()

    if len(airports) <= 0 or airports is None:
        return []

    return [
        Airport(
            code=airport.get_code, name=airport.get_name, address=airport.get_address
        )
        for airport in airports
    ]


@app.get("/api/test")
def get_test():
    return {"res": "test"}


@app.get("/api/flight")
def api_search_flight(origin: str, destination: str, date: str):

    if origin is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="ORIGIN_INVALID"
        )

    if destination is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="DESTINATION_INVALID"
        )

    if destination is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="DATE_INVALID"
        )

    src = origin.upper()
    dest = destination.upper()

    print(src, dest, date)

    flights = []

    for flight in airline.get_flight_route_list():
        flight_origin = flight.get_origin
        flight_destination = flight.get_destination
        flight_date = flight.get_date

        origin_upper = flight_origin[-1].upper()
        destination_upper = flight_destination[-1].upper()

        if origin_upper == src and destination_upper == dest and flight.is_avaliable:
            flights.append({
                "id": str(flight.get_id),
                "origin": flight.get_origin,
                "destination": flight.get_destination,
                "schedule": {
                    "departure": flight.get_schedule.get_departure(),
                    "arrival": flight.get_schedule.get_arrival()
                },
                "date": flight_date,
                "price": flight.get_price,
                # "status": flight_status
            })

    if flights:
        return flights

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_FOUND")
