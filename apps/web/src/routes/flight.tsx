import { getFlightApiSearchFlightGetOptions } from "@/client/@tanstack/react-query.gen";
import { useAuthStore } from "@/lib/zustand";
import { APICheckout } from "@/services/checkout";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import toast from "react-hot-toast";

type FlightSearch = {
  src: string;
  dest: string;
  date: string;
};

export const Route = createFileRoute("/flight")({
  validateSearch: (search: Record<string, unknown>): FlightSearch => {
    // validate and parse the search params into a typed state
    return {
      src: search.src,
      dest: search.dest,
      date: search.date,
    };
  },
  loader: ({ location }) => {
    return { flights: location.state.flights };
  },
  component: RouteComponent,
});

function RouteComponent() {
  // const { flights } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const flightsQuery = useSuspenseQuery(
    getFlightApiSearchFlightGetOptions({
      query: {
        src,
        dest,
        date,
      },
    })
  );

  const authStore = useAuthStore();
  // const flighsQuery = useSuspenseQuery(
  //   getFlightApiSearchFlightGetOptions({
  //     query: {
  //       src: "BKK",
  //       dest: "KOP",
  //       date: "2025-03-11",
  //     },
  //   })
  // );

  // const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const fetchFlights = async (src, dest, date) => {
  //   setLoading(true);
  //   const flightsData = await APISearchFlight(src, dest, date);
  //   setFlights(flightsData);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchFlights("DMK", "KOP", "2025-03-11");
  // }, []);

  const handleClick = useCallback(
    async (id: string) => {
      if (!authStore.auth) {
        toast.error("Please login!");

        navigate({
          to: "/auth/login",
        });

        return;
      }

      toast.promise(APICheckout(id), {
        loading: "Loading...",
        success: (data) => {
          navigate({
            to: "/app/checkout",
            state: data,
          });
          return `Founded`;
        },
        error: (err) => {
          console.log(err);
          return err.message;
        },
      });

      // const checkInterval = setInterval(async () => {
      //   if (loginWindow && loginWindow.closed) {
      //     clearInterval(checkInterval);

      //     if (localStorage.getItem("token") != null) {
      //       toast.success("Login success");
      //       await delay(1000);
      //       // return callAPI();
      //     }
      //   }
      // }, 500);
    },
    [navigate, authStore.auth]
  );

  const handleSelectFlight = useCallback(
    (flight) => {
      setSelectedFlight(flight);
      toast.success(`คุณเลือกเที่ยวบิน ${flight.id}`);
      handleClick(flight.id); // ✅ เรียก `handleClick()` เมื่อเลือกเที่ยวบิน
    },
    [handleClick]
  );

  // console.log("Testtttttttt", [...flights]);

  return (
    <main className="p-8">
      <Typography variant="h4">เที่ยวบินที่มีให้เลือก</Typography>
      <br />
      {flights.length > 0 ? (
        flights.map((flight, index) => {
          console.log(flight, index);

          return (
            <Card key={index} className="mb-4 p-4 shadow-lg rounded-lg">
              <CardContent>
                <Typography variant="h6">เที่ยวบิน {flight.id}</Typography>
                <Typography>
                  จาก: {flight.origin} → ถึง: {flight.destination}
                </Typography>
                <Typography>
                  เวลาออกเดินทาง: {flight.schedule.departure}
                </Typography>
                <Typography>
                  เวลาถึงที่หมาย: {flight.schedule.arrival}
                </Typography>
                <Typography>วันที่: {flight.date}</Typography>
                <Typography>ราคา: {flight.price} บาท</Typography>

                {/* ปุ่มเลือกและดูรายละเอียด */}
                <div className="flex justify-between mt-4">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor:
                        selectedFlight?.id === flight.id
                          ? "#0faa44"
                          : "#22c55e",
                      color: "white",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      padding: "8px 20px",
                    }}
                    onClick={() => handleSelectFlight(flight)}
                  >
                    เลือก
                  </Button>

                  {/* <Button
                variant="outlined"
                style={{
                  borderColor: "#e63946",
                  color: "#e63946",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  padding: "8px 20px"
                }}
              >
                ดูรายละเอียด ▼
              </Button> */}
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Typography>ไม่พบเที่ยวบิน</Typography>
      )}
    </main>
  );
}
