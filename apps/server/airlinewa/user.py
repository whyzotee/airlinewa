from typing import TYPE_CHECKING, Self

if TYPE_CHECKING:
    from .booking import Booking


class Account:
    def __init__(self, email: str, password: str):
        self.__email = email
        self.__password = password

    def login(self, email: str, password: str) -> bool:
        return self.__email == email and self.__password == password

    def register(self, email: str, password: str) -> Self:
        self.__email = email
        self.__password = password

        return self

    @property
    def email(self):
        return self.__email

    def change_email(self, email: str):
        self.__email = email

    def change_password(self, password: str):
        self.__password = password


class User:
    def __init__(self, id: str, name: str, phone: str, accout: Account):
        self.__id = id
        self.__name = name
        self.__phone_num = phone
        self.__account = accout
        self.__bookings: list[Booking] = []

    @property
    def id(self) -> str:
        return self.__id

    @property
    def name(self):
        return self.__name

    @property
    def phone_number(self):
        return self.__phone_num

    @property
    def accout(self) -> Account:
        return self.__account

    @property
    def bookings(self) -> list["Booking"]:
        return self.__bookings

    def add_booking(self, booking: "Booking"):
        self.__bookings.append(booking)


class Contact:
    def __init__(self, title, name, lastname, email, country_code, phone_number):
        self.__title = title
        self.__name = name
        self.__lastname = lastname
        self.__email = email
        self.__country_code = country_code
        self.__phone_number = phone_number

    @property
    def title(self):
        return self.__title

    @property
    def name(self):
        return self.__name

    @property
    def lastname(self):
        return self.__lastname

    @property
    def email(self):
        return self.__email

    @property
    def country_code(self):
        return self.__country_code

    @property
    def phone_number(self):
        return self.__phone_number
