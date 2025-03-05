import CheckoutCard from "@/features/checkout/components/CheckoutCard";
import CheckoutContact from "@/features/checkout/components/CheckoutContact";
import FlightDetail from "@/features/checkout/components/CheckoutFlightDetails";
import CheckoutServiceBag from "@/features/checkout/components/CheckoutServiceBag";
import UserDetail from "@/features/checkout/components/CheckoutUser";
import { LOGO_PATH } from "@/utils";
import { Avatar, Breadcrumbs, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";

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
        <Link to="/flight">เลือกเที่ยวบิน</Link>
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
  // const data = useLocation().state;
  const { data } = Route.useLoaderData();

  console.log("asdsaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);

  return (
    <main className="font-noto-thai">
      <div className="h-16 p-2 shadow-lg">
        <Link to="/">
          <div className="container m-auto flex items-center gap-4">
            <Avatar alt="log" src={LOGO_PATH} sx={{ width: 48, height: 48 }} />
            <h1 className="text-3xl font-bold">Airlinewa</h1>
          </div>
        </Link>
      </div>
      <div className="container mx-auto py-8 px-16 flex xl:flex-row flex-col gap-16">
        <div className="flex flex-col gap-4 w-full xl:w-[70%]">
          <PathAndTimeout />
          <FlightDetail id={data.id} info={data.info} />
          <UserDetail />
          <CheckoutContact />
          <h1 className="text-xl">Service</h1>
          <CheckoutServiceBag user={["Adult 1"]} />
        </div>

        <CheckoutCard price={data.price} />
      </div>
    </main>
  );
}
