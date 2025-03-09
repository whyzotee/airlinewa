import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/ticket")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="font-noto-thai">
      <div className="h-screen flex justify-center items-center">
        <div className="max-h-96 flex gap-2 bg-white shadow-2xl">
          <div className="flex flex-col">
            <div className="flex justify-between px-4 py-2 bg-orange-400 gap-4 rounded-tl-2xl">
              <AirplaneTicketIcon />
              <h1>Airlinewa</h1>
              <h1>BOADING PASS</h1>
            </div>

            <div className="flex h-full">
              <div className="bg-black w-12 m-4"></div>
              <div className="p-4 grid grid-cols-5 auto-cols-min gap-4">
                <div className="col-span-2">
                  <h1>Name of passenger:</h1>
                  <h1>Chatnarint Bonnsaeng</h1>
                </div>

                <h1>
                  Carrier: <br /> AW
                </h1>

                <h1>
                  Flight No. : <br />
                  AW 00123
                </h1>

                <h1>
                  Class : <br />B
                </h1>

                <span className="col-span-2">
                  From: Bangkok (BKK) <br /> To: Chaing Mai (CNX)
                </span>

                <h1>
                  Date: <br /> 3/9/2025
                </h1>

                <h1>
                  Luggage: <br />Y
                </h1>

                <h1>
                  Seat: <br />
                  A5
                </h1>

                <span className="text-center text-xl font-bold text-red-500">
                  Gate: <br />
                  H55
                </span>

                <span className="col-span-2 text-center text-xl font-bold text-red-500">
                  BOADING TIME: <br />
                  09:00
                </span>

                <span className="col-span-2 text-center">
                  ETICKET 123 4567890
                </span>
              </div>
            </div>

            <div className="h-4 bg-orange-400 rounded-bl-2xl"></div>
          </div>

          <div className="h-full flex flex-col gap-4">
            <div className="flex px-4 py-2 justify-center bg-orange-400 gap-4 rounded-tr-2xl">
              <h1>BOADING PASS</h1>
            </div>

            <div className="px-4">
              <div>
                <h1>Name of passenger:</h1>
                <h1>Chatnarint Bonnsaeng</h1>
              </div>

              <div>
                <h1>From: Bangkok (BKK)</h1>
                <h1>To: Chaing Mai (CNX)</h1>
              </div>

              <div className="h-full flex justify-between">
                <h1>
                  Seat: <br /> A5
                </h1>
                <h1>
                  Seat: <br /> 3/9/2025
                </h1>
              </div>

              <div className=" flex gap-4 justify-between text-xl font-bold">
                <div>
                  <h1>GATE:</h1>
                  <h1>H55</h1>
                </div>
                <div className="flex flex-col">
                  <h1>BOARDING TIME</h1>
                  <h1 className="self-center">09:00</h1>
                </div>
              </div>
            </div>

            <div className="h-4 bg-orange-400 rounded-br-2xl"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
