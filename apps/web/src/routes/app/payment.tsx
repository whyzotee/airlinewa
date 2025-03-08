import AppBar from "@/components/appBar";
import FlightDetail from "@/components/checkout/components/CheckoutFlightDetails";
import PaymentTabs from "@/components/payment/PaymentTabs";
import PaymentCard from "@/components/payment/paymentCard";
import { Breadcrumbs, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/payment")({
  loader: ({ location }) => {
    return {
      data: location.state,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <main className="font-noto-thai">
      <AppBar />
      <div className="container mx-auto my-8 flex xl:flex-row flex-col gap-16">
        <div className="flex flex-col gap-4 w-full xl:w-[70%]">
          <div className="flex justify-between text-sm">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/">หน้าแรก</Link>
              <Typography>เลือกเที่ยวบิน</Typography>
              <Typography>รายละเอียดผู้โดยสาร</Typography>
              <Typography sx={{ color: "text.primary" }}>ชำระเงิน</Typography>
            </Breadcrumbs>
          </div>
          <h1 className="text-2xl">ระบบการชำระเงินด้วยความปลอดภัย</h1>
          <FlightDetail id={data.id} info={data.info} />
          <PaymentTabs />
        </div>

        <PaymentCard price={data.price} />
      </div>
      <h1>Payment</h1>
      <h1>{JSON.stringify(data)}</h1>
    </main>
  );
}
