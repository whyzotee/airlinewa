import { ticketTicketOptions } from "@/client/@tanstack/react-query.gen";
import { TITLE_PATH } from "@/utils";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { Button } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import dayjs from "dayjs";
import Barcode from "react-barcode";

export const Route = createFileRoute("/app/ticket")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      booking_id: search.booking_id,
    };
  },
  loader: async ({ context, location }) => {
    const { booking_id } = location.search as { booking_id: string };
    try {
      await context.queryClient.ensureQueryData(
        ticketTicketOptions({
          query: {
            booking_id,
          },
        })
      );
    } catch (err) {
      console.error(err);
      throw notFound();
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <p>Ticket not found</p>,
});

function RouteComponent() {
  const { booking_id } = Route.useSearch();

  const tickettQuery = useSuspenseQuery(
    ticketTicketOptions({
      query: {
        booking_id: String(booking_id),
      },
    })
  );

  const data = tickettQuery.data;
  const flight = data.flight;
  const flight_back = data.flight_back;

  return (
    <main className="font-noto-thai flex flex-col items-center gap-8">
      <h1 className="text-2xl">Demo ตั๋วเครื่องบินที่ส่งไปยังอีเมล</h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        {data.tickets.map((ticket) => {
          return (
            <div className="max-h-96 w-full text-xs sm:text-sm lg:text-base  flex gap-2 bg-white shadow-2xl">
              <div className="w-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 bg-orange-400 gap-4 rounded-tl-2xl">
                  <AirplaneTicketIcon className="text-white" />
                  <img
                    src={TITLE_PATH}
                    alt="title"
                    className="rounded-sm bg-white h-6"
                  />
                  <h1 className="text-white font-bold">BOADING PASS</h1>
                </div>

                <div className=" flex h-full  items-center">
                  <div className="relative h-full w-24">
                    <div className="-left-20 top-12 absolute scale-80 h-32 min-w-[200px] rotate-270 overflow-hidden flex justify-center items-center">
                      <Barcode
                        value={ticket.ticket_id}
                        height={50}
                        width={1.5}
                      />
                    </div>
                  </div>

                  <div className="w-full p-4 grid grid-cols-5 auto-cols-min gap-4 flex-1">
                    <div className="col-span-2">
                      <h1>Name of passenger:</h1>
                      <h1>{ticket.passenger_name}</h1>
                    </div>

                    <h1>
                      Carrier: <br /> AW
                    </h1>

                    <h1>
                      Flight No. : <br />
                      {ticket.isback ? flight_back!.id : flight.id}
                    </h1>

                    <h1>
                      Class : <br />B
                    </h1>

                    <span className="col-span-2">
                      From:{" "}
                      {ticket.isback
                        ? data.flight_back?.origin
                        : data.flight.origin}{" "}
                      <br /> To:{" "}
                      {ticket.isback
                        ? data.flight_back?.dest
                        : data.flight.dest}
                    </span>

                    <h1>
                      Date: <br />{" "}
                      {dayjs(
                        ticket.isback
                          ? flight_back!.flight_date
                          : flight.flight_date
                      ).format("DD/MM/YYYY")}
                    </h1>

                    <h1>
                      Luggage: <br />Y
                    </h1>

                    <h1>
                      Seat: <br />
                      {ticket.seat}
                    </h1>

                    <span className="text-center lg:text-xl font-bold text-red-500">
                      Gate: <br />
                      {ticket.isback ? flight_back!.gate : flight.gate}
                    </span>

                    <span className="col-span-2 text-center lg:text-xl font-bold text-red-500">
                      BOADING TIME: <br />
                      {ticket.isback
                        ? flight_back!.boarding_time
                        : flight.boarding_time}
                    </span>

                    <span className="col-span-2 text-center">
                      {ticket.ticket_id}
                    </span>
                  </div>
                </div>

                <div className="h-4 bg-orange-400 rounded-bl-2xl"></div>
              </div>

              <div className="h-full w-80 flex flex-col gap-4">
                <div className="flex px-4 py-2 justify-center bg-orange-400 gap-4 rounded-tr-2xl">
                  <h1 className="text-white font-bold">BOADING PASS</h1>
                </div>

                <div className="flex flex-col px-4">
                  <div>
                    <h1>Name of passenger:</h1>
                    <h1>{ticket.passenger_name}</h1>
                  </div>

                  <div>
                    <h1>
                      From:{" "}
                      {ticket.isback ? flight_back!.origin : flight.origin}
                    </h1>
                    <h1>
                      To: {ticket.isback ? flight_back!.dest : flight.dest}
                    </h1>
                  </div>

                  <div className="h-full flex justify-between">
                    <h1>
                      Seat: <br /> {ticket.seat}
                    </h1>
                    <h1>
                      Seat: <br />{" "}
                      {dayjs(
                        ticket.isback
                          ? flight_back!.flight_date
                          : flight.flight_date
                      ).format("DD/MM/YYYY")}
                    </h1>
                  </div>

                  <div className=" flex gap-4 justify-between font-bold">
                    <div>
                      <h1>GATE:</h1>
                      <h1>{ticket.isback ? flight_back!.gate : flight.gate}</h1>
                    </div>
                    <div className="flex flex-col">
                      <h1>BOARDING TIME</h1>
                      <h1 className="self-center">
                        {ticket.isback
                          ? flight_back!.boarding_time
                          : flight.boarding_time}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="h-4 bg-orange-400 rounded-br-2xl"></div>
              </div>
            </div>
          );
        })}
      </div>

      <Link to="/">
        <Button variant="outlined">กลับหน้าหลัก</Button>
      </Link>
    </main>
  );
}
