from airlinewa.models import CancelModel, CheckoutModel, PaymentGateway, PaymentModel
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/payment", tags=["payment"])


@router.post("/")
def payments(model: PaymentModel):
    try:
        booking, payment = airline.booking_flight_route(
            model.user_id, model.flight_route_id, model.passengers, model.contact, model.seat_class
        )

    except Exception as err:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TRY_AGAIN")

    # if not airline.is_flight_route(flight_route) or flight_route == None:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_FOUND"
    #     )

    return {
        "id": booking.flight_route.id,
        "booking_id": booking.id,
        "info": {
            "origin": booking.flight_route.origin,
            "destination": booking.flight_route.destination,
            "schedule": booking.flight_route.schedule.info,
            "date": booking.flight_route.date,
        },
        "price": [booking.flight_route.price, booking.flight_route.tax],
        "payment_id": payment.id,
    }


@router.post("/checkout")
async def checkout(model: CheckoutModel):
    flight = airline.find_flight(model.id)
    user = airline.find_user(model.uid)
    
    if user == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="USER_NOT_FOUND"
        )
    
    # for booking in user.booking:
    #     if booking.payment.is_pending_payment:

    if flight == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_FOUND"
        )

    services = airline.services

    return {
        "id": flight.route.id,
        "info": {
            "origin": flight.route.origin,
            "destination": flight.route.destination,
            "schedule": flight.route.schedule.info,
            "date": flight.route.date,
        },
        "price": [flight.route.price, flight.route.tax],
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
    gateway = airline.call_gateway(model.payment_id, model.user_id, model.type, model.number, model.out_date, model.cvv, model.holder_name)

    if isinstance(gateway, str):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=gateway)

    return { "booking_id": gateway.id }

@router.get("/success")
def payment_success(booking_id: str):
    booking = airline.find_booking(booking_id)

    if booking == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="NO_BOOKING_FOUND")
    
    return {
        "payment_id": booking.payment.id,
        "email": booking.contact.email
    }