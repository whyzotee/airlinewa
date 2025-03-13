import { Button, Card, Divider } from "@mui/material";

const PaymentCard = ({
  price,
  onClick,
  onCancelClick,
}: {
  price: number[];
  onClick: () => void;
  onCancelClick: () => void;
}) => {
  const sum = price[0] + price[1];

  return (
    <div className="sticky mt-6 w-full xl:w-[30%]">
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
              <p>THB {"0"}</p>
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
      <div className="flex flex-col gap-4">
        <Button
          onClick={onClick}
          className="w-full"
          variant="outlined"
          color="warning"
        >
          ชำระเงิน
        </Button>
        <Button
          onClick={onCancelClick}
          className="w-full"
          variant="outlined"
          color="error"
        >
          ยกเลิก
        </Button>
      </div>
    </div>
  );
};

export default PaymentCard;
