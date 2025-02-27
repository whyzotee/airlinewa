import React from "react";

import { Button, Card, Drawer } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";

const CheckoutServiceBag = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Card className="p-4">
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
          <h1>Hello World</h1>
        </Drawer>
      </div>
    </Card>
  );
};

export default CheckoutServiceBag;
