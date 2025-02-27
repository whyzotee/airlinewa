import {
  AppBar,
  Avatar,
  Breadcrumbs,
  Toolbar,
  Typography,
} from "@mui/material";

import logo from "/logo.jpg";

import { Link, useLocation } from "react-router-dom";
import UserDetail from "../components/CheckoutUser";
import CheckoutCard from "../components/CheckoutCard";
import CheckoutContact from "../components/CheckoutContact";
import FlightDetail from "../components/CheckoutFlightDetails";
import CheckoutServiceBag from "../components/CheckoutServiceBag";

const PathAndTimeout = () => {
  return (
    <div className="flex justify-between">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <Link to="/flight">Flight</Link>
        <Typography sx={{ color: "text.primary" }}>Checkout</Typography>
      </Breadcrumbs>
      <span className="flex gap-1 text-sm">
        <p className="text-green-800">{"08"}</p>
        min
        <p className="text-green-800">{"34"}</p>
        sec left
      </span>
    </div>
  );
};

const CheckOut = () => {
  const data = useLocation();

  return (
    <main>
      <AppBar position="static" color="warning">
        <Toolbar className="container mx-auto">
          <Avatar alt="log" src={logo} sx={{ width: 56, height: 56 }} />
        </Toolbar>
      </AppBar>
      <div className="container mx-auto p-16 flex xl:flex-row flex-col gap-16">
        <div className="flex flex-col gap-4 w-full xl:w-[70%]">
          <PathAndTimeout />
          <FlightDetail data={data.state} />
          <UserDetail />
          <CheckoutContact />
          <h1 className="text-xl">Service</h1>
          <CheckoutServiceBag />
        </div>
        <CheckoutCard />
      </div>
    </main>
  );
};

export default CheckOut;
