import React from "react";
import { Button, Card, Divider } from "@mui/material";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const card = (
  <React.Fragment>
    <div className="w-full p-4">
      <div className="flex justify-between pb-4">
        <p>สรุปค่าโดยสาร</p>
        <p>ดูน้อยลง</p>
      </div>
      <Divider />
      <div className="flex flex-col py-4 gap-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <p>ค่าโดยสาร</p>
          <p>THB 3,289.71</p>
        </div>
        <div className="flex justify-between">
          <p>ภาษีค่าธรรมเนียมและภาษี</p>
          <p>THB 490.27</p>
        </div>
        <div className="flex justify-between">
          <p>บริการเสริม</p>
          <p>THB 1,298.40</p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between pt-4 text-xl">
        <h1>จำนวนเงินทั้งหมด</h1>
        <h1>THB {"test"}</h1>
      </div>
    </div>
  </React.Fragment>
);

const CheckoutCard = () => {
  const navigate = useNavigate();

  const formData = useSelector(
    (state: RootState) => state.checkoutUser.formData
  );

  const dataContact = useSelector((state: RootState) => state.checkoutContact);

  const handleClick = async () => {
    console.log("OK");

    const response = await axios.post("http://127.0.0.1:8000/api_payment", {
      ...formData,
      contact: dataContact,
    });

    const data = response.data;

    if (data.res == null) throw new Error("Something error please try again");

    console.log(response.data);

    navigate("/payment", { state: data.res });
    return;
  };

  return (
    <div className="sticky w-full xl:w-[30%]">
      <Card variant="outlined">{card}</Card>
      <br />
      <Button
        onClick={handleClick}
        className="w-full"
        variant="outlined"
        color="warning"
      >
        ดำเนินการต่อ
      </Button>
    </div>
  );
};

export default CheckoutCard;
