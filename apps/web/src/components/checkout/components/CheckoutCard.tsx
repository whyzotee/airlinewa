import toast from "react-hot-toast";

import { delay } from "@/app/function";
import { paymentPaymentsMutation } from "@/client/@tanstack/react-query.gen";
import { Button, Card, Divider } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface GetPayment {
  user_id: string | undefined;
  flight_route_id: string;
  price: number[];
  userDetails: any[];
}

const CheckoutCard = ({ user_id, flight_route_id, price, userDetails }: GetPayment) => {
  const navigate = useNavigate();

  const dataUser = useSelector((state: RootState) => state.checkoutUser);
  const dataContact = useSelector((state: RootState) => state.checkoutContact);
  const queryData = useSearch({ from: "/app/checkout" });
  const paymentMutation = useMutation(paymentPaymentsMutation());
  
  const callAPI = async () => {
    if (paymentMutation.isPending) return;

    if (!user_id) throw new Error("Please login first");

    const isValid = userDetails.every(user => 
      user.gender &&
      user.name &&
      user.lastname &&
      user.country &&
      user.birthday &&
      user.identity.type &&
      user.identity.number &&
      (user.identity.type !== "passport" || user.identity.out_date)
    );

    if(!isValid) throw new Error("Please fill all the user form");

    // if (!dataUser.isValid) throw new Error("Please fill all the user form");

    if (!dataContact.isValid)
      throw new Error("Please fill all the contact form");
    
    console.log(userDetails)
    await delay(1000);

    const payment = paymentMutation.mutateAsync({
      body: {
        seat_class: queryData.seatClass,
        user_id: user_id,
        flight_route_id: flight_route_id,
        // passengers: [dataUser.formData],
        passengers: userDetails,
        contact: dataContact.contactData,
      },
    }
  );
    // const response = await axios.post("http://127.0.0.1:8000/api/payment", {
    //   user_id: user_id,
    //   flight_route_id: flight_route_id,
    //   passengers: [dataUser.formData],
    //   contact: dataContact.contactData,
    // });

    // const data = payment.data;

    // if (payment.status != 200 || data == null) {
    //   throw new Error("Something error please try again");
    // }

    return payment;
  };

  const handleClick = () => {
    toast.promise(callAPI(), {
      loading: "Loading...",
      success: (data) => {
        navigate({ to: "/app/payment", state: data }); //replace: true });
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
