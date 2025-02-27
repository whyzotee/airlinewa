// import { useState } from "react";
import axios from "axios";
import logo from "/logo.jpg";
import preview from "/preview.webm";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { delay } from "../app/function";

const Home = () => {
  const navigate = useNavigate();

  const callAPI = async () => {
    await delay(1000);
    const response = await axios.post("http://127.0.0.1:8000/api_checkout", {
      id: "flight_001",
    });

    const data = response.data;

    if (data.res == null) throw new Error("Can't find Flight ID.");

    return data.res;
  };

  const handleClick = async () => {
    toast.promise(callAPI(), {
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
    <main>
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
          onClick={handleClick}
        >
          Fly Now, Book Here
        </Button>

        <Toaster />
        {/* <Button
          variant="outlined"
          className="text-white border border-white rounded-lg cursor-pointer"
        >
          <Link to="/checkout">Book </Link>
        </Button> */}
        {/* <Drawer open={isOpen} setOpen={setIsOpen}>
            <Drawer.Panel position="top" className="bg-white p-8 rounded-b-xl">
              <div className="flex gap-4">
                <HomeDropDown />
                <HomeDropDown /> 
                <Input
                  aria-label="default"
                  className="border-red-300 border rounded-lg w-56"
                />
                <Checkbox
                  label="เที่ยวบินเฉพาะแอร์ไลน์วา"
                  id="withLabel"
                  className=""
                />
              </div>
            </Drawer.Panel>
          </Drawer> */}
      </div>
    </main>
  );
};

export default Home;
