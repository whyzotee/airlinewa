import { useLocation } from "react-router-dom";

const Payment = () => {
  const data = useLocation();

  console.log(data.state);

  return (
    <main className="font-noto-thai">
      <h1>Payment</h1>
      <h1>{JSON.stringify(data.state)}</h1>
    </main>
  );
};

export default Payment;
