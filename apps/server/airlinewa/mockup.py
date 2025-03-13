import random
from datetime import datetime, time, timedelta

from .air import *
from .flight import Flight, FlightRoute, FlightSchedule
from .user import Account, User

# from .mock import *
today = datetime.today()


class MockUp:

    @staticmethod
    def gen_users() -> list[User]:
        gen_id = [
            "ca47592b-9bff-4336-8adf-ed8411d4a2a0",
            "02a93808-d0ce-4a70-8fe2-552472401547",
            "3b2d75e3-028f-4480-80ee-af0132d8b884",
            "ba786bd4-20ac-4446-9a8d-8df1ad1e74f1",
            "2c6e36ba-14b5-4f43-b33e-c21842810fbe",
            "dff42e64-c16e-4607-b91b-77d5e4d5e121",
            "a7c51caf-bdce-4602-b819-3d9c88d43f56",
            "38377cc5-c96f-448a-94ee-37cbc18a8f1a",
            "79c69bca-2a9f-4a0f-a373-0f301a12a4d0",
            "92711594-2719-4947-8417-54f996b4dd3c",
            "be46fe6f-a105-420f-aabe-c30bcf2644cd",
        ]

        gen_name = [
            "whyzotee",
            "Teerapat",
            "Kawin",
            "Araya",
            "Phumipat",
            "Nannaphat",
            "Wit",
            "Supitcha",
            "Rawiphat",
            "Chayanan",
            "Peeraphat",
        ]

        gen_phone_numbers = [
            "000-000-0000",
            "089-123-4567",
            "082-987-6543",
            "095-555-7890",
            "081-246-1357",
            "090-333-1122",
            "087-654-3210",
            "098-777-8888",
            "084-111-2223",
            "091-369-2587",
            "086-543-2109",
        ]

        gen_emails = [
            "t@1.dev",
            "alex.johnson@example.com",
            "sophia.miller@example.com",
            "david.lee@example.com",
            "emma.wilson@example.com",
            "michael.brown@example.com",
            "olivia.smith@example.com",
            "william.taylor@example.com",
            "ava.jones@example.com",
            "james.garcia@example.com",
            "mia.martinez@example.com",
        ]

        gen_passwords = [
            "t",
            "Xy9@pLq3!",
            "aB#12$4xYz",
            "P@ssW0rd789",
            "Qz8!Mn@56",
            "5tG#lPqX!",
            "Rf2@Yx7LpQ",
            "Za1!QxYtP3",
            "KpX#98@LmT",
            "Tq7@ZxLpX2",
            "WmX!PqL@Y5",
        ]

        gen_user = []

        for index in range(10):
            # gen_account = Account().register(gen_emails[index], gen_passwords[index])
            gen_account = Account(gen_emails[index], gen_passwords[index])
            user = User(
                gen_id[index], gen_name[index], gen_phone_numbers[index], gen_account
            )

            gen_user.append(user)

        return gen_user

    @staticmethod
    def gen_aircraft():
        aircraft_models = [
            "Boeing 737",
            "Boeing 747",
            "Boeing 787",
            "Airbus A320",
            "Airbus A380",
            "Embraer E190",
            "Bombardier CRJ900",
            "McDonnell Douglas MD-80",
        ]

        aircraft_list = [
            Aircraft(f"AIRCRAFT_{i:03d}", aircraft_models[i])
            for i in range(len(aircraft_models))
        ]

        return aircraft_list

    @staticmethod
    def gen_airport() -> list[Airport]:
        list_airport_name = [
            "Bangkok (BKK)",
            "Bangkok (DMK)",
            "Chiang Mai",
            "Phuket",
            "Krabi",
            "Surat Thani",
            "Hat Yai",
            "Ubon Ratchathani",
            "Udon Thani",
            "Khon Kaen",
            "Chiang Rai",
            "Buri Ram",
            "Loei",
            "Pattaya",
            "Trang",
            "Nakhon Si Thammarat",
            "Roi Et",
            "Sakon Nakhon",
            "Nakhon Phanom",
            "Mae Hong Son",
        ]

        list_airport_addr = [
            "Suvarnabhumi Airport",
            "Don Mueang International Airport",
            "Chiang Mai International Airport",
            "Phuket International Airport",
            "Krabi International Airport",
            "Surat Thani International Airport",
            "Hat Yai International Airport",
            "Ubon Ratchathani Airport",
            "Udon Thani International Airport",
            "Khon Kaen Airport",
            "Mae Fah Luang - Chiang Rai International Airport",
            "Buri Ram Airport",
            "Loei Airport",
            "U-Tapao Rayong-Pattaya International Airport",
            "Trang Airport",
            "Nakhon Si Thammarat Airport",
            "Roi Et Airport",
            "Sakon Nakhon Airport",
            "Nakhon Phanom Airport",
            "Mae Hong Son Airport",
        ]

        list_airport_code = [
            "BKK",
            "DMK",
            "CNX",
            "HKT",
            "KBV",
            "URT",
            "HDY",
            "UBP",
            "UTH",
            "KKC",
            "CEI",
            "BFV",
            "LOE",
            "UTP",
            "TST",
            "NST",
            "ROI",
            "SNO",
            "KOP",
            "HGN",
        ]

        gen_list: list[Airport] = [
            Airport(list_airport_name[i], list_airport_addr[i], list_airport_code[i])
            for i in range(20)
        ]

        return gen_list

    @staticmethod
    def gen_flight_route_go(id, airport_a, airport_b, schedule, date):
        status = FlightRoute.STATUS_AVALIABLE
        price = random.randint(1000, 3000)
        gen_flight = FlightRoute(
            f"AW {id:05d}", airport_a, airport_b, status, schedule, price, date
        )

        return gen_flight

    @staticmethod
    def gen_flight_route_back(id, airport_a, airport_b, schedule, date):
        status = FlightRoute.STATUS_AVALIABLE
        price = random.randint(1000, 3000)

        gen_flight = FlightRoute(
            f"AW {id:05d}", airport_b, airport_a, status, schedule, price, date
        )

        return gen_flight

    @staticmethod
    def gen_flight_schedule():
        schedule_id = f"SCHE_{random.randint(100, 999)}"
        day_of_week = random.sample([0, 1, 2, 3, 4, 5, 6], 3)

        departure_min = random.randint(0, 1439)
        duration = random.randint(30, 180)
        arrive_min = departure_min + duration

        departure_hour, departure_minute = divmod(departure_min, 60)
        arrive_hour, arrive_minute = divmod(arrive_min, 60)

        arrive_hour %= 24

        departure = f"{departure_hour:02d}:{departure_minute:02d}"
        arrive = f"{arrive_hour:02d}:{arrive_minute:02d}"

        gate_letter = random.choice(['A', 'B', 'C'])
        gate_number = random.randint(1, 50)
        gate = f"{gate_letter}{gate_number}"

        return FlightSchedule(schedule_id, day_of_week, departure, arrive, duration, gate)

    @staticmethod
    def gen_flight(airport_list: list[Airport], aircraft_list: list[Aircraft]):
        gen_flights: list[Flight] = []

        id = 1

        for l in range(-1, 30):
            for i in range(len(airport_list)):
                for j in range(i + 1, len(airport_list)):
                    random_date = today + timedelta(days=l)

                    for _ in range(5):
                        schedule_go = MockUp.gen_flight_schedule()
                        flight_go = MockUp.gen_flight_route_go(
                            id,
                            airport_list[i],
                            airport_list[j],
                            schedule_go,
                            random_date,
                        )
                        gen_flights.append(
                            Flight(flight_go, random.choice(aircraft_list))
                        )
                        id += 1

                        schedule_back = MockUp.gen_flight_schedule()
                        flight_back = MockUp.gen_flight_route_back(
                            id,
                            airport_list[i],
                            airport_list[j],
                            schedule_back,
                            random_date,
                        )
                        gen_flights.append(
                            Flight(flight_back, random.choice(aircraft_list))
                        )
                        id += 1

        return gen_flights
