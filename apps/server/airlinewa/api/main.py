from airlinewa.api.routes import airport, auth, booking, flight, payment, user, utils, ticket
from airlinewa.core.config import settings
from fastapi import APIRouter

api_router = APIRouter()

api_router.include_router(airport.router)
api_router.include_router(user.router)
api_router.include_router(auth.router)
api_router.include_router(flight.router)
api_router.include_router(booking.router)
api_router.include_router(payment.router)
api_router.include_router(utils.router)
api_router.include_router(ticket.router)


# if settings.ENVIRONMENT == "local":
#     api_router.include_router(private.router)
