import { delay } from "@/app/function";
import {
  paymentPaymentCancelMutation,
  paymentPaymentGatewayMutation,
} from "@/client/@tanstack/react-query.gen";
import FlightDetail from "@/components/checkout/components/CheckoutFlightDetails";
import PaymentCard from "@/components/payment/PaymentCard";
import PaymentTabs from "@/components/payment/PaymentTabs";
import { useAuthStore, usePaymentStore } from "@/lib/zustand";
import { Breadcrumbs, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/app/payment")({
  loader: ({ location }) => {
    return {
      data: location.state,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const navigate = useNavigate();
  const { data } = Route.useLoaderData();
  const { payment, setPayment } = usePaymentStore();
  const paymentMutation = useMutation(paymentPaymentGatewayMutation());

  const payBTNClick = () => {
    if (paymentMutation.isPending) return;

    if (payment.number.trim().length != 16) {
      return toast.error("Error: Enter your card number");
    }

    if (payment.out_date.trim().length != 5) {
      return toast.error("Error: Enter your card out date");
    }

    if (payment.cvv.trim().length != 3) {
      return toast.error("Error: Enter your card cvv");
    }

    if (payment.holder_name.trim() == "") {
      return toast.error("Error: Enter your holder name");
    }

    const payGateway = paymentMutation.mutateAsync({
      body: payment,
    });

    toast.promise(
      async () => {
        await delay(2000);
        return await payGateway;
      },
      {
        loading: "Peding payment...",
        success: (value) => {
          navigate({
            to: "/app/success",
            search: {
              booking_id: value.booking_id,
            },
            // replace: true,
          });
          return "Success";
        },
        error: (error) => {
          console.error(error);
          return error.response.data.detail;
        },
      }
    );
  };

  const cencelMutation = useMutation(paymentPaymentCancelMutation());

  const onCancelClick = () => {
    if (cencelMutation.isPending) return;

    const cancel = cencelMutation.mutateAsync({
      body: {
        flight_route_id: data.id,
        booking_id: data.booking_id,
      },
    });

    toast.promise(
      async () => {
        await delay(1000);
        return await cancel;
      },
      {
        loading: "Cancel payment...",
        success: (value) => {
          if (value) {
            router.history.back();
            router.history.back();
          }

          return "Success";
        },
        error: (error) => {
          console.error(error);
          return error.response.data.detail;
        },
      }
    );
  };

  const authStore = useAuthStore();
  const uid = authStore.auth?.userId;

  useEffect(() => {
    if (authStore.auth) {
      setPayment({ ["type"]: "CREDIT_DEBIT" });
      setPayment({ ["user_id"]: uid });
      setPayment({ ["payment_id"]: data.payment_id });
    }
  }, [setPayment, data.payment_id, uid, authStore.auth]);

  if (!authStore.auth) {
    return <h1>Login First</h1>;
  }

  return (
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

        <PaymentCard
          onClick={payBTNClick}
          price={data.price}
          onCancelClick={onCancelClick}
        />
      </div>

      <PaymentCard onClick={payBTNClick} price={data.price} />
    </div>
  );
}
