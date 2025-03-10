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
    UNKNOWN_SEAT_ID = "UNKNOWN_SEAT_ID"
    ALREADY_PAY = "ALREADY_PAY"

class Payment:
    @staticmethod
    def method():
        return [PaymentType.CREDIT_DEBIT, PaymentType.WALLET]

    # @staticmethod
    # def create_payment(payment_id: str):
    #     return Payment(payment_id, PaymentStatus.PENDING_PAYMENT)

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
    def is_pending_payment(self):
        return self.__status == PaymentStatus.PENDING_PAYMENT

    @property
    def status(self):
        if self.__status == PaymentStatus.COMPLETE:
            return PaymentStatus.ALREADY_PAY
        
        if time() - self.__timeout >= 300:
            self.__status = PaymentStatus.TIMEOUT
        return self.__status