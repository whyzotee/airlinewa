import random


class SeatStatus:
    AVALIABLE = "AVALIABLE"
    PENDING_PAYMENT = "PENDING_PAYMENT"
    BOOKED = "BOOKED"
    # CANCEL = "CANCEL"
    # SOLD = "SOLD"


class Seat:
    def __init__(self, id: str, status: str, price: float):
        self.__id = id
        self.__status = status
        self.__price = price

    @property
    def id(self):
        return self.__id

    @property
    def price(self):
        return self.__price

    @property
    def class_str(self) -> str:
        return "seat"

    def __get_status(self):
        return self.__status

    def __set_status(self, status: SeatStatus):
        self.__status = status

    status = property(__get_status, __set_status)


class EconomyClass(Seat):
    def __init__(self, id, status, price):
        super().__init__(id, status, price)

    @property
    def class_str(self):
        return "economy"


class PremuimEconomyClass(Seat):
    def __init__(self, id, status, price):
        super().__init__(id, status, price)

    @property
    def class_str(self):
        return "eco-premium"


class BusinessClass(Seat):
    def __init__(self, id, status, price):
        super().__init__(id, status, price)

    @property
    def class_str(self):
        return "business"


class FirstClass(Seat):
    def __init__(self, id, status, price):
        super().__init__(id, status, price)

    @property
    def class_str(self):
        return "first"


class Airport:
    def __init__(self, name, address, code):
        self.__name = name
        self.__address = address
        self.__code = code

    @property
    def info(self) -> list[str]:
        return [self.__name, self.__address, self.__code]

    @property
    def name(self):
        return self.__name

    @property
    def address(self):
        return self.__address

    @property
    def code(self):
        return self.__code


class Aircraft:
    def __init__(self, id, model):
        self.__id = id
        self.__model = model
        self.__seats = self.gen_seat()

    def gen_seat(
        self,
    ) -> list[FirstClass | BusinessClass | PremuimEconomyClass | EconomyClass]:
        eco = [
            EconomyClass(f"E_{index:03d}", SeatStatus.AVALIABLE, 505.10)
            for index in range(random.randint(200, 350))
        ]

        eco_premium = [
            PremuimEconomyClass(f"EP_{index:03d}", SeatStatus.AVALIABLE, 843.05)
            for index in range(random.randint(50, 150))
        ]

        business = [
            BusinessClass(f"B_{index:03d}", SeatStatus.AVALIABLE, 1870.43)
            for index in range(random.randint(30, 70))
        ]

        first = [
            FirstClass(f"F_{index:03d}", SeatStatus.AVALIABLE, 14877.52)
            for index in range(random.randint(10, 30))
        ]

        return eco + eco_premium + business + first

    @property
    def id(self):
        return self.__id

    @property
    def model(self):
        return self.__model

    @property
    def seats(self):
        return self.__seats

    def seats_class(self, seat_class) -> list[Seat]:
        eco_class = []
        eco_premium_class = []
        business_class = []
        first_class = []

        for seat in self.__seats:
            if isinstance(seat, PremuimEconomyClass):
                eco_premium_class.append(seat)
            elif isinstance(seat, BusinessClass):
                business_class.append(seat)
            elif isinstance(seat, FirstClass):
                first_class.append(seat)
            else:
                eco_class.append(seat)

        # "economy" | "business" | "eco-premium" | "first-class";

        if seat_class == "business":
            return eco_premium_class

        if seat_class == "eco-premium":
            return business_class

        if seat_class == "first-class":
            return first_class

        return eco_class

    def get_seat_price(self, seat_class) -> float:
        for seat in self.seats_class(seat_class):
            return seat.price

        return 0

    def get_avaliable_seat(self, seat_class) -> list[Seat]:
        list_avaliable_seats: list[Seat] = []

        for seat in self.seats_class(seat_class):
            if seat.status == SeatStatus.AVALIABLE:
                list_avaliable_seats.append(seat)

        return list_avaliable_seats

    def get_pending_payment_seat(self, seat_class) -> list[Seat]:
        list_pending_payment_seat: list[Seat] = []

        for seat in self.seats_class(seat_class):
            if seat.status == SeatStatus.PENDING_PAYMENT:
                list_pending_payment_seat.append(seat)

        return list_pending_payment_seat

    def reserve_seat(self, passenger_count, seat_class) -> list[Seat]:
        list_reserve_seat: list[Seat] = []

        for seat in self.seats_class(seat_class):
            if len(list_reserve_seat) == passenger_count:
                break

            if seat.status == SeatStatus.AVALIABLE:
                seat.status = SeatStatus.PENDING_PAYMENT
                list_reserve_seat.append(seat)

        return list_reserve_seat

    def booked_seat(self, seats: list[Seat]):
        booked_count = 0

        for seat in self.__seats:
            for book_seat in seats:
                if seat.id == book_seat.id:
                    seat.status = SeatStatus.BOOKED
                    booked_count += 1

        return booked_count == len(seats)

    def cancel_seat(self, seats: list[Seat]):
        cancel_count = 0

        for seat in self.__seats:
            for book_seat in seats:
                if seat.id == book_seat.id:
                    seat.status = SeatStatus.AVALIABLE
                    cancel_count += 1

        return cancel_count == len(seats)

    # def check_type_seat_class(self, seat_class):
    #     if seat_class == "economy":
    #         return EconomyClass

    #     if seat_class == "eco-premium":
    #         return PremuimEconomyClass

    #     if seat_class == "business":
    #         return BusinessClass

    #     if seat_class == "first-class":
    #         return FirstClass
