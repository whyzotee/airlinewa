// import { useState } from "react";
import toast from "react-hot-toast";
import { delay } from "../app/function";
import logo from "/logo.jpg";
import preview from "/preview.webm";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIGetAirport } from "../services/home";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DrawerType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HomeDrawer = ({ open, setOpen }: DrawerType) => {
  const [trip, setTrip] = useState("go-back");

  const handleChange = (event: SelectChangeEvent) => {
    setTrip(event.target.value as string);
  };

  const [adult, setAault] = useState(1);

  const adultBTN = (type: boolean) => {
    if (!type) {
      if (adult <= 1) return;
      setAault(adult - 1);
    } else {
      if (adult > 8) return;
      setAault(adult + 1);
    }
  };

  return (
    <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
      <div className="flex flex-col p-4 gap-6">
        <div className="flex gap-4 items-center">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={trip}
            label="Age"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="go-back">ไป-กลับ</MenuItem>
            <MenuItem value="onetrip">เที่ยวเดียว</MenuItem>
          </Select>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={["1-economy"]}
            multiple
            onClose={() => console.log("Hello World")}
            size="small"
          >
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-4">
                <div>
                  <p>ผู้ใหญ่</p>
                  <p className="text-sm text-gray-500">อายุ 12 ปีขึ้นไป</p>
                </div>
                <div className="flex gap-4 items-center">
                  <Button
                    sx={{ padding: 0.5, minWidth: 32 }}
                    variant="outlined"
                    onClick={() => adultBTN(false)}
                  >
                    <RemoveIcon />
                  </Button>
                  <p className="text-1xl">{adult}</p>
                  <Button
                    sx={{ padding: 0.5, minWidth: 32 }}
                    variant="outlined"
                    onClick={() => adultBTN(true)}
                  >
                    <AddIcon />
                  </Button>
                </div>
              </div>
              <Divider />
              <p>ประเภทที่นั่ง</p>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outlined">Test</Button>
                <Button variant="outlined">Test</Button>
                <Button variant="outlined">Test</Button>
                <Button variant="outlined">Test</Button>
              </div>
            </div>
          </Select>

          <TextField
            id="promotion"
            label="Promotion"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="flex items-center gap-4">
          <TextField id="from" label="From" variant="outlined" size="small" />
          <TextField id="to" label="To" variant="outlined" size="small" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="วันออกเดินทาง" />
              <DatePicker label="วันออกเดินทาง" />
            </DemoContainer>
          </LocalizationProvider>

          <Button size="small" variant="outlined">
            <p className="py-1 px-16">ค้นหา</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const dummyGetFlight = async () => {
    return;
    toast.promise(delay(1000), {
      loading: "Getting flight....",
      success: () => {
        navigate("/flight");
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
        <source src={preview} type="video/mp4" />
      </video>
      <div className="flex flex-col h-screen justify-center items-center bg-transparent relative gap-4">
        <div className="flex gap-4">
          <Avatar
            className="rounded-xl"
            alt="log"
            src={logo}
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

        <HomeDrawer open={isOpen} setOpen={setIsOpen} />
      </div>
    </main>
  );
};

export default Home;
