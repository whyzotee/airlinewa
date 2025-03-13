import toast from "react-hot-toast";

import { paymentPaymentsMutation } from "@/client/@tanstack/react-query.gen";
import { Button, Card, Divider } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface GetPayment {
  user_id: string | undefined;
  flight_route_id: string;
  price: number[];
  servicePrice: number;
  userDetails: any[];
}

const CheckoutCard = ({
  user_id,
  flight_route_id,
  price,
  servicePrice,
  userDetails,
}: GetPayment) => {
  const navigate = useNavigate();

  // const dataUser = useSelector((state: RootState) => state.checkoutUser);
  const dataContact = useSelector((state: RootState) => state.checkoutContact);
  const queryData = useSearch({ from: "/flight/checkout" });
  const paymentMutation = useMutation(paymentPaymentsMutation());

  const handleClick = useCallback(() => {
    if (paymentMutation.isPending) {
      return;
    }

    if (!user_id) {
      toast.error("Please login first");
      return;
      // throw new Error("Please login first");
    }

    const isValid = userDetails.every(
      (user) =>
        user.gender &&
        user.name &&
        user.lastname &&
        user.country &&
        user.birthday &&
        user.identity.type &&
        user.identity.number &&
        (user.identity.type !== "passport" || user.identity.out_date)
    );

    if (!isValid) {
      toast.error("Please fill all the user form");
      return;
    }

    // if (!dataUser.isValid) throw new Error("Please fill all the user form");

    if (!dataContact.isValid) {
      toast.error("Please fill all the contact form");
      return;
    }

    // await delay(1000);

    const payment = paymentMutation.mutateAsync({
      body: {
        seat_class: queryData.seat_class,
        user_id: user_id,
        flight_route_id: flight_route_id,
        // passengers: [dataUser.formData],
        passengers: userDetails,
        contact: dataContact.contactData,
      },
    });

    toast.promise(payment, {
      loading: "Loading...",
      success: (data) => {
        navigate({ to: "/app/payment", state: data }); //replace: true });
        return null;
      },
      error: (err) => {
        const error = err as AxiosError;
        const { response } = error;

        if (!response) {
          return err.message;
        }
        // @ts-ignore
        const detail = response.data.detail;

        if (detail === "TIMEOUT") {
          return "Payment time out!";
        }

        return err.message;
      },
    });
  }, [
    dataContact.contactData,
    dataContact.isValid,
    flight_route_id,
    navigate,
    paymentMutation,
    queryData.seat_class,
    userDetails,
    user_id,
  ]);

  const sum = price[0] + price[1] + servicePrice[0] + servicePrice[1] + servicePrice[2];
  const sumService = servicePrice[0] + servicePrice[1] + servicePrice[2];

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
              <p>THB {Number(sumService).toLocaleString()}</p>
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
