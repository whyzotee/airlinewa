class Service:
    def get_all_services():
        return {
            "food": Food.get_service(),
            "package": Package.get_service(),
            "insurance": Insurance.get_service(),
            "assistance": Assistance.get_service()
        }
        # return [Food.get_service(), Package.get_service(), Insurance.get_service(), Assistance.get_service()]

class Food(Service):
    def get_service():
        return ["Mama", "Coke"]

class Package(Service):
    def get_service():
        return []

class Insurance(Service):
    def get_service():
        return []

class Assistance(Service):
    def get_service():
        return []