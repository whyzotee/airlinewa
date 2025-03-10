from .air import *
from .user import *
from .flight import *
from .service import *
from .payment import *
from .booking import *
from .payment import *
from .passenger import  *

from .mockup import MockUp
from .models import PassengerModel, PaymentContact

class Airlinewa:
    def __init__(self):
        self.__fight_list: list[Flight] = []
        self.__booking_list: list[Booking] = []
        self.__payment_list: list[Payment]  = []
        self.__fight_route_list: list[FlightRoute] = []
        self.__user_list: list[User] = MockUp.gen_users()
        self.__airport_list: list[Airport] = MockUp.gen_airport()
        self.__aircraft_list: list[Aircraft] = MockUp.gen_aircraft()

    def set_flight(self, list_flight: list[Flight]):
        self.__fight_list = list_flight

    def set_flight_route(self, list_flight_route: list[FlightRoute]):
        self.__fight_route_list = list_flight_route

    # ============================ Medthod ============================ #

    # Function Section
    def get_flight(self, flight_id) -> Flight | None:
        for flight in self.__fight_list:
            if flight.flight_route.id == flight_id:
                return flight
        
    def get_flight_route(self, flight_route_id) -> FlightRoute | None:
        for flight_route in self.__fight_route_list:
            if flight_route.id == flight_route_id:
                return flight_route

    def booking_flight_route(
        self,
        user_id,
        flight_route_id: str,
        passengers_raw,
        contact_raw,
    ) -> tuple[Booking, Payment]:
        user = self.find_user(user_id)
        
        if not user or not passengers_raw:
            raise Exception("USER_NOT_FOUND")

        flight = self.get_flight(flight_route_id)
        if flight == None:
            raise Exception("FLIGHT_NOT_FOUND")

        seats = flight.aircraft.get_avaliable_seat()
        if len(seats) <= 0 or len(seats) < len(passengers_raw):
            raise Exception("NO_SEAT_LEFT")
        
        reserve_seat = flight.aircraft.reserve_seat(len(passengers_raw))
        # print(reserve_seat[0].id)
        # print(reserve_seat[0].price)
        # print(reserve_seat[0].status)
        
        payment = Payment(f"PAY_{flight_route_id.replace(" ","_")}_{reserve_seat[0].id}", PaymentStatus.PENDING_PAYMENT)
        passengers = self.create_passenger(passengers_raw)
        contact = self.create_contact(contact_raw)

        booking_id = f"BOOK_{user.id}_{payment.id}"
        booking = Booking(booking_id, user, flight.flight_route, payment, passengers, None, contact, reserve_seat)

        booking.booking_details()
        user.add_booking(booking)

        self.__payment_list.append(payment)
        self.__booking_list.append(booking)

        return booking, payment
   
    def call_gateway(self, payment_id, user_id, type, number, out_date, cvv, holder_name):
        if number == "2"*16:
            return PaymentStatus.CARD_DECLINED
        
        if number == "3"*16:
            return PaymentStatus.NO_ENOUGH_MONEY
        
        if number != "1"*16 and out_date != "11/11" and cvv != "111":
            return PaymentStatus.NO_CARD_FOUND  
        
        user = self.find_user(user_id)

        if user == None:
            print("User Not Found")
            return PaymentStatus.UNKNOWN

        for booking in user.booking:
            payment = booking.payment
            if payment.id == payment_id:
                if payment.status == PaymentStatus.ALREADY_PAY:
                    return PaymentStatus.ALREADY_PAY
                elif payment.status == PaymentStatus.PENDING_PAYMENT:
                    booking.create_ticket()
                    payment.update_status(PaymentStatus.COMPLETE)
                    return booking
                elif payment.status == PaymentStatus.TIMEOUT:
                    return PaymentStatus.TIMEOUT
                else:
                    return payment.status
                    
        return PaymentStatus.UNKNOWN

    def create_passenger(self, passenger_data: list[PassengerModel]) -> list[Passenger]:
        passenger_list: list[Passenger] = []
        for passenger in passenger_data:
            input_out_date = passenger.identity_type.out_date
            out_date = None

            if input_out_date != '':
                out_date = datetime.fromisoformat(input_out_date) if isinstance(input_out_date, str) else input_out_date

            passenger_list.append(
                Passenger(passenger.gender, 
                          passenger.name, 
                          passenger.lastname, 
                          datetime.fromisoformat(passenger.birthday), 
                          passenger.identity_type.type, 
                          passenger.identity_type.number,
                          out_date
                          ))

        return passenger_list
   
    def create_contact(self, data: PaymentContact) -> Contact:
        return Contact(data.prefix, data.name, data.lastname, data.email, data.country_code, data.phone_number)
    
    def find_booking(self, booking_id: str) -> Booking | None:
        for booking in self.__booking_list:
            if booking.id == booking_id:
                return booking
    # Property Section
    @property
    def services(self) -> list[Service]:
        return Service.get_services()

    @property
    def users(self) -> list[User]:
        return self.__user_list

    # @property
    # def get_booking_list(self) -> list[Booking]:
    #     return self.__booking_list

    def find_user(self, user_id) -> User | None:
        for user in self.__user_list:
            if user.id == user_id:
                return user

    @property
    def flight_list(self) -> list[Flight]:
        return self.__fight_list

    @property
    def flight_route_list(self) -> list[FlightRoute]:
        return self.__fight_route_list

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

        gen_flights, gen_flight_route = MockUp.gen_flight_and_flight_route(
            airline.airport_list, airline.aircraft_list
        )

        airline.set_flight(gen_flights)
        airline.set_flight_route(gen_flight_route)

        return airline

airline = Airlinewa.initialize()