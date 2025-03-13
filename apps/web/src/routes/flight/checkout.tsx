import CheckoutCard from "@/components/checkout/components/CheckoutCard";
import CheckoutContact from "@/components/checkout/components/CheckoutContact";
import FlightDetail from "@/components/checkout/components/CheckoutFlightDetails";
import CheckoutServiceBag from "@/components/checkout/components/CheckoutServiceBag";
import UserDetail from "@/components/checkout/components/CheckoutUser";
import { useAuthStore } from "@/lib/zustand";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/flight/checkout")({
  loader: ({ location }) => {
    return { data: location.state };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const authStore = useAuthStore((state) => state.auth);
  const queryData = Route.useSearch();

  const totalPassengers =
    queryData.passenger.adult +
    queryData.passenger.kid +
    queryData.passenger.child;

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
    <div className="flex xl:flex-row flex-col gap-16">
      <div className="flex flex-col gap-4 w-full xl:w-[70%]">
        <FlightDetail id={data.id} info={data.info} />

        {userDetails.map((user, i) => (
          <UserDetail
            key={i}
            userType={"Test"}
            userNumber={i + 1}
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
  );
}
