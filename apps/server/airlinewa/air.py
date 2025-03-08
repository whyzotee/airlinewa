import random

class SeatStatus:
    AVALIABLE = "avaliable"
    PENDING_PAYMENT ="PENDING_PAYMENT"
    CANCEL = "CANCEL"
    SOLD = "SOLD"

class Seat:
    def __init__(self, id, status, price):
        self.__id = id
        self.__status = status
        self.__price = price
    
    @property
    def get_id(self):
        return self.__id
    
    @property
    def get_price(self):
        return self.__price

    def get_status(self):
        return self.__status
    
    def set_status(self, status: SeatStatus):
        self.__status = status

    status = property(get_status, set_status)

class Airport:
    def __init__(self, name, address, code):
        self.__name = name
        self.__address = address
        self.__code = code

    @property
    def get_info(self) -> list[str]:
        return [self.__name, self.__address, self.__code]

    @property
    def get_name(self):
        return self.__name

    @property
    def get_address(self):
        return self.__address
    
    @property
    def get_code(self):
        return self.__code

class Aircraft:
    def __init__(self, id, model):
        self.__id = id
        self.__model = model
        self.__seats = self.gen_seat()

    def gen_seat(self) -> list[Seat]:
        return [Seat(f"seat_00{index}", SeatStatus.AVALIABLE, "$59.49") for index in range(random.randint(100, 400))]

    @property
    def get_id(self):
        return self.__id
    
    @property
    def get_model(self):
        return self.__model

    @property
    def get_seats(self):
        return self.__seats

    def get_avaliable_seat(self):
        list_avaliable_seats = []

        for seat in self.__seats:
            if seat.status == SeatStatus.AVALIABLE:
                list_avaliable_seats.append(seat)
        
        return list_avaliable_seats
    
    def reserve_seat(self, passenger_count):
        seat_id = []

        for seat in self.__seats:
            if len(seat_id) == passenger_count:
                break

            if seat.status == SeatStatus.AVALIABLE:
                seat.status = SeatStatus.PENDING_PAYMENT
                seat_id.append(seat)
        
        return seat_id