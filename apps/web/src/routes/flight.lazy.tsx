import { delay, openWindow } from "@/app/function";
import { APICheckout } from "@/services/checkout";
import { APISearchFlight } from "@/services/flight";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/flight")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFlights = async (src, dest, date) => {
    setLoading(true);
    const flightsData = await APISearchFlight(src, dest, date);
    setFlights(flightsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFlights("DMK", "KOP", "2025-03-11");
  }, ["DMK", "KOP", "2025-03-11"]);


  const handleClick = () => {
    if (localStorage.getItem("token") != null) {
      return callAPI();
    }

    const loginWindow = openWindow("/login", "Test", 650, 650);
    if (loginWindow == null) return;

    const checkInterval = setInterval(async () => {
      if (loginWindow && loginWindow.closed) {
        clearInterval(checkInterval);

        if (localStorage.getItem("token") != null) {
          toast.success("Login success");
          await delay(1000);
          return callAPI();
        }
      }
    }, 500);
  };

  const callAPI = () => {
    toast.promise(APICheckout(), {
      loading: "Loading...",
      success: (data) => {
        navigate({
          to: "/app/checkout",
          state: { data },
        });
        return `Founded`;
      },
      error: (err) => {
        console.log(err);
        return err.message;
      },
    });
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    toast.success(`คุณเลือกเที่ยวบิน ${flight.id}`);
    handleClick(); // ✅ เรียก `handleClick()` เมื่อเลือกเที่ยวบิน
  };
  
  return (
    <main className="p-8">
      <Typography variant="h4">เที่ยวบินที่มีให้เลือก</Typography>
      <br />
      {/* แสดงรายการเที่ยวบิน */}
      {loading ? (
        <Typography>กำลังโหลดข้อมูล...</Typography>
      ) : flights.length > 0 ? (
        flights.map((flight, index) => (
          <Card key={index} className="mb-4 p-4 shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6">เที่ยวบิน {flight.id}</Typography>
              <Typography>จาก: {flight.origin} → ถึง: {flight.destination}</Typography>
              <Typography>เวลาออกเดินทาง: {flight.schedule.departure}</Typography>
              <Typography>เวลาถึงที่หมาย: {flight.schedule.arrival}</Typography>
              <Typography>วันที่: {flight.date}</Typography>
              <Typography>ราคา: {flight.price} บาท</Typography>

              {/* ปุ่มเลือกและดูรายละเอียด */}
              <div className="flex justify-between mt-4">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: selectedFlight?.id === flight.id ? "#0faa44" : "#22c55e",
                    color: "white",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    padding: "8px 20px"
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
        ))
      ) : (
        <Typography>ไม่พบเที่ยวบิน</Typography>
      )}
    </main>
  );
}

export default RouteComponent;
