class Account:
    def __init__(self):
        self.__email = None
        self.__password = None

    def login(self, email, password):
        return self.__email == email and self.__password == password
    
    def register(self, email, password):
        self.__email = email
        self.__password = password

        return self

class User:
    def __init__(self, id, name, phone, accout:Account):
        self.__id = id
        self.__name = name
        self.__phone_num = phone
        self.__account = accout

    @property
    def get_id(self):
        return self.__id
    
    @property
    def get_name(self):
        return self.__name

    @property
    def get_phone_number(self):
        return self.__phone_num

    @property
    def get_accout(self) -> Account:
        return self.__account

class Contact:
    def __init__(self, title, name, lastname, email, country_code, phone_number):
        self.__title = title
        self.__name = name
        self.__lastname = lastname
        self.__email = email
        self.__country_code = country_code
        self.__phone_nubmer = phone_number