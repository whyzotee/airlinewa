import random
import uuid

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, status
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

class Passenger(BaseModel):
    name: str
    lastname: str
    gender: str
    country: str
    birthday: str
    identityType: GetPaymentIdentity

class GetPayment(BaseModel):
    user_id: str
    flight_route_id: str
    passengers: list[Passenger]
    contact: GetPaymentContact

class PaymentGateway(BaseModel):
    payment_id: str
    type: str
    payment_date: str

class LoginModel(BaseModel):
    username: str
    password: str

@app.get("/")
def read_root():
    return {"Hello World!": "This is root path FastAPI"}

@app.get(
    "/api/airport",
    name="Get airports",
    description="get all airports",
    status_code=status.HTTP_200_OK,
)
async def api_get_airport_list() -> list[Airport]:
    airports = airline.get_airport_list

    if len(airports) <= 0 or airports is None:
        return []

    return [
        Airport(
            code=airport.get_code, name=airport.get_name, address=airport.get_address
        )
        for airport in airports
    ]

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

    flight_route_list = []

    for flight_route in airline.get_flight_route_list:
        flight_origin = flight_route.get_origin
        flight_destination = flight_route.get_destination
        flight_date = flight_route.get_date

        if flight_origin[-1] == origin and flight_destination[-1] == destination and flight_route.is_avaliable:
            flight_route_list.append({
                "id": str(flight_route.get_id),
                "origin": flight_route.get_origin,
                "destination": flight_route.get_destination,
                "schedule": {
                    "departure": flight_route.get_schedule.get_departure(),
                    "arrival": flight_route.get_schedule.get_arrival()
                },
                "date": flight_date,
                "price": flight_route.get_price,
                # "status": flight_status
            })

    return flight_route_list

@app.post("/api/checkout")
async def api_checkout(model: APICheckout):
    flight_route = airline.get_flight_route(model.id)

    if flight_route == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_ROUTE_ID_FOUND")

    return {
        "id": flight_route.get_id,
        "info": {
            "origin": flight_route.get_origin,
            "destination": flight_route.get_destination,
            "schedule": flight_route.get_schedule.get_info,
            "date": flight_route.get_date,
        },
        "price": [flight_route.get_price, flight_route.get_tax],
        "service": airline.get_all_services,
        }

@app.post("/api/payment")
def get_payment(model: GetPayment):
    try:
        flight_route, payment_method = airline.booking_flight_route(
            model.user_id, 
            model.flight_route_id, 
            model.passengers, 
            model.contact)

    except Exception as err:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TRY_AGAIN")

    if not airline.is_flight_route(flight_route) or flight_route == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_FOUND")

    return { 
        "id": flight_route.get_id, 
        "info": {
            "origin": flight_route.get_origin,
            "destination": flight_route.get_destination,
            "schedule": flight_route.get_schedule.get_info,
            "date": flight_route.get_date,
        },
        "price": [flight_route.get_price, flight_route.get_tax],
        "payment_method": payment_method
    }

@app.post("/api/payment_gateway", status_code=status.HTTP_200_OK)
def payment_gateway(model: PaymentGateway):
    model
    # HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    
    return { 
        "id": flight_route.get_id, 
        "info": {
            "origin": flight_route.get_origin,
            "destination": flight_route.get_destination,
            "schedule": flight_route.get_schedule.get_info,
            "date": flight_route.get_date,
        },
        "price": [flight_route.get_price, flight_route.get_tax],
        "payment_method": payment_method
    }