import axios from "axios";
import toast from "react-hot-toast";

import { delay } from "@/app/function";
import { Button, Card, Divider } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const CheckoutCard = ({ id, price }: { id: string; price: number[] }) => {
  const navigate = useNavigate();

  const dataUser = useSelector((state: RootState) => state.checkoutUser);

  const dataContact = useSelector((state: RootState) => state.checkoutContact);

  const callAPI = async () => {
    await delay(1000);
    if (!dataUser.isValid) throw new Error("Please fill all the user form");

    if (!dataContact.isValid)
      throw new Error("Please fill all the contact form");

    const response = await axios.post("http://127.0.0.1:8000/api/payment", {
      flight_id: id,
      passenger: dataUser.formData,
      contact: dataContact.contactData,
    });

    const data = response.data;

    if (response.status != 200 || data == null) {
      throw new Error("Something error please try again");
    }

    return data.data;
  };

  const handleClick = () => {
    toast.promise(callAPI(), {
      loading: "Loading...",
      success: (data) => {
        navigate({ to: "/app/payment", state: data });
        return null;
      },
      error: (err) => {
        console.log(err);
        return err.message;
      },
    });
  };

  const sum = price[0] + price[1];

  return (
    <div className="sticky w-full xl:w-[30%]">
      <Card variant="outlined">
        <div className="w-full p-4">
          <div className="flex justify-between pb-4">
            <p>สรุปค่าโดยสาร</p>
            <p>ดูน้อยลง</p>
          </div>
          <Divider />
          <div className="flex flex-col py-4 gap-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <p>ค่าโดยสาร</p>
              <p>THB {price[0].toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>ภาษีค่าธรรมเนียมและภาษี</p>
              <p>THB {price[1].toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>บริการเสริม</p>
              <p>THB {"0"}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between pt-4 text-xl">
            <h1>จำนวนเงินทั้งหมด</h1>
            <h1>THB {Number(sum).toLocaleString()}</h1>
          </div>
        </div>
      </Card>
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
