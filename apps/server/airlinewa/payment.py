from time import time
from datetime import datetime

class PaymentType:
    CREDIT_DEBIT = "CREDIT_DEBIT"
    WALLET = "WALLET"

class PaymentStatus:
    PENDING_PAYMENT = "PENDING_PAYMENT"
    CARD_DECLINED = "CARD_DECLINED"
    NO_ENOUGH_MONEY = "NO_ENOUGH_MONEY"
    NO_CARD_FOUND = "NO_CARD_FOUND"
    COMPLETE = "COMPLETE"
    CANCEL = "CANCEL"
    TIMEOUT = "TIMEOUT"
    UNKNOWN = "UNKNOWN"
    ALREADY_PAY = "ALREADY_PAY"

class Payment:
    @staticmethod
    def method():
        return [PaymentType.CREDIT_DEBIT, PaymentType.WALLET]

    @staticmethod
    def create_payment(flight_route_id: str):
        pay = Payment(f"PAY_{flight_route_id.replace(" ","_")}", PaymentStatus.PENDING_PAYMENT)
        print("create_payment() instance!")
        return pay

    def __init__(self, payment_id, status, type=None, payment_date: datetime | None = None):
        self.__payment_id = payment_id
        self.__type = type
        self.__payment_date = payment_date
        self.__status = status
        self.__timeout = time()

    def update_type(self, type):
        self.__type = type

    def update_status(self, status):
        self.__status = status

    def update_pay_date(self, payment_date):
        self.__payment_date = payment_date
    
    @property
    def id(self):
        return self.__payment_id

    @property
    def type(self):
        return self.__type

    @property
    def pay_date(self):
        return self.__payment_date
    
    @property
    def status(self):
        if self.__status == PaymentStatus.COMPLETE:
            return PaymentStatus.ALREADY_PAY
        
        if time() - self.__timeout >= 30:
            self.__status = PaymentStatus.TIMEOUT
        return self.__status