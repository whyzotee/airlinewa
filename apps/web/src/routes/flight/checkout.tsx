import CheckoutCard from "@/components/checkout/components/CheckoutCard";
import CheckoutContact from "@/components/checkout/components/CheckoutContact";
import FlightDetail from "@/components/checkout/components/CheckoutFlightDetails";
import CheckoutInsurance from "@/components/checkout/components/CheckoutInsurance";
import CheckoutPackets from "@/components/checkout/components/CheckoutPackets";
import CheckoutServiceBag from "@/components/checkout/components/CheckoutServiceBag";
import UserDetail from "@/components/checkout/components/CheckoutUser";
import { useAuthStore } from "@/lib/zustand";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/flight/checkout")({
  validateSearch: (search: Record<string, unknown>) => {
    // validate and parse the search params into a typed state
    return {
      tripe_type: String(search.tripe_type),
      seat_class: String(search.seat_class),
      passenger: { ...Object(search.passenger) },
    };
  },
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

  let adultCount = 1;
  let kidCount = 1;
  let childCount = 1;

  const passengerTypes = [
    ...Array(queryData.passenger?.adult || 0)
      .fill(null)
      .map(() => `ผู้ใหญ่ ${adultCount++}`),
    ...Array(queryData.passenger?.kid || 0)
      .fill(null)
      .map(() => `เด็ก ${kidCount++}`),
    ...Array(queryData.passenger?.child || 0)
      .fill(null)
      .map(() => `ทารก ${childCount++}`),
  ];

  const filteredPassengerTypes = passengerTypes.filter(
    (passenger) => !passenger.includes("ทารก")
  );

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

  //   Sevice
  const [serviceCosts, setServiceCosts] = useState<number[]>([0, 0, 0]);
  const updateServiceCost = (index: number, cost: number) => {
    setServiceCosts((prev) => {
      if (prev[index] !== cost) {
        const newCosts = [...prev];
        newCosts[index] = cost;
        return newCosts;
      }
      return prev;
    });
  };
  //    Baggage
  const handleBaggageChange = (cost: number) => {
    updateServiceCost(0, cost);
  };

  //    Packets
  const handlePacketsChange = (cost: number) => {
    updateServiceCost(1, cost);
  };

  //    Insurance
  const handleInsuranceChange = (cost: number) => {
    updateServiceCost(2, cost);
  };

  return (
    <div className="flex xl:flex-row flex-col gap-16">
      <div className="flex flex-col gap-4 w-full xl:w-[70%]">
        <FlightDetail
          id={data.id}
          info={data.info}
          back_info={data.back_info}
        />

        {userDetails.map((user, i) => (
          <UserDetail
            key={i}
            userType={passengerTypes[i]}
            userNumber={i + 1}
            userData={user}
            updateUserDetails={updateUserDetails} // ส่งฟังก์ชันให้ Component
          />
        ))}

        <CheckoutContact />
        <h1 className="text-xl">Service</h1>
        <CheckoutServiceBag
          user={filteredPassengerTypes}
          onBaggageChange={handleBaggageChange}
        />
        <CheckoutPackets onPacketsChange={handlePacketsChange} />
        <CheckoutInsurance
          passengerCount={totalPassengers}
          onInsuranceChange={handleInsuranceChange}
        />
      </div>

      <CheckoutCard
        user_id={authStore?.userId}
        flight_route_id={data.id}
        price={data.price}
        servicePrice={serviceCosts}
        flight_route_back_id={data.back_info.id}
        userDetails={userDetails}
      />
    </div>
  );
}
