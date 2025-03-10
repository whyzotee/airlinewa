import random


class SeatStatus:
    AVALIABLE = "AVALIABLE"
    PENDING_PAYMENT = "PENDING_PAYMENT"
    CANCEL = "CANCEL"
    SOLD = "SOLD"


class Seat:
    def __init__(self, id, status, price):
        self.__id = id
        self.__status = status
        self.__price = price

    @property
    def id(self):
        return self.__id

    @property
    def price(self):
        return self.__price

    def __get_status(self):
        return self.__status

    def __set_status(self, status: SeatStatus):
        self.__status = status

    status = property(__get_status, __set_status)


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

    def gen_seat(self) -> list[Seat]:
        return [
            Seat(f"SEAT_00{index}", SeatStatus.AVALIABLE, "$59.49")
            for index in range(random.randint(100, 400))
        ]

    @property
    def id(self):
        return self.__id

    @property
    def model(self):
        return self.__model

    @property
    def seats(self):
        return self.__seats

    def get_avaliable_seat(self) -> list[Seat]:
        list_avaliable_seats: list[Seat] = []

        for seat in self.__seats:
            if seat.status == SeatStatus.AVALIABLE:
                list_avaliable_seats.append(seat)

        return list_avaliable_seats

    def reserve_seat(self, passenger_count) -> list[Seat]:
        seat_id: list[Seat] = []

        for seat in self.__seats:
            if len(seat_id) == passenger_count:
                break

            if seat.status == SeatStatus.AVALIABLE:
                seat.status = SeatStatus.PENDING_PAYMENT
                seat_id.append(seat)

        return seat_id
