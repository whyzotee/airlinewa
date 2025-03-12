import {
  flightSearchFlightOptions,
  paymentCheckoutMutation,
} from "@/client/@tanstack/react-query.gen";
import BrowseFlightForm from "@/components/browseFlight/BrowseFlightDrawerForm";
import { useAuthStore } from "@/lib/zustand";
import { Button, Card, CardContent, Typography } from "@mui/material";

import { LOGO_PATH } from "@/utils";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Avatar } from "@mui/material";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { resetContactForm } from "@/components/checkout/slices/checkoutContact";
import { resetUserForm } from "@/components/checkout/slices/checkoutUser";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type FlightSearch = {
  tripeType: string;
  seatClass: string;
  originCode: string;
  destinationCode: string;
  departureDate: string;
  passenger: {
    adult: number;
    kid: number;
    child: number;
  };
};

export const Route = createFileRoute("/flight/")({
  validateSearch: (search: Record<string, unknown>): FlightSearch => {
    // validate and parse the search params into a typed state
    return {
      tripeType: String(search.tripeType),
      seatClass: String(search.seatClass),
      originCode: String(search.originCode),
      destinationCode: String(search.destinationCode),
      departureDate: String(search.departureDate),
      passenger: { ...Object(search.passenger) },
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const dispatch = useDispatch();
  const query = Route.useSearch();

  const flightsQuery = useSuspenseQuery(
    flightSearchFlightOptions({
      query: {
        tripe_type: query.tripeType,
        seat_class: query.seatClass,
        origin: query.originCode,
        destination: query.destinationCode,
        date: query.departureDate,
        adult: query.passenger.adult,
        child: query.passenger.child,
        kid: query.passenger.kid,
      },
    })
  );
  const flights = flightsQuery.data.sort((a, b) => a.price - b.price);

  const seatClassMap: Record<string, string> = {
    economy: "ชั้นประหยัด",
    business: "ชั้นธุรกิจ",
    "eco-premium": "ชั้นประหยัดพรีเมี่ยม",
    "first-class": "ชั้นหนึ่ง",
  };

  const seatClassThai = seatClassMap[query.seatClass] || "ไม่ระบุ";

  const authStore = useAuthStore();

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null); //  Make

  const checkoutMutation = useMutation(paymentCheckoutMutation());

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

      const uid = authStore.auth.userId;
      const checkout = checkoutMutation.mutateAsync({ body: { id, uid } });

      toast.promise(checkout, {
        loading: "Loading...",
        success: (data) => {
          dispatch(resetUserForm());
          dispatch(resetContactForm());

          navigate({
            to: "/flight/checkout",
            state: data,
            search: {
              seatClass: query.seatClass,
              passenger: query.passenger,
            },
          });
          return `Founded`;
        },
        error: (err) => {
          console.error(err);
          return err.message;
        },
      });
    },
    [
      authStore.auth,
      checkoutMutation,
      navigate,
      dispatch,
      query.seatClass,
      query.passenger,
    ]
  );

  const handleSelectFlight = useCallback(
    (flight) => {
      setSelectedFlight(flight);
      toast.success(`คุณเลือกเที่ยวบิน ${flight.id}`);
      handleClick(flight.id); // ✅ เรียก `handleClick()` เมื่อเลือกเที่ยวบิน
    },
    [handleClick]
  );

  const handleToggleDetails = (flightId: string) => {
    //  Make Detaill Flight Expandable
    setExpandedFlight((prev) => (prev === flightId ? null : flightId));
  };

  return (
    <div>
      <BrowseFlightForm flights={Route.useSearch()} />
      <br />
      <Typography variant="h4">เที่ยวบินที่มีให้เลือก</Typography>
      <br />

      {/* แสดงเที่ยวบิน */}
      {flights.length > 0 ? (
        flights.map((flight, index) => (
          <Card key={index} className="mb-4 p-4 shadow-lg rounded-lg border">
            <CardContent>
              {/* ชั้นโดยสาร */}
              <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-md w-fit text-sm font-bold">
                {seatClassThai}
              </div>

              {/* สายการบิน */}
              <Typography variant="body1" className="mt-2 font-semibold">
                ขาไป: Airlinewa
              </Typography>

              {/* แสดงเส้นทางบิน */}
              <div className="flex items-center justify-between mt-4">
                <Avatar
                  alt="Airline Logo"
                  src={LOGO_PATH}
                  sx={{ width: 48, height: 48 }}
                  className="mr-4"
                />

                <div className="text-center">
                  <Typography variant="h5" className="font-bold">
                    {flight.schedule.departure || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    {flight["origin"][2] || "N/A"}
                  </Typography>
                </div>

                <div className="flex-grow mx-4 border-t-2 border-dotted border-gray-400"></div>

                <div className="text-center">
                  <Typography variant="h5" className="font-bold">
                    {flight.schedule.arrival || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    {flight["destination"][2] || "N/A"}
                  </Typography>
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-600 mt-2">
                <Typography variant="body2">1 ชม. 15 นาที</Typography>
                <Typography variant="body2">เที่ยวบินตรง</Typography>
              </div>

              <hr className="my-2 border-gray-300" />

              <div className="flex items-center text-gray-700">
                <LuggageIcon className="mr-2 text-gray-500" />
                <Typography variant="body2">7 kg ต่อคน</Typography>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Typography variant="h5" className="font-bold text-gray-800">
                  THB {flight.price}{" "}
                  <span className="text-gray-500 text-sm">/ 1 ท่าน*</span>
                </Typography>

                <div className="flex gap-2">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#0faa44",
                      color: "white",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      padding: "8px 20px",
                    }}
                    onClick={() => handleSelectFlight(flight)}
                  >
                    เลือก
                  </Button>

                  <Button
                    variant="text"
                    style={{
                      color: "#e63946",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleToggleDetails(flight.id)}
                  >
                    {expandedFlight === flight.id
                      ? "ซ่อนรายละเอียด ▲"
                      : "ดูรายละเอียด ▼"}
                  </Button>
                </div>
              </div>

              {expandedFlight === flight.id && (
                <div
                  className="mt-4 p-4 border rounded-lg"
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <Typography variant="h6">รายละเอียดเที่ยวบิน</Typography>

                  <div className="flex items-start mt-2">
                    <FlightTakeoffIcon color="primary" className="mr-2" />
                    <div className="border-l-2 border-gray-400 pl-4">
                      <Typography fontWeight="bold">
                        {flight["origin"][0]}
                      </Typography>
                      <Typography variant="body2">
                        {flight["origin"][1]}
                      </Typography>
                      <Typography variant="body2">
                        เวลาออกเดินทาง: {flight.schedule.departure}
                      </Typography>
                    </div>
                  </div>

                  <div
                    className="ml-8 p-2 rounded-lg mt-2 flex items-center gap-2"
                    style={{ backgroundColor: "#eeeeee" }}
                  >
                    <Avatar
                      alt="Airline Logo"
                      src={LOGO_PATH}
                      sx={{ width: 30, height: 30 }}
                    />
                    <div className="flex flex-col">
                      <Typography>Airlinewa, {flight.id}</Typography>
                      <Typography variant="body2" className="text-gray-500">
                        ชั้นประหยัด
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-start mt-2">
                    <LocationOnIcon color="error" className="mr-2" />
                    <div className="border-l-2 border-gray-400 pl-4">
                      <Typography fontWeight="bold">
                        {flight["destination"][0]}
                      </Typography>
                      <Typography variant="body2">
                        {flight["destination"][1]}
                      </Typography>
                      <Typography variant="body2">
                        เวลาถึงที่หมาย: {flight.schedule.arrival}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <LuggageIcon className="mr-2" />
                    <Typography>กระเป๋าถือขึ้นเครื่อง 7 kg x 1</Typography>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>ไม่พบเที่ยวบิน</Typography>
      )}
    </div>
  );
}
