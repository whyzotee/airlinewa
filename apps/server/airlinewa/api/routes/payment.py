from airlinewa.models import CheckoutModel, PaymentGateway, PaymentModel
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/payment", tags=["payment"])


class BookingPaymentResponse(BaseModel):
    payment_id: str
    email: str


@router.post("/")
def payments(model: PaymentModel):
    try:
        booking, payment = airline.booking_flight_route(
            model.user_id,
            model.flight_route_id,
            model.passengers,
            model.contact,
            model.seat_class,
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
    flight_route = airline.get_flight_route(model.id)
    user = airline.find_user(model.uid)

    if user == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="USER_NOT_FOUND"
        )

    # for booking in user.booking:
    #     if booking.payment.is_pending_payment:

    if flight_route == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_ROUTE_ID_FOUND"
        )

    services = airline.services

    return {
        "id": flight_route.id,
        "info": {
            "origin": flight_route.origin,
            "destination": flight_route.destination,
            "schedule": flight_route.schedule.info,
            "date": flight_route.date,
        },
        "price": [flight_route.price, flight_route.tax],
        "services": services,
    }


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
