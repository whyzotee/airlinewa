import { useAuthStore } from "@/lib/zustand";
import { Button } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/flight")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const authStore = useAuthStore();

  const handleClick = useCallback(async () => {
    if (!authStore.auth) {
      toast.error("Please login!");

      navigate({
        to: "/auth/login",
      });

      return;
    }

    // const loginWindow = openWindow("/login", "Test", 650, 650);

    // if (loginWindow == null) return;

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
  }, [authStore.login, navigate]);

  // const callAPI = () => {
  //   toast.promise(APICheckout(), {
  //     loading: "Loading...",
  //     success: (data) => {
  //       // navigate(`/checkout`, { state: data });
  //       navigate({
  //         to: "/app/checkout",
  //         state: {
  //           data,
  //         },
  //       });

  //       return `Founded`;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       return err.message;
  //     },
  //   });
  // };

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
}
