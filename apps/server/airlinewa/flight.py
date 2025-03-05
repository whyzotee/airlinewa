from datetime import datetime
from .air import Airport

class FlightSchedule:
    def __init__(self, id, dayOfWeek, departureTime, arriveTime, duration):
        self.__id = id
        self.__dayOfWeek = dayOfWeek
        self.__departureTime = departureTime
        self.__arriveTime = arriveTime
        self.__duration = duration

    @property
    def get_info(self):
        return {
            "id":self.__id,
            "dayOfWeek": self.__dayOfWeek,
            "departure": self.__departureTime,
            "arrive": self.__arriveTime,
            "duration":  self.__duration
        }
    
    def get_departure(self):
        return self.__departureTime
    
    def get_arrival(self):
        return self.__arriveTime
    # def gen_aircraft(self)-> Aircraft:
    #     model_aircrafts = ["FMS P-51D Mustang", "E-flite F-16 Thunderbirds", "HobbyZone Carbon Cub S2", "Freewing A-10 Thunderbolt II", "Dynam Spitfire Mk IX", "E-flite Extra 300 3D", "VolantexRC Trainstar Ascent", "Freewing F-22 Raptor", "Dancing Wings Piper J-3 Cub", "Skywalker X8"]
        
    #     num = random.randint(0,9)
    #     model = model_aircrafts[num]
    #     aircarft = Aircraft(f"aircarft_00${num}", model)

    #     return aircarft
    
class FlightRoute:
    def __init__(self, id, origin: Airport, destination:Airport, status, flight_schedule:FlightSchedule, base_price, date):
        self.__id = id
        self.__schedule = flight_schedule
        self.__origin = origin
        self.__destination = destination
        self.__status = status
        self.__base_price = base_price
        self.__date = date
    
    @property
    def get_id(self) -> str:
        return self.__id
    
    @property
    def get_schedule(self):
        return self.__schedule

    @property
    def get_origin(self):
        return self.__origin.get_info
    
    @property
    def get_destination(self):
        return self.__destination.get_info
    
    @property
    def get_status(self):
        return self.__status

    @property
    def get_price(self):
        return self.__base_price

    @property
    def get_tax(self):
        return round(self.__base_price * 0.15, 2)
    
    @property
    def get_date(self) -> datetime:
        return self.__date