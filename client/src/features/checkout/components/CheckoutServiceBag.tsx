import { useState } from "react";

import { Button, Card, Divider, Drawer } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CheckoutServiceBag = ({ user }: { user: string[] }) => {
  const [open, setOpen] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const dummyService = [
    ["ไม่มี"],
    ["15 kg", "THB 466.10"],
    ["20 kg", "THB 481.10"],
    ["25 kg", "THB 481.10"],
    ["30 kg", "THB 481.10"],
    ["35 kg", "THB 481.10"],
    ["40 kg", "THB 481.10"],
    ["45 kg", "THB 481.10"],
  ];

  return (
    <Card
      className="p-4"
      elevation={0}
      sx={{
        border: 2,
        borderRadius: 2,
        borderColor: "#00000015",
      }}
    >
      <div className="flex items-center">
        <LuggageIcon sx={{ height: 64, width: 64 }} />
        <div>
          <h1 className="text-xl">สัมภาระ</h1>
          <p className="text-sm text-gray-400">
            ประหยัดได้สูงสุดเมื่อจองล่วงหน้า
            ราคาที่แสดงเป็นราคารวมทุกเที่ยวบินของท่าน
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center m-4 p-4 bg-gray-50">
        <div>
          <p>ราคารวม: THB 0.00</p>
          <p>Bangkok - Chiang Mai</p>
          <div>
            <p>1 x 7 kg กระเป๋าถือขึ้นเครื่อง</p>
          </div>
        </div>

        <Button onClick={toggleDrawer(true)} color="warning" className="h-fit">
          เปลี่ยน
        </Button>

        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <div className="h-full flex p-8 font-noto-thai">
            <div className="mr-4">
              <div className="flex items-center gap-16 bg-orange-300 rounded-full px-4 py-2 cursor-pointer">
                <h1>{user[0]}</h1>
                <ArrowForwardIosIcon sx={{ height: 16, width: 16 }} />
              </div>
            </div>

            <div className="ml-4">
              <h1 className="px-4">สัมภาระเช็คอิน</h1>
              <div className="p-4 grid grid-cols-3 gap-4 text-center">
                {dummyService.map((value) => {
                  const index = dummyService.indexOf(value);
                  const isSelect =
                    selectIndex == index
                      ? "bg-orange-200 border-orange-400"
                      : "border-gray-700";

                  return (
                    <div key={index}>
                      <div className={`h-full border-2 rounded-sm ${isSelect}`}>
                        <button
                          className="h-full w-full cursor-pointer p-4"
                          onClick={() => setSelectIndex(index)}
                        >
                          <h1>{value[0]}</h1>
                          <h1>{value[1]}</h1>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Divider />
          <div className="p-4 flex justify-between font-noto-thai">
            <div className="text-xl">
              <h1>THB {"0.00"}</h1>
              <p>ค่าธรรมเนียมสัมภาระทั้งหมด</p>
            </div>

            <Button
              color="warning"
              variant="outlined"
              className="h-fit"
              onClick={toggleDrawer(false)}
            >
              <p className="">เสร็จสิ้น</p>
            </Button>
          </div>
        </Drawer>
      </div>
    </Card>
  );
};

export default CheckoutServiceBag;
