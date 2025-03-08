import {
  apiCheckoutApiCheckoutPostMutation,
  apiSearchFlightApiFlightGetOptions,
} from "@/client/@tanstack/react-query.gen";
import AppBar from "@/components/appBar";
import BrowseFlightForm from "@/components/browseFlight/form";
import { useAuthStore } from "@/lib/zustand";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import toast from "react-hot-toast";

type FlightSearch = {
  originCode: string | unknown;
  destinationCode: string | unknown;
  departureDate: string | unknown;
};

export const Route = createFileRoute("/flight")({
  validateSearch: (search: Record<string, unknown>): FlightSearch => {
    // validate and parse the search params into a typed state
    return {
      originCode: search.originCode,
      destinationCode: search.destinationCode,
      departureDate: search.departureDate,
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

  const flightsQuery: any = useSuspenseQuery(
    apiSearchFlightApiFlightGetOptions({
      query: {
        origin: Route.useSearch().originCode,
        destination: Route.useSearch().destinationCode,
        date: Route.useSearch().departureDate,
      },
    })
  );

  const authStore = useAuthStore();
  // const flighsQuery = useSuspenseQuery(
  //   apiSearchFlightApiFlightGetOptions({
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
  const checkoutMutation = useMutation(apiCheckoutApiCheckoutPostMutation({}));

  const handleClick = useCallback(
    async (id: string) => {
      if (!authStore.auth) {
        toast.error("Please login!");

        navigate({
          to: "/auth/login",
        });

        return;
      }

      if (checkoutMutation.isPending) return;

      const checkout = checkoutMutation.mutateAsync({ body: { id } });

      toast.promise(checkout, {
        loading: "Loading...",
        success: (data) => {
          navigate({
            to: "/app/checkout",
            state: data,
          });
          return `Founded`;
        },
        error: (err) => {
          console.error(err);
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

  return (
    <main className="font-noto-thai">
      <AppBar />

      <div className="max-w-7xl m-auto">
        <div className="my-4 flex justify-between text-sm">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">หน้าแรก</Link>
            <Typography>เลือกเที่ยวบิน</Typography>
            <Typography sx={{ color: "text.primary" }}>
              รายละเอียดผู้โดยสาร
            </Typography>
          </Breadcrumbs>
        </div>
        <BrowseFlightForm />
        <br />

        <Typography variant="h4">เที่ยวบินที่มีให้เลือก</Typography>
        <br />

        {flightsQuery.data.length > 0 ? (
          flightsQuery.data.map((flight, index) => {
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
      </div>
    </main>
  );
}
