import BrowseFlightForm from "@/components/browseFlight/BrowseFlightDrawerForm";
import { Button, Drawer } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <div>
          <h1 className="text-2xl">Fly with Airlinewa</h1>
          <p>you never alone</p>
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
      <img
        className="h-96 w-full mt-4 object-cover"
        src="/public/bg.webp"
        alt="bg"
      />
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
  );
}
