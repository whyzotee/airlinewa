from datetime import datetime

class PaymentType:
    CREDIT_DEBIT = "CREDIT_DEBIT"
    WALLET = "WALLET"

class Payment:
    @staticmethod
    def method():
        return [PaymentType.CREDIT_DEBIT, PaymentType.WALLET]

    def __init__(self, payment_id, type, payment_date: datetime, status):
        self.__payment_id = payment_id
        self.__type = type
        self.__payment_date = payment_date
        self.__status = status
    