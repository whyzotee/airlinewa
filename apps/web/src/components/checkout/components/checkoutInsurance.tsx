import ShieldIcon from "@mui/icons-material/Shield";
import { Card, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CheckoutInsurance = ({
  passengerCount, 
  onInsuranceChange,
}: {
  passengerCount: number;
  onInsuranceChange: (cost: number) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const insuranceCostPerPerson = 125.0;
  const [totalInsuranceCost, setTotalInsuranceCost] = useState(0);

  useEffect(() => {
    const newTotalCost = isChecked ? insuranceCostPerPerson * passengerCount : 0;
    setTotalInsuranceCost(newTotalCost);
    onInsuranceChange(newTotalCost); 
  }, [isChecked, passengerCount, onInsuranceChange]);

  return (
    <Card className="p-4 flex flex-col gap-4 border-2 border-gray-300 rounded-lg">
      <div className="flex items-center gap-4">
        <ShieldIcon className="text-red-500" sx={{ fontSize: 40 }} />
        <div>
          <Typography variant="h6" className="font-bold">
            ประกันภัย
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            คุ้มครองการเดินทางของคุณจากเหตุการณ์ไม่พึงประสงค์
          </Typography>
        </div>
      </div>

      <div className="border-2 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            color="success"
          />
          <Typography variant="body1" className="font-bold text-orange-600">
            ประกันภัยการเดินทาง LITE plan
          </Typography>
        </div>

        <ul className="list-disc pl-8 text-sm text-gray-700 mt-2">
          <li>แผนประกันภัยการเดินทางที่ครอบคลุมรอบเบื้องต้น</li>
          <li>ค่ารักษาพยาบาลจากอุบัติเหตุและการเจ็บป่วย</li>
          <li>การสูญหาย/เสียหายของสัมภาระเช็คอิน</li>
          <li>ความไม่สะดวกในการเดินทาง รวมถึงสัมภาระล่าช้า</li>
        </ul>

        <Typography variant="body2" className="text-red-500 cursor-pointer mt-2">
          ดูสิทธิประโยชน์ทั้งหมด
        </Typography>

        <Typography variant="body2" className="text-gray-500 mt-2">
          การเลือกซื้อประกันภัยถือว่าท่านยอมรับ ข้อกำหนดและเงื่อนไข
        </Typography>

        <div className="mt-4 text-right">
          <Typography variant="h6" className="font-bold text-gray-900">
            THB {totalInsuranceCost.toFixed(2)}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            สำหรับผู้โดยสาร {passengerCount} ท่าน
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default CheckoutInsurance;
