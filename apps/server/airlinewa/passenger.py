from datetime import datetime


class GENDER:
    MALE = "MALE"
    FEMALE = "FEMALE"


class IDENTITY_TYPE:
    CARD = "IDENTITY_CARD"
    PASSPORT = "PASSPORT"


class Passenger:
    def __init__(
        self,
        gender: str,
        name: str,
        lastname: str,
        birthday: datetime,
        identity_type: str,
        identity_number: str,
        identity_out_date: datetime | None = None,
    ):
        self.gender = gender
        self.first_name = name
        self.last_name = lastname
        self.birthday = birthday
        self.identity_type = identity_type
        self.identity_number = identity_number
        self.identity_out_date = identity_out_date

    