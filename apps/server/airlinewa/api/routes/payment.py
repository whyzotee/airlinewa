from airlinewa.models import CheckoutModel, PaymentGateway, PaymentModel
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from airlinewa import airline

router = APIRouter(prefix="/payment", tags=["payment"])


@router.post("/")
def payments(model: PaymentModel):
    try:
        flight_route, payment_transaction, payment_method = airline.booking_flight_route(
            model.user_id, model.flight_route_id, model.passengers, model.contact
        )

    except Exception as err:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TRY_AGAIN")

    if not airline.is_flight_route(flight_route) or flight_route == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="NO_FLIGHT_FOUND"
        )

    return {
        "id": flight_route.id,
        "info": {
            "origin": flight_route.origin,
            "destination": flight_route.destination,
            "schedule": flight_route.schedule.info,
            "date": flight_route.date,
        },
        "price": [flight_route.price, flight_route.tax],
        "payment_id": payment_transaction.id,
        "payment_method": payment_method,
    }


@router.post("/checkout")
async def checkout(model: CheckoutModel):
    flight_route = airline.get_flight_route(model.id)
    # flight_route = None

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
    gateway = airline.call_gateway(model.payment_id, model.type, model.number, model.out_date, model.cvv, model.holder_name)

    if gateway != "COMPLETE":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=gateway)

    return { 
        "res": model
    }