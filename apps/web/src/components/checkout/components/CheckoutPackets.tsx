import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Card, Divider } from "@mui/material";
import { useState } from "react";

const CheckoutPackets = ({ onPacketsChange }: { onPacketsChange: (cost: number) => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const insurancePlans = [
    {
      id: 1,
      name: "แพ็กสุดคุ้ม",
      description: "ประหยัดยิ่งขึ้น ลดสูงสุด 20%",
      features: [
        "สัมภาระพกพาขึ้นเครื่อง (7 กก.)",
        "20 กก. โหลดสัมภาระ",
        "อาหาร 1 มื้อ",
        "บริการเลือกที่นั่งฟรี",
      ],
      price: 1498.0,
    },
    {
      id: 2,
      name: "Premium Flex",
      description: "เน้นความยืดหยุ่น",
      features: [
        "สัมภาระพกพาขึ้นเครื่อง (7 กก.)",
        "20 กก. โหลดสัมภาระ",
        "อาหารสุดคุ้ม Santan Value Meal",
        "เปลี่ยนวัน/เวลาเดินทางได้ 2 ครั้ง",
        "จองสัมภาระ, ที่นั่งล่วงหน้า",
      ],
      price: 2311.2,
    },
  ];

  const handleSelectPlan = (planId: number, price: number) => {
    if (selectedPlan === planId) {
      setSelectedPlan(null);
      onPacketsChange(0);
    } else {
      setSelectedPlan(planId);
      onPacketsChange(price);
    }
  };

  return (
    <Card className="p-4" elevation={0} sx={{ border: 2, borderRadius: 2, borderColor: "#00000015" }}>
      <div className="flex items-center mb-4">
        <CheckCircleOutlineIcon sx={{ height: 32, width: 32, color: "green" }} />
        <h1 className="text-lg font-bold ml-2">แพ็กเกจบริการเสริม</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {insurancePlans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-4 cursor-pointer border-2 ${
              selectedPlan === plan.id ? "border-orange-500" : "border-gray-200"
            }`}
            onClick={() => handleSelectPlan(plan.id, plan.price)}
          >
            <h2 className="text-lg font-bold">{plan.name}</h2>
            <p className="text-sm text-orange-500">{plan.description}</p>
            <ul className="text-sm mt-2">
              {plan.features.map((feature, index) => (
                <li key={index}>✔ {feature}</li>
              ))}
            </ul>
            <Divider className="my-2" />
            <p className="font-bold text-lg">THB {plan.price.toFixed(2)}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default CheckoutPackets;