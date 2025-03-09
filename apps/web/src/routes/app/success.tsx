import { Button } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import Lottie from "lottie-react";
import SuccesAnimation from "/public/success.json";

export const Route = createFileRoute("/app/success")({
  component: RouteComponent,
});

function RouteComponent() {
  const { payment_id } = Route.useSearch();
  console.log(payment_id);

  return (
    <main className="font-noto-thai">
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <div className="h-96 w-96">
          <Lottie animationData={SuccesAnimation} loop={true} />
        </div>
        <h1 className="text-gray-800 text-3xl">
          คำสั่งซื้อสำเร็จ #{payment_id}
        </h1>
        <p>
          ตั๋วและใบเสร็จของคุณจะถูกส่งไปยัง E-mail ที่คุณกรอกไว้:
          zenlektomyum@gmail.com
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
