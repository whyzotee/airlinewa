from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .air import Seat
    from .passenger import Passenger
    from .flight import FlightRoute
    from .user import User, Contact
    from .service import Service
    from .payment import Payment

class Ticket:
    def __init__(self, id: str, passenger: "Passenger", seat: "Seat", isback=False):
        self.__ticket_id = id
        self.__passenger = passenger
        self.__seat = seat
        self.__isback = isback

    @property
    def id(self):
        return self.__ticket_id

    @property
    def passenger(self):
        return self.__passenger
    
    @property
    def seat(self):
        return self.__seat
    
    @property
    def isback(self):
        return self.__isback

class Booking:
    # def __init__(self, id, user:User, flight_instance: Flight, ticket, payment, passenger:list[Passenger],service):
    def __init__(
        self,
        id: str,
        user: "User",
        flight_route: "FlightRoute",
        payment: "Payment",
        passenger: list["Passenger"],
        services: list["Service"] | None,
        contact: "Contact",
        seats: list["Seat"]
    ):
        self.__id = id
        self.__user = user
        self.__flight_route = flight_route
        self.__flight_route_back = None
        self.__ticket: list[Ticket] = []
        self.__payment = payment
        self.__passengers = passenger
        self.__services = services
        self.__contact = contact
        self.__seats = seats
        self.__seats_back = None

    @property
    def id(self):
        return self.__id
    
    @property
    def user(self):
        return self.__user
    
    @property
    def flight_route(self):
        return self.__flight_route
    
    @property
    def flight_route_back(self):
        return self.__flight_route_back
    
    @property
    def payment(self):
        return self.__payment

    @property
    def passengers(self) -> list["Passenger"]:
        return self.__passengers

    @property
    def service(self) -> list["Service"] | None:
        return self.__services
    
    @property
    def contact(self) -> "Contact":
        return self.__contact

    @property
    def seats(self) -> list["Seat"]:
        return self.__seats
    
    @property
    def price(self):
        seat_sum = sum([seat.price for seat in self.__seats])
        sum_price = self.__flight_route.price + seat_sum
        tax = self.__flight_route.tax
        back_sum = 0

        if self.__seats_back != None:
            back_sum += sum([seat.price for seat in self.__seats_back])

        if self.__flight_route_back != None:
            back_sum += self.__flight_route_back.price
            tax += self.__flight_route_back.tax

        return [sum_price + back_sum, tax]
    
    @property
    def ticket(self) -> list["Ticket"]:
        return self.__ticket
    
    def create_ticket(self):
        for index in range(len(self.__passengers)):
            ticket = Ticket(f"TICKET_{self.__seats[index].id}", self.__passengers[index], self.__seats[index])
            self.__ticket.append(ticket)
        
        if(self.__seats_back != None):
            for index in range(len(self.__passengers)):
                ticket = Ticket(f"TICKET_{self.__seats_back[index].id}", self.__passengers[index], self.__seats_back[index], True)
                self.__ticket.append(ticket)

    def set_flight_back_route(self, flight_route: "FlightRoute"):
        self.__flight_route_back = flight_route

    def set_flight_back_seats(self, seats: list["Seat"]):
        self.__seats_back = seats

    def booking_details(self):
        print("========== Booking detail ==============")
        print("ID: ", self.__id)
        print("User: ", self.__user)
        print("Flight: ", self.__flight_route)
        print("Passenger: ", self.__passengers)
        print("Service: ", self.__services)
        print("Contact: ", self.__contact)