import AppBar from "@/components/appBar";
import CheckoutCard from "@/components/checkout/components/CheckoutCard";
import CheckoutContact from "@/components/checkout/components/CheckoutContact";
import FlightDetail from "@/components/checkout/components/CheckoutFlightDetails";
import CheckoutServiceBag from "@/components/checkout/components/CheckoutServiceBag";
import UserDetail from "@/components/checkout/components/CheckoutUser";
import { useAuthStore } from "@/lib/zustand";
import { Breadcrumbs, Typography } from "@mui/material";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";


export const Route = createFileRoute("/app/checkout")({
  loader: ({ location }) => {
    return { data: location.state };
  },
  component: RouteComponent,
});

const PathAndTimeout = () => {
  return (
    <div className="flex justify-between text-sm">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">หน้าแรก</Link>
        <Typography>เลือกเที่ยวบิน</Typography>
        <Typography sx={{ color: "text.primary" }}>
          รายละเอียดผู้โดยสาร
        </Typography>
      </Breadcrumbs>

      {/* <span className="flex gap-1 text-sm">
        <p className="text-green-800">{"08"}</p>
        min
        <p className="text-green-800">{"34"}</p>
        sec left
      </span> */}
    </div>
  );
};

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const authStore = useAuthStore((state) => state.auth);
  const queryData = useSearch({ from: "/app/checkout" });


  const totalPassengers =
    (queryData.passenger?.adult || 0) +
    (queryData.passenger?.kid || 0) +
    (queryData.passenger?.child || 0);

  let adultCount = 1;
  let kidCount = 1;
  let childCount = 1;

  const passengerTypes = [
    ...Array(queryData.passenger?.adult || 0).fill(null).map(() => `ผู้ใหญ่ ${adultCount++}`),
    ...Array(queryData.passenger?.kid || 0).fill(null).map(() => `เด็ก ${kidCount++}`),
    ...Array(queryData.passenger?.child || 0).fill(null).map(() => `ทารก ${childCount++}`),
  ];

  const [userDetails, setUserDetails] = useState(
    Array.from({ length: totalPassengers }).map(() => ({
      gender: "",
      name: "",
      lastname: "",
      country: "",
      birthday: "",
      identity: { type: "", number: "", out_date: "" },
    }))
  );

  const updateUserDetails = (index, field, value) => {
    setUserDetails((prev) => {
      const newDetails = [...prev];
      newDetails[index] = {
        ...newDetails[index],
        [field]: value,
      };
      return newDetails;
    });
  };

  return (
    <main className="font-noto-thai">
      <AppBar />
      <div className="container mx-auto my-8 flex xl:flex-row flex-col gap-16">
        <div className="flex flex-col gap-4 w-full xl:w-[70%]">
          <PathAndTimeout />
          <FlightDetail id={data.id} info={data.info} />

          {userDetails.map((user, i) => (
            <UserDetail
              key={i}
              userNumber={i + 1}
              userType={passengerTypes[i]}
              userData={user}
              updateUserDetails={updateUserDetails} // ✅ ส่งฟังก์ชันให้ Component
            />
          ))}         
          
          <CheckoutContact />
          <h1 className="text-xl">Service</h1>
          <CheckoutServiceBag user={["Adult 1"]} />
        </div>

        <CheckoutCard
          user_id={authStore?.userId}
          flight_route_id={data.id}
          price={data.price}
          userDetails={userDetails}
        />
      </div>
    </main>
  );
}
