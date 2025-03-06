import { apiGetAirportListApiAirportGetOptions } from "@/client/@tanstack/react-query.gen";
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
  TextField,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";

// interface Airport {
//   name: string;
//   address: string;
//   code: string;
// }

type SeatClass = "economy" | "business" | "eco-premium" | "first-class";

type Trip = "onetrip" | "go-back";

interface BrowseFlightForm {
  tripeType: Trip;
  seatClass: SeatClass;
  promotionCode: string;
  originCode: string | null;
  destinationCode: string | null;
  departureDate: string | null;
  returnDate: string | null;
  passenger: {
    adult: number;
    kid: number;
    child: number;
  };
}

interface Prop {
  open: boolean;
  setOpen: (open: boolean) => void;
  // airports: Array<Airport> | null;
}

const HomeDrawer: FC<Prop> = ({ open, setOpen }) => {
  const seatsClass = useMemo<{ id: SeatClass; title: string }[]>(
    () => [
      { id: "economy", title: "ชั้นประหยัด" },
      { id: "business", title: "ชั้นธุรกิจ" },
      { id: "eco-premium", title: "ชั้นประหยัดพรีเมี่ยม" },
      { id: "first-class", title: "ชั้นหนึ่ง" },
    ],
    []
  );

  const tripOptions = useMemo<{ id: Trip; title: string }[]>(
    () => [
      {
        id: "onetrip",
        title: "เที่ยวเดียว",
      },
      {
        id: "go-back",
        title: "ไปกลับ",
      },
    ],
    []
  );

  const peopleType = useMemo(
    () => [
      { id: 1, name: "ผู้ใหญ่", age: "อายุ 12 ปีขึ้นไป" },
      { id: 2, name: "เด็ก", age: "อายุ 2-11ปี" },
      { id: 3, name: "เด็กทารก", age: "อายุน้อยกว่า 2ปี" },
    ],
    []
  );

  const airportsQuery = useSuspenseQuery(
    apiGetAirportListApiAirportGetOptions()
  );
  const airports = airportsQuery.data;

  // console.debug(airports);

  const form = useForm({
    defaultValues: {
      tripeType: "onetrip",
      seatClass: "economy",
      promotionCode: "",
      originCode: null,
      destinationCode: null,
      departureDate: null,
      returnDate: null,
      passenger: {
        adult: 0,
        kid: 0,
        child: 0,
      },
    } as BrowseFlightForm,
  });

  // const [trip, setTrip] = useState("onetrip");
  // const [seatClass, setSeatClass] = useState("eco");
  // const [promoCode, setPromoCode] = useState("");
  // const [srcValue, setSrcValue] = useState<string | null>(null);
  // const [destValue, setDestValue] = useState<string | null>(null);
  // const [goDate, setGoDate] = useState<Dayjs | null>(null);
  // const [backDate, setBackDate] = useState<Dayjs | null>(null);
  // const [peopleCountAll, setPeopleCountAll] = useState([1, 1, 0, 0]);

  const navigate = useNavigate();
  const currentYear = dayjs();

  // const handleChange = (event: SelectChangeEvent) => {
  //   setTrip(event.target.value as string);
  // };

  // const peopleBTN = (id: number, type: boolean) => {
  //   setPeopleCountAll((prev) => {
  //     const newCount = [...prev];

  //     if (type) {
  //       if (newCount[0] >= 9) return prev;
  //       newCount[0] += 1;
  //       newCount[id] += 1;
  //     } else {
  //       if (newCount[0] <= 1 || newCount[id] <= 0) return prev;
  //       newCount[0] -= 1;
  //       newCount[id] -= 1;
  //     }

  //     return newCount;
  //   });
  // };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isPassengerMenuOpen = Boolean(anchorEl);

  const handleOpenPassengerMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePassengerMenu = () => setAnchorEl(null);

  // const apiSearchFlight = async () => {
  //   if (srcValue === null || destValue === null) {
  //     return toast.error("Please select origin and destination");
  //   }

  //   if (goDate == null) {
  //     return toast.error("Please select go Date");
  //   }

  //   if (trip == "go-back" && backDate == null) {
  //     return toast.error("Please select back Date");
  //   }

  //   const formatData = {
  //     tripType: trip,
  //     seatClass: seatClass,
  //     peopleCount: peopleCountAll,
  //     src: srcValue,
  //     dest: destValue,
  //     departureDate: goDate?.toISOString(),
  //     returnDate: backDate?.toISOString(),
  //   };

  //   console.log(formatData);

  //   await toast.promise(
  //     APISearchFlight(
  //       formatData.src,
  //       formatData.dest,
  //       formatData.departureDate
  //     ),
  //     {
  //       loading: "Getting flight....",
  //       success: (data) => {
  //         navigate({
  //           to: "/flight",
  //           search: {
  //             ...formatData,
  //           },
  //           // state: { flights: data },
  //         });
  //         return "Founded";
  //       },
  //       error: "Error!",
  //     }
  //   );
  // };

  return (
    <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="max-w-6xl w-full m-auto flex flex-col p-4 gap-6">
          <div className="flex lg:flex-row flex-col gap-4 items-center">
            <form.Field
              name="tripeType"
              children={(field) => {
                return (
                  <Select
                    labelId="demo-simple-select-label"
                    name={field.name}
                    value={field.state.value}
                    label="Trip"
                    onChange={(evt) =>
                      field.handleChange(evt.target.value as Trip)
                    }
                    size="small"
                    className="lg:w-fit w-full"
                  >
                    {tripOptions.map((trip, i) => (
                      <MenuItem key={i} value={trip.id}>
                        {trip.title}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />

            <button
              id="basic-button"
              aria-controls={isPassengerMenuOpen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isPassengerMenuOpen ? "true" : undefined}
              // onClick={handleClick}
              className="px-4 py-2 cursor-pointer"
            >
              {/* {peopleCountAll[0]} ผู้โดยสาร{" "}
              {flightClass.filter((value) => value.id == seatClass)[0].title} */}
            </button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isPassengerMenuOpen}
              onClose={() => {
                console.log("Hello World");
                // handleClose();
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
                          // onClick={() => peopleBTN(value.id, false)}
                          // disabled={
                          //   (value.id == 1 && peopleCountAll[value.id] <= 1) ||
                          //   !peopleCountAll[value.id]
                          // }
                        >
                          <RemoveIcon />
                        </Button>

                        {/* <p className="text-1xl">{peopleCountAll[value.id]}</p> */}

                        <Button
                          sx={{ padding: 0.5, minWidth: 32 }}
                          variant="outlined"
                          // onClick={() => peopleBTN(value.id, true)}
                          // disabled={peopleCountAll[0] >= 9}
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
                  {seatsClass.map((value) => {
                    return (
                      <button
                        key={value.id}
                        // className={`p-4 rounded-sm border-1 cursor-pointer ${seatsClass == value.id ? "border-orange-400 text-orange-400" : "border-gray-400"}`}
                        // onClick={() => setSeatClass(value.id)}
                      >
                        {value.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Menu>

            <form.Field
              name="promotionCode"
              children={(field) => {
                return (
                  <TextField
                    id="promotion"
                    label="Promotion"
                    variant="outlined"
                    size="small"
                    value={field.state.value}
                    onChange={(evt) => field.handleChange(evt.target.value)}
                    className="lg:w-fit w-full"
                  />
                );
              }}
            />
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <form.Field
              name="destinationCode"
              children={(field) => {
                const { value } = field.state;

                const options = airports.filter((airport) => {
                  if (value == "BKK" && airport.code == "DMK") {
                    return false;
                  }

                  return value != airport.code;
                });

                return (
                  <Autocomplete
                    size="small"
                    className="lg:max-w-56 w-full"
                    id={field.name}
                    options={options}
                    // options={
                    //   airports
                    //     ?.filter((value) => {
                    //       if (destValue == "BKK" && value.code == "DMK") return false;
                    //       return destValue != value.code;
                    //     })
                    //     .map((value) => value.name) ?? []
                    // }
                    // onChange={(_, v: string | null) => {
                    //   const airport = airports?.filter(
                    //     (value) => value.name == v
                    //   );
                    //   if (airport != null) setSrcValue(airport[0]?.code);
                    // }}
                    renderInput={(params) => (
                      <TextField {...params} name={field.name} label="จาก" />
                    )}
                  />
                );
              }}
            />

            <form.Field
              name="originCode"
              children={(field) => {
                const { value } = field.state;
                const options =
                  airports
                    .filter((value) => {
                      if (value == "BKK" && value.code == "DMK") return false;
                      return value != value.code;
                    })
                    .map((value) => value.name) ?? [];

                return (
                  <Autocomplete
                    size="small"
                    className="lg:max-w-56 w-full"
                    options={options}
                    onChange={(_, v: string | null) => {
                      const airport = airports?.filter(
                        (value) => value.name == v
                      );
                      // if (airport != null) setDestValue(airport[0]?.code);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="ถึง" />
                    )}
                  />
                );
              }}
            />

            <div className="flex gap-4 mb-0.5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="วันออกเดินทาง"
                    minDate={currentYear}
                    slotProps={{ textField: { size: "small" } }}
                    value={goDate}
                    onChange={(value) => setGoDate(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
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
            </div>

            <Button
              size="small"
              variant="outlined"
              className="w-full lg:w-fit"
              fullWidth={trip != "go-back"}
              onClick={apiSearchFlight}
            >
              <p className="py-1 px-16">ค้นหา</p>
            </Button>
          </div>
        </div>
      </form>
    </Drawer>
  );
};

export default HomeDrawer;
