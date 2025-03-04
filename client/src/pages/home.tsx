// import { useState } from "react";
import toast from "react-hot-toast";
import { delay } from "../app/function";
import logo from "/logo.jpg";
import preview from "/preview.webm";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const dummyGetFlight = async () => {
    toast.promise(delay(1000), {
      loading: "Getting flight....",
      success: () => {
        navigate("/flight");
        return "Founded";
      },
      error: () => "Error!",
    });
  };

  const logoutBTN = () => {
    localStorage.removeItem("token");
    location.reload();
  };

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
          onClick={dummyGetFlight}
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
