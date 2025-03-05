import { delay } from "@/app/function";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Autocomplete,
  Button,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useNavigate } from "@tanstack/react-router";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";

interface Airport {
  name: string;
  address: string;
  code: string;
}

interface Prop {
  open: boolean;
  setOpen: (open: boolean) => void;
  airports: Array<Airport> | null;
}

const flightClass = [
  { id: "eco", title: "ชั้นประหยัด" },
  { id: "bus", title: "ชั้นธุรกิจ" },
  { id: "eco_pre", title: "ชั้นประหยัดพรีเมี่ยม" },
  { id: "first", title: "ชั้นหนึ่ง" },
];

const peopleType = [
  { id: 1, name: "ผู้ใหญ่", age: "อายุ 12 ปีขึ้นไป" },
  { id: 2, name: "เด็ก", age: "อายุ 2-11ปี" },
  { id: 3, name: "เด็กทารก", age: "อายุน้อยกว่า 2ปี" },
];

const HomeDrawer: FC<Prop> = ({ open, setOpen, airports }) => {
  const [trip, setTrip] = useState("go-back");
  const [seatClass, setSeatClass] = useState("eco");
  const [promoCode, setPromoCode] = useState("");
  const [srcValue, setSrcValue] = useState<string | null>(null);
  const [destValue, setDestValue] = useState<string | null>(null);
  const [goDate, setGoDate] = useState<Dayjs | null>(null);
  const [backDate, setBackDate] = useState<Dayjs | null>(null);

  const currentYear = dayjs();

  const handleChange = (event: SelectChangeEvent) => {
    setTrip(event.target.value as string);
  };

  const navigate = useNavigate();

  const [peopleCountAll, setPeopleCountAll] = useState([1, 1, 0, 0]);

  const peopleBTN = (id: number, type: boolean) => {
    setPeopleCountAll((prev) => {
      const newCount = [...prev];

      if (type) {
        if (newCount[0] >= 9) return prev;
        newCount[0] += 1;
        newCount[id] += 1;
      } else {
        if (newCount[0] <= 1 || newCount[id] <= 0) return prev;
        newCount[0] -= 1;
        newCount[id] -= 1;
      }

      return newCount;
    });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openT = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const apiSearchFlight = async () => {
    const formatData = {
      tripType: trip,
      seat_class: seatClass,
      people_count: peopleCountAll,
      src: srcValue,
      dest: destValue,
      go_date: goDate?.toISOString(),
      back_date: backDate?.toISOString(),
    };

    console.log(formatData);

    if (srcValue === null || destValue === null) {
      return toast.error("Please select origin and destination");
    }

    if (goDate == null) {
      return toast.error("Please select go Date");
    }

    if (trip == "go-back" && backDate == null) {
      return toast.error("Please select back Date");
    }

    await toast.promise(delay(1000), {
      loading: "Getting flight....",
      success: () => {
        navigate({ to: "/flight" });
        return "Founded";
      },
      error: "Error!",
    });
  };

  return (
    <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
      <div className="max-w-6xl w-full m-auto flex flex-col p-4 gap-6">
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

          <button
            id="basic-button"
            aria-controls={openT ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openT ? "true" : undefined}
            onClick={handleClick}
            className="cursor-pointer"
          >
            {peopleCountAll[0]} ผู้โดยสาร{" "}
            {flightClass.filter((value) => value.id == seatClass)[0].title}
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openT}
            onClose={() => {
              console.log("Hello World");
              handleClose();
            }}
          >
            <div className="flex flex-col gap-4 p-4">
              {peopleType.map((value) => {
                return (
                  <div key={value.id} className="flex justify-between gap-4">
                    <div>
                      <p>{value.name}</p>
                      <p className="text-sm text-gray-500">{value.age}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Button
                        sx={{ padding: 0.5, minWidth: 32 }}
                        variant="outlined"
                        onClick={() => peopleBTN(value.id, false)}
                        disabled={
                          (value.id == 1 && peopleCountAll[value.id] <= 1) ||
                          !peopleCountAll[value.id]
                        }
                      >
                        <RemoveIcon />
                      </Button>
                      <p className="text-1xl">{peopleCountAll[value.id]}</p>
                      <Button
                        sx={{ padding: 0.5, minWidth: 32 }}
                        variant="outlined"
                        onClick={() => peopleBTN(value.id, true)}
                        disabled={peopleCountAll[0] >= 9}
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                );
              })}

              <Divider />
              <p>ประเภทที่นั่ง</p>
              <div className="grid grid-cols-2 gap-4">
                {flightClass.map((value) => {
                  return (
                    <button
                      key={value.id}
                      className={`p-4 rounded-sm border-1 cursor-pointer ${seatClass == value.id ? "border-orange-400 text-orange-400" : "border-gray-400"}`}
                      onClick={() => setSeatClass(value.id)}
                    >
                      {value.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </Menu>

          <TextField
            id="promotion"
            label="Promotion"
            variant="outlined"
            size="small"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Autocomplete
            size="small"
            className="min-w-56"
            options={
              airports
                ?.filter((value) => {
                  if (destValue == "BKK" && value.code == "DMK") return false;
                  return destValue != value.code;
                })
                .map((value) => value.name) ?? []
            }
            onChange={(_, v: string | null) => {
              const airport = airports?.filter((value) => value.name == v);
              if (airport != null) setSrcValue(airport[0]?.code);
            }}
            renderInput={(params) => <TextField {...params} label="จาก" />}
          />

          <Autocomplete
            size="small"
            className="min-w-56"
            options={
              airports
                ?.filter((value) => {
                  if (srcValue == "BKK" && value.code == "DMK") return false;
                  return srcValue != value.code;
                })
                .map((value) => value.name) ?? []
            }
            onChange={(_, v: string | null) => {
              const airport = airports?.filter((value) => value.name == v);
              if (airport != null) setDestValue(airport[0]?.code);
            }}
            renderInput={(params) => <TextField {...params} label="ถึง" />}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ mb: 1 }} components={["DatePicker"]}>
              <DatePicker
                label="วันออกเดินทาง"
                minDate={currentYear}
                slotProps={{ textField: { size: "small" } }}
                value={goDate}
                onChange={(value) => setGoDate(value)}
              />
              {trip == "go-back" ? (
                <DatePicker
                  label="วันออกเดินทาง"
                  minDate={currentYear}
                  value={backDate}
                  onChange={(value) => setBackDate(value)}
                  slotProps={{ textField: { size: "small" } }}
                />
              ) : null}
            </DemoContainer>
          </LocalizationProvider>
          <Button
            size="small"
            variant="outlined"
            className="max-w-96"
            fullWidth={trip != "go-back"}
            onClick={apiSearchFlight}
          >
            <p className="py-1 px-16">ค้นหา</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default HomeDrawer;
