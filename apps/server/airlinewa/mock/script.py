import csv

name = []
address = []
code = []

with open('airports.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile, quotechar='"', skipinitialspace=True)

    a = 0
    for row in reader:
        if row['name'] is None or row['municipality'] is None or row['iata_code'] is None:
            continue
        
        if row['name'] == '' or row['municipality'] == '' or row['iata_code'] == '':
            continue

        name.append(f'"{row["municipality"]}"')
        address.append(f'"{row["name"]}"')
        code.append(f'"{row["iata_code"]}"')

        a +=1

with open("mock_airport_name.py", "w", encoding="utf-8") as file:
    file.write(f"mock_airport_name = {name}")

with open("mock_airport_address.py", "w", encoding="utf-8") as file:
    file.write(f"mock_airport_address = {address}")

with open("mock_airport_code.py", "w", encoding="utf-8") as file:
    file.write(f"mock_airport_code = {code}")

print("Script has been written")