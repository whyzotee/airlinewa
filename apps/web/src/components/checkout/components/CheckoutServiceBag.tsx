import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Button, Card, Divider, Drawer } from "@mui/material";
import { useEffect, useState } from "react";

const CheckoutServiceBag = ({ 
  user, 
  onBaggageChange // เพิ่ม props เพื่อส่งค่าราคารวมสัมภาระกลับไป `checkout.tsx`
}: { 
  user: string[], 
  onBaggageChange: (cost: number) => void 
}) => {
  const [open, setOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(user[0]); 
  const [selectedBaggage, setSelectedBaggage] = useState<Record<string, number>>({});

  const dummyService = [
    ["ไม่มี", "0.00"],
    ["15 kg", "467.48"],
    ["20 kg", "492.20"],
    ["25 kg", "631.30"],
    ["30 kg", "995.10"],
    ["40 kg", "1230.50"],
    ["50 kg", "1776.20"],
    ["60 kg", "2214.90"],
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSelectBaggage = (passenger: string, price: string) => {
    setSelectedBaggage((prev) => ({
      ...prev,
      [passenger]: parseFloat(price),
    }));
  };

  useEffect(() => {
    const totalBaggageCost = Object.values(selectedBaggage).reduce((acc, curr) => acc + curr, 0);
    if (onBaggageChange) { // ตรวจสอบว่า onBaggageChange มีค่าหรือไม่
      onBaggageChange(totalBaggageCost); // ส่งค่าราคารวมสัมภาระไปยัง `checkout.tsx`
    }
  }, [selectedBaggage, onBaggageChange]);

  return (
    <Card className="p-4" elevation={0} sx={{ border: 2, borderRadius: 2, borderColor: "#00000015" }}>
      <div className="flex items-center">
        <LuggageIcon sx={{ height: 64, width: 64 }} />
        <div>
          <h1 className="text-xl">สัมภาระ</h1>
          <p className="text-sm text-gray-400">
            ประหยัดได้สูงสุดเมื่อจองล่วงหน้า ราคาที่แสดงเป็นราคารวมทุกเที่ยวบินของท่าน
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center m-4 p-4 bg-gray-50">
        <div>
          <p>ราคารวม: THB {Object.values(selectedBaggage).reduce((acc, curr) => acc + curr, 0).toFixed(2)}</p>
          <p>Bangkok - Chiang Mai</p>
          <div>
            <p>1 x 7 kg กระเป๋าถือขึ้นเครื่อง</p>
          </div>
        </div>

        <Button onClick={toggleDrawer(true)} color="warning" className="h-fit">เปลี่ยน</Button>

        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <div className="h-full flex p-8 font-noto-thai">
            <div className="mr-4 flex flex-col gap-2">
              {user.map((passenger, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 px-4 py-2 rounded-full cursor-pointer
                    ${selectedPassenger === passenger ? "bg-orange-300" : "bg-gray-200"}`}
                  onClick={() => setSelectedPassenger(passenger)}
                >
                  <h1>{passenger}</h1>
                  <ArrowForwardIosIcon sx={{ height: 16, width: 16 }} />
                </div>
              ))}
            </div>  
            <div className="ml-4">
              <h1 className="px-4">{selectedPassenger} - สัมภาระเช็คอิน</h1>
              <div className="p-4 grid grid-cols-3 gap-4 text-center">
                {dummyService.map((value, index) => (
                  <div
                    key={index}
                    className={`h-full border-2 rounded-sm ${
                      selectedBaggage[selectedPassenger] === parseFloat(value[1]) ? "bg-orange-200 border-orange-400" : "border-gray-700"
                    }`}
                  >
                    <button
                      className="h-full w-full cursor-pointer p-4"
                      onClick={() => handleSelectBaggage(selectedPassenger, value[1])}
                    >
                      <h1>{value[0]}</h1>
                      <h1>THB {value[1]}</h1>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Divider />
          <div className="p-4 flex justify-between font-noto-thai">
            <div className="text-xl">
              <h1>THB {Object.values(selectedBaggage).reduce((acc, curr) => acc + curr, 0).toFixed(2)}</h1>
              <p>ค่าธรรมเนียมสัมภาระทั้งหมด</p>
            </div>

            <Button color="warning" variant="outlined" className="h-fit" onClick={toggleDrawer(false)}>เสร็จสิ้น</Button>
          </div>
        </Drawer>
      </div>
    </Card>
  );
};

export default CheckoutServiceBag;