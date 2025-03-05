import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APICheckout } from "../services/checkout";
import { delay, openWindow } from "../app/function";

import toast from "react-hot-toast";

const Flight = () => {
  const navigate = useNavigate();

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
        navigate(`/checkout`, { state: data });

        return `Founded`;
      },
      error: (err) => {
        console.log(err);
        return err.message;
      },
    });
  };

  return (
    <main className="p-8">
      <h1>Hello World This is Flight Page</h1>
      <br />
      <Button
        variant="outlined"
        color="warning"
        className="text-white border border-white rounded-lg cursor-pointer"
        onClick={handleClick}
      >
        Test Booking Flight
      </Button>
    </main>
  );
};

export default Flight;
