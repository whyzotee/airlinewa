import BrowseFlightForm from "@/components/browseFlight/BrowseFlightDrawerForm";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { Button, Drawer } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const notAvaliableSevice = () => {
    toast.error("Service นี้ยังไม่เปิดให้บริการ");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mx-auto grid grid-cols-8 gap-4">
        <Button
          variant="outlined"
          size="large"
          className="text-white border border-white rounded-lg cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FlightTakeoffIcon /> เที่ยวบิน
        </Button>
        <Button size="large" variant="outlined" onClick={notAvaliableSevice}>
          <FlightTakeoffIcon />
          <SingleBedIcon />
          SNAP(เที่ยวบิน+โรงแรม)
        </Button>
        <Button size="large" variant="outlined" onClick={notAvaliableSevice}>
          <SingleBedIcon /> โรงแรม
        </Button>
        <Button size="large" variant="outlined" onClick={notAvaliableSevice}>
          บริการรับส่งสนามบิน
        </Button>
        <Button size="large" variant="outlined" onClick={notAvaliableSevice}>
          อาเซียนพาส
        </Button>
        <Button size="large" variant="outlined" onClick={notAvaliableSevice}>
          อีเว้นท์ &กิจกรรม
        </Button>
        <Button size="large" variant="outlined" onClick={notAvaliableSevice}>
          โอนคะแนน
        </Button>
        <Button size="large" variant="outlined" onClick={notAvaliableSevice}>
          ประกันภัย
        </Button>
      </div>

      <img className="rounded-xl w-full" src="/banner.png" alt="banner" />

      <img
        className="h-96 w-full mt-4 object-cover rounded-xl"
        src="/bg.webp"
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
