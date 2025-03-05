import { LOGO_PATH } from "@/utils";
import { Avatar, Button } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { delay } from "../app/function";
import { APIGetAirport } from "../services/home";

const HomeDrawer = lazy(() => import("@/components/HomeDrawer"));

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const navigate = Route.useNavigate();

  const dummyGetFlight = async () => {
    return;
    toast.promise(delay(1000), {
      loading: "Getting flight....",
      success: () => {
        // navigate("/flight");
        return "Founded";
      },
      error: () => "Error!",
    });
  };

  const getAddress = async () => {
    const res = await APIGetAirport();
    console.log("getAddress", res);
  };

  const logoutBTN = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  useEffect(() => {
    getAddress();

    dummyGetFlight();
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="font-noto-thai">
      <div className="fixed h-screen w-screen bg-black opacity-75"></div>
      <video
        className="fixed min-h-full min-w-full -z-10 bg-black object-cover"
        autoPlay
        loop
        muted
      >
        <source
          src={import.meta.env.BASE_URL + "preview.webm"}
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col h-screen justify-center items-center bg-transparent relative gap-4">
        <div className="flex gap-4">
          <Avatar
            className="rounded-xl"
            alt="log"
            src={LOGO_PATH}
            sx={{ width: 56, height: 56 }}
          />
          <div className="text-white">
            <h1 className="text-2xl">Fly with Airlinewa</h1>
            <p>you never die alone</p>
          </div>
        </div>

        <Button
          variant="outlined"
          color="warning"
          className="text-white border border-white rounded-lg cursor-pointer"
          // onClick={dummyGetFlight}
          onClick={() => setIsOpen(true)}
        >
          Fly Now, Book Here
        </Button>

        {localStorage.getItem("token") != null ? (
          <>
            <p className="text-white">{localStorage.getItem("token")}</p>
            <Button
              variant="outlined"
              color="warning"
              className="text-white border border-white rounded-lg cursor-pointer"
              onClick={logoutBTN}
            >
              Logout
            </Button>
          </>
        ) : null}

        <Suspense>
          <HomeDrawer open={isOpen} setOpen={setIsOpen} />
        </Suspense>
      </div>
    </main>
  );
}
