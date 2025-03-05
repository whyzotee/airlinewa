import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Divider,
  Drawer,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { FC, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HomeDrawer: FC<Prop> = ({ open, setOpen }) => {
  const [trip, setTrip] = useState("go-back");

  const handleChange = (event: SelectChangeEvent) => {
    setTrip(event.target.value as string);
  };

  const [adult, setAault] = useState(1);

  const adultBTN = (type: boolean) => {
    if (!type) {
      if (adult <= 1) return;
      setAault(adult - 1);
    } else {
      if (adult > 8) return;
      setAault(adult + 1);
    }
  };

  return (
    <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
      <div className="flex flex-col p-4 gap-6">
        <div className="flex gap-4 items-center">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={trip}
            label="Age"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="go-back">ไป-กลับ</MenuItem>
            <MenuItem value="onetrip">เที่ยวเดียว</MenuItem>
          </Select>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={["1-economy"]}
            multiple
            onClose={() => console.log("Hello World")}
            size="small"
          >
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-4">
                <div>
                  <p>ผู้ใหญ่</p>
                  <p className="text-sm text-gray-500">อายุ 12 ปีขึ้นไป</p>
                </div>
                <div className="flex gap-4 items-center">
                  <Button
                    sx={{ padding: 0.5, minWidth: 32 }}
                    variant="outlined"
                    onClick={() => adultBTN(false)}
                  >
                    <RemoveIcon />
                  </Button>
                  <p className="text-1xl">{adult}</p>
                  <Button
                    sx={{ padding: 0.5, minWidth: 32 }}
                    variant="outlined"
                    onClick={() => adultBTN(true)}
                  >
                    <AddIcon />
                  </Button>
                </div>
              </div>
              <Divider />
              <p>ประเภทที่นั่ง</p>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outlined">Test</Button>
                <Button variant="outlined">Test</Button>
                <Button variant="outlined">Test</Button>
                <Button variant="outlined">Test</Button>
              </div>
            </div>
          </Select>

          <TextField
            id="promotion"
            label="Promotion"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="flex items-center gap-4">
          <TextField id="from" label="From" variant="outlined" size="small" />
          <TextField id="to" label="To" variant="outlined" size="small" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="วันออกเดินทาง" />
              <DatePicker label="วันออกเดินทาง" />
            </DemoContainer>
          </LocalizationProvider>

          <Button size="small" variant="outlined">
            <p className="py-1 px-16">ค้นหา</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default HomeDrawer;
