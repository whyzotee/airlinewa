import SuccesAnimation from "@/assets/success.json";
import { paymentPaymentSuccessOptions } from "@/client/@tanstack/react-query.gen";
import { Button } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Lottie from "lottie-react";

export const Route = createFileRoute("/app/success")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      booking_id: search.booking_id,
    };
  },
  loader: async ({ context, location }) => {
    const { booking_id } = location.search as { booking_id: string };

    try {
      const bookingPaymentQuery = await context.queryClient.ensureQueryData(
        paymentPaymentSuccessOptions({ query: { booking_id } })
      );

      console.debug(bookingPaymentQuery);
    } catch (err) {
      console.error(err);

      throw notFound();
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <p>Booking payment not found!</p>,
});

function RouteComponent() {
  const { booking_id } = Route.useSearch();

  const bookingPaymentQuery = useSuspenseQuery(
    paymentPaymentSuccessOptions({
      query: {
        booking_id: String(booking_id),
      },
    })
  );

  const bookingPayment = bookingPaymentQuery.data;

  return (
    <main className="font-noto-thai">
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <div className="h-96 w-96">
          <Lottie animationData={SuccesAnimation} loop={true} />
        </div>
        <h1 className="text-gray-800 text-3xl">
          คำสั่งซื้อสำเร็จ #{bookingPayment.payment_id}
        </h1>
        <p>
          ตั๋วและใบเสร็จของคุณจะถูกส่งไปยัง E-mail ที่คุณกรอกไว้:{" "}
          {bookingPayment.email}
        </p>
        <p>ขอบคุณที่ไว้ใจ และใช้บริการของ Airlinewa</p>

        <div className="flex gap-4">
          <Link to="/app/ticket">
            <Button variant="outlined" color="error">
              ดูตั๋วส่งผ่าน E-mail
            </Button>
          </Link>

          <Link to="/">
            <Button variant="outlined">กลับหน้าหลัก</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
