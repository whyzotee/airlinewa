from airlinewa.models import CancelModel, CheckoutModel, PaymentGateway, PaymentModel
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/payment", tags=["payment"])


class BookingPaymentResponse(BaseModel):
    payment_id: str
    email: str


@router.post("/")
def payments(model: PaymentModel):
    result = airline.booking_flight_route(
            model.user_id,
            model.flight_route_id,
            model.passengers,
            model.contact,
            model.seat_class,
            model.flight_route_back_id
        )
    
    if isinstance(result, str):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result)

    booking, payment = result
    
    return {
        "id": booking.flight_route.id,
        "booking_id": booking.id,
        "info": {
            "origin": booking.flight_route.origin,
            "destination": booking.flight_route.destination,
            "schedule": booking.flight_route.schedule.info,
            "date": booking.flight_route.date,
        },
        "back_info": (
            {
                "id": booking.flight_route_back.id,
                "origin": booking.flight_route_back.origin,
                "destination": booking.flight_route_back.destination,
                "schedule": booking.flight_route_back.schedule.info,
                "date": booking.flight_route_back.date,
            } if booking.flight_route_back else None
        ),
        "price": booking.price,
        "payment_id": payment.id,
    }


@router.post("/checkout")
async def checkout(model: CheckoutModel):
    user = airline.find_user(model.uid)

    if user == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="USER_NOT_FOUND"
        )

    flight = airline.find_flight(model.flight_id)

    if flight == None :
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_FOUND"
        )

    services = airline.services
    seat_price = flight.aircraft.get_seat_price(model.seat_class)

    return_id = model.return_flight_id
    flight_back = airline.find_flight(return_id)

    if (return_id != None):
        if(flight_back == None):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_FOUND"
            )
        
        back_seat_price = flight_back.aircraft.get_seat_price(model.seat_class)
        flight_price = flight.route.price + flight_back.route.price
        sum_price = flight_price + seat_price + back_seat_price
        tax = flight.route.tax + flight_back.route.tax

        return {
                "id": flight.route.id,
                "info": {
                    "origin": flight.route.origin,
                    "destination": flight.route.destination,
                    "schedule": flight.route.schedule.info,
                    "date": flight.route.date,
                },
                "back_info": {
                    "id": flight_back.route.id,
                    "origin": flight_back.route.origin,
                    "destination": flight_back.route.destination,
                    "schedule": flight_back.route.schedule.info,
                    "date": flight_back.route.date,
                },
                "price": [sum_price, tax],
                "services": services,
            }

    return {
            "id": flight.route.id,
            "info": {
                "origin": flight.route.origin,
                "destination": flight.route.destination,
                "schedule": flight.route.schedule.info,
                "date": flight.route.date,
            },
            "price": [flight.route.price+seat_price, flight.route.tax],
            "services": services,
        }
   
    
    
 
    

@router.post("/cancel")
def payment_cancel(model: CancelModel):
    result = airline.cancel_payment(model.flight_route_id, model.booking_id)

    if isinstance(result, str):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result)

    return result

@router.post("/payment_gateway")
def payment_gateway(model: PaymentGateway):
    gateway = airline.call_gateway(
        model.payment_id,
        model.user_id,
        model.type,
        model.number,
        model.out_date,
        model.cvv,
        model.holder_name,
    )

    if isinstance(gateway, str):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=gateway)

    return {"booking_id": gateway.id}


@router.get("/success")
def payment_success(booking_id: str) -> BookingPaymentResponse:
    booking = airline.find_booking(booking_id)

    if booking == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="NO_BOOKING_FOUND"
        )

    # return {"payment_id": booking.payment.id, "email": booking.contact.email}
    return BookingPaymentResponse(
        payment_id=booking.payment.id, email=booking.contact.email
    )
