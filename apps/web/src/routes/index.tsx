import BrowseFlightForm from "@/components/browseFlight/BrowseFlightDrawerForm";
import { LOGO_PATH } from "@/utils";
import { Avatar, Button, Drawer } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
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
              // onClick={logoutBTN}
            >
              Logout
            </Button>
          </>
        ) : null}

        <Suspense>
          <Drawer anchor="top" open={isOpen} onClose={() => setIsOpen(false)}>
            <BrowseFlightForm drawerSetOpen={setIsOpen} />
          </Drawer>
        </Suspense>
      </div>
    </main>
  );
}
