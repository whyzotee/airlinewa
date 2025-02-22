import { Dropdown, MenuItem } from "@heathmont/moon-core-tw";
import { useState } from "react";

const round = ["ไป-กลับ", "เที่ยวเดียว", "เดินทางหลายเมือง"];

export default function HomeDropDown() {
  const [option, setOption] = useState("ไป-กลับ");
  return (
    <Dropdown className="w-48 rounded-sm" value={option} onChange={setOption}>
      <Dropdown.Trigger className="p-2 cursor-pointer border border-amber-300 rounded-lg w-full">
        {option}
      </Dropdown.Trigger>

      <Dropdown.Options className="bg-white rounded-sm">
        {round.map((round, index) => (
          <Dropdown.Option value={round} key={index}>
            {({ selected, active }) => (
              <MenuItem isActive={active} isSelected={selected}>
                {round}
              </MenuItem>
            )}
          </Dropdown.Option>
        ))}
      </Dropdown.Options>
    </Dropdown>
  );
}
