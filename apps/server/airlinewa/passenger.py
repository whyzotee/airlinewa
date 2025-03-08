from datetime import datetime

class GENDER:
    MALE = "MALE"
    FEMALE = "FEMALE"

class IDENTITY_TYPE:
    CARD = "IDENTITY_CARD"
    PASSPORT = "PASSPORT"

class Passenger:
    def __init__(self, gender: str, name:str, lastname: str, birthday: datetime, identity_type: str, identity_number: str, identity_out_date: datetime = None):
        self.gender = GENDER.MALE
        self.first_name = "Chatnarint"
        self.last_name = "Boonsaeng"
        self.birthday = datetime(2546, 10, 26)
        self.identity_number = "1581878512"
        self.identity_out_date = datetime(2570, 10, 26)
        self.identity_type = IDENTITY_TYPE.CARD