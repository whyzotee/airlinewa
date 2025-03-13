import random
import string

from .air import *
from .booking import *
from .flight import *
from .mockup import MockUp
from .models import PassengerModel, PaymentContact
from .passenger import *
from .payment import *
from .service import *
from .user import *


class Airlinewa:
    def __init__(self):
        self.__fight_list: list[Flight] = []
        self.__booking_list: list[Booking] = []
        self.__user_list: list[User] = MockUp.gen_users()
        self.__airport_list: list[Airport] = MockUp.gen_airport()
        self.__aircraft_list: list[Aircraft] = MockUp.gen_aircraft()

    def set_flight(self, list_flight: list[Flight]):
        self.__fight_list = list_flight

    # ============================ Medthod ============================ #

    # Function Section
    def find_flight(self, flight_route_id) -> Flight | None:
        for flight in self.__fight_list:
            if flight.route.id == flight_route_id:
                return flight

    def find_booking(self, booking_id: str) -> Booking | None:
        for booking in self.__booking_list:
            if booking.id == booking_id:
                return booking

    def find_user(self, user_id) -> User | None:
        for user in self.__user_list:
            if user.id == user_id:
                return user

    def search_flight_route(
        self, origin, destination, date, seat_class, people_count
    ) -> tuple[list[FlightRoute], list[str], list[float|None]]:
        flight_route_list = []
        schedule_list = []
        price_list = []

        for flight in self.__fight_list:
            src = flight.route.origin[-1] == origin
            dest = flight.route.destination[-1] == destination
            if not src or not dest:
                continue

            flight_date = flight.route.date
            input_date = datetime.fromisoformat(date).timetuple().tm_yday
            depart_date = flight_date.timetuple().tm_yday == input_date

            day_of_week = flight.route.schedule.day_of_week
            input_day_of_week = datetime.fromisoformat(date).timetuple().tm_wday
            depart_day_of_week  = input_day_of_week in day_of_week

            if not depart_date or not depart_day_of_week:
                continue

            avaliable = flight.route.is_avaliable
            if not avaliable:
                continue

            seats = len(flight.aircraft.get_avaliable_seat(seat_class)) >= people_count

            if src and dest and depart_date and seats and avaliable:
                departure = flight.route.schedule.departure
                arrival = flight.route.schedule.arrival
                duration = flight.route.schedule.duration
                seat_price = flight.aircraft.get_seat_price(seat_class)

                flight_route_list.append(flight.route)
                schedule_list.append([departure, arrival, str(duration)])
                price_list.append(flight.route.price + seat_price)

        return flight_route_list, schedule_list, price_list

    def booking_flight_route(
        self, user_id, flight_route_id: str, passengers_raw, contact_raw, seat_type
    ) -> tuple[Booking, Payment]:
        user = self.find_user(user_id)

        if not user or not passengers_raw:
            raise Exception("USER_NOT_FOUND")

        flight = self.find_flight(flight_route_id)
        if flight == None:
            raise Exception("FLIGHT_NOT_FOUND")

        seats = flight.aircraft.get_avaliable_seat(seat_type)
        if len(seats) <= 0 or len(seats) < len(passengers_raw):
            raise Exception("NO_SEAT_LEFT")

        reserve_seat = flight.aircraft.reserve_seat(len(passengers_raw), seat_type)
        # print(reserve_seat[0].id)
        # print(reserve_seat[0].price)
        # print(reserve_seat[0].status)

        all_seats = str(seat_type).upper() + "".join(
            [seat.id.split("_")[-1] for seat in reserve_seat]
        )

        payment = Payment(
            f"PAY_{flight_route_id.replace(" ","_")}_{all_seats}",
            PaymentStatus.PENDING_PAYMENT,
        )

        passengers = self.create_passenger(passengers_raw)
        contact = self.create_contact(contact_raw)

        # booking_id = f"BOOK_{user.id}_{payment.id}"
        char_set = string.ascii_uppercase + string.digits
        booking_id = "".join(random.sample(char_set * 6, 6))

        booking = Booking(
            booking_id,
            user,
            flight.route,
            payment,
            passengers,
            None,
            contact,
            reserve_seat,
        )

        booking.booking_details()
        # print(f"Available seat in flight {booking.flight_route.id}", [f"{seat.id} : {seat.status}" for seat in flight.aircraft.seats])

        user.add_booking(booking)

        self.__booking_list.append(booking)

        return booking, payment

    def call_gateway(
        self, payment_id, user_id, type, number, out_date, cvv, holder_name
    ):
        if number == "2" * 16:
            return PaymentStatus.CARD_DECLINED

        if number == "3" * 16:
            return PaymentStatus.NO_ENOUGH_MONEY

        if number != "1" * 16 and out_date != "11/11" and cvv != "111":
            return PaymentStatus.NO_CARD_FOUND

        user = self.find_user(user_id)

        if user == None:
            print("User Not Found")
            return PaymentStatus.UNKNOWN

        for booking in user.bookings:
            payment = booking.payment
            if payment.id == payment_id:
                if payment.status == PaymentStatus.PENDING_PAYMENT:
                    booking.create_ticket()
                    booked_seat = self.booked_seat(
                        booking.flight_route.id, booking.seats
                    )
                    if not booked_seat:
                        return PaymentStatus.UNKNOWN_SEAT_ID

                    payment.update_status(PaymentStatus.COMPLETE)
                    return booking

                return payment.status

        return PaymentStatus.UNKNOWN

    def booked_seat(self, flight_route_id, seats):
        for flight in self.__fight_list:
            if flight.route.id == flight_route_id:
                return flight.aircraft.booked_seat(seats)

        return False

    def create_passenger(self, passenger_data: list[PassengerModel]) -> list[Passenger]:
        passenger_list: list[Passenger] = []

        for passenger in passenger_data:
            input_out_date = passenger.identity.out_date

            out_date = None

            if input_out_date != "":
                out_date = (
                    datetime.fromisoformat(input_out_date)
                    if isinstance(input_out_date, str)
                    else input_out_date
                )

            gender = passenger.gender
            name = passenger.name
            lastname = passenger.lastname
            date = datetime.fromisoformat(passenger.birthday)
            identity_type = passenger.identity.type
            identity_number = passenger.identity.number

            passenger_instance = Passenger(
                gender, name, lastname, date, identity_type, identity_number, out_date
            )

            passenger_list.append(passenger_instance)
            # print(passenger.gender, passenger.name, passenger.lastname, datetime.fromisoformat(passenger.birthday), passenger.identity.type, passenger.identity.number, out_date)
        return passenger_list

    def cancel_payment(self, flight_route_id, booking_id):
        flight = self.find_flight(flight_route_id)
        booking = self.find_booking(booking_id)

        if booking is None or flight is None:
            return "NO_BOOKING_OR_FLIGHT_ID"

        result = flight.aircraft.get_pending_payment_seat(booking.seats)

        if not result:
            return "CANNOT_CANCEL"

        self.__booking_list.remove(booking)

        return result

    def create_contact(self, data: PaymentContact) -> Contact:
        return Contact(
            data.prefix,
            data.name,
            data.lastname,
            data.email,
            data.country_code,
            data.phone_number,
        )

    def login(self, email: str, password: str) -> User | None:
        for user in self.__user_list:
            response = user.accout.login(email, password)

            if response:
                return user

        return None

    # Property Section
    @property
    def services(self) -> list[Service]:
        return Service.get_services()

    @property
    def aircraft_list(self) -> list[Aircraft]:
        return self.__aircraft_list

    @property
    def airport_list(self) -> list[Airport]:
        return self.__airport_list

    # ===================== Static Method ===================== #
    @staticmethod
    def initialize():
        airline = Airlinewa()

        gen_flights = MockUp.gen_flight(airline.airport_list, airline.aircraft_list)

        airline.set_flight(gen_flights)

        return airline


airline = Airlinewa.initialize()
