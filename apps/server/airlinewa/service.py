class Service:
    @staticmethod
    def get_services():
        return [
            Food.services(),
            Package.services(),
            Insurance.services(),
            Assistance.services(),
        ]


class Food(Service):
    @staticmethod
    def services():
        return ["Mama", "Coke"]


class Package(Service):
    @staticmethod
    def services():
        return []


class Insurance(Service):
    @staticmethod
    def services():
        return []


class Assistance(Service):
    @staticmethod
    def services():
        return []
