import { delay } from "@/app/function";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Autocomplete,
  Button,
  Divider,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Airport } from "@/client";
import { airportGetAirportsOptions } from "@/client/@tanstack/react-query.gen";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

type SeatClass = "economy" | "business" | "eco-premium" | "first-class";

type Trip = "onetrip" | "go-back";

interface BrowseFlightForm {
  tripeType: Trip;
  seatClass: SeatClass;
  promotionCode: string;
  originCode: string | null;
  destinationCode: string | null;
  departureDate: Dayjs | string | null;
  returnDate: Dayjs | string | null;
  passenger: {
    adult: number;
    kid: number;
    child: number;
  };
}

const BrowseFlightForm = ({
  drawerSetOpen,
  flights,
}: {
  drawerSetOpen?: (open: boolean) => void;
  flights?: BrowseFlightForm | null;
}) => {
  const navigate = useNavigate();
  const router = useRouterState();

  const seatClassOptions = useMemo<{ id: SeatClass; title: string }[]>(
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
      { id: 1, type: "adult", name: "ผู้ใหญ่", age: "อายุ 12 ปีขึ้นไป" },
      { id: 2, type: "kid", name: "เด็ก", age: "อายุ 2-11 ปี" },
      { id: 3, type: "child", name: "เด็กทารก", age: "อายุน้อยกว่า 2 ปี" },
    ],
    []
  );

  const airportsQuery = useSuspenseQuery(airportGetAirportsOptions({}));
  const airports = airportsQuery.data;

  const isHome = router.location.pathname == "/";
  const isNullQuery = flights != null;

  const form = useForm({
    defaultValues: {
      tripeType: isNullQuery ? flights.tripeType : "onetrip",
      seatClass: isNullQuery ? flights.seatClass : "economy",
      promotionCode: isNullQuery ? flights.promotionCode : "",
      originCode: isNullQuery ? flights.originCode : null,
      destinationCode: isNullQuery ? flights.destinationCode : null,
      departureDate: isHome ? null : dayjs(flights?.departureDate),
      returnDate: isHome ? null : dayjs(flights?.returnDate),
      passenger: {
        adult: isNullQuery ? flights.passenger.adult : 1,
        kid: isNullQuery ? flights.passenger.kid : 0,
        child: isNullQuery ? flights.passenger.child : 0,
      },
    } as BrowseFlightForm,
    onSubmit: ({ value }) => {
      const formData = { ...value };

      if (value.originCode === null || value.destinationCode === null) {
        return toast.error("Please select origin and destination");
      }

      if (value.departureDate == null) {
        return toast.error("Please select go Date");
      }

      if (value.tripeType == "go-back" && value.returnDate == null) {
        return toast.error("Please select back Date");
      }

      if (
        formData.departureDate != null &&
        dayjs.isDayjs(formData.departureDate)
      ) {
        formData.departureDate = formData.departureDate.format("YYYY-MM-DD");
      }

      if (formData.returnDate != null && dayjs.isDayjs(formData.returnDate)) {
        formData.returnDate = formData.returnDate.format("YYYY-MM-DD");
      }

      toast.promise(delay(1000), {
        loading: "Getting flight....",
        success: () => {
          if (drawerSetOpen) drawerSetOpen(false);

          navigate({
            to: "/flight",
            search: {
              ...formData,
            },
            // state: { flights: data },
          });
          return "Founded";
        },
        error: "Error!",
      });
    },
  });

  const currentYear = dayjs();

  const getAirportOptions = useCallback(
    (airports: Airport[], value: string | null) => {
      // const originCode = form.getFieldValue("originCode");
      // console.debug(originCode);
      return airports
        .filter(() => {
          // if (originCode == "BKK" && airport.code == "DMK") {
          //   return false;
          // }
          // return value !== airport.code;

          return true;
        })
        .map((airport) => ({
          id: airport.code,
          label: airport.name,
        }));
    },
    []
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isPassengerMenuOpen = Boolean(anchorEl);

  const handleOpenPassengerMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePassengerMenu = () => setAnchorEl(null);

  const [tripType, setTripType] = useState<Trip | undefined>(
    form.getFieldValue("tripeType")
  );
  const [seat, setSeat] = useState("ชั้นประหยัด");
  const [allPassengerCount, setAllPassengerCount] = useState(1);

  useEffect(() => {
    if (isNullQuery) {
      const passenger = flights.passenger;
      setAllPassengerCount(passenger.adult + passenger.kid + passenger.child);
    }
  }, [flights, isNullQuery]);

  useEffect(() => {
    form.store.subscribe(() => {
      const values = form.store.state.values;

      setTripType(values.tripeType);

      seatClassOptions.map((value) => {
        if (value.id == values.seatClass) {
          setSeat(value.title);
        }
      });
      const passenger = values.passenger;
      const sum = passenger.adult + passenger.child + passenger.kid;
      setAllPassengerCount(sum);
    });
  }, [form, seatClassOptions]);

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="max-w-7xl w-full m-auto flex flex-col p-4 gap-6">
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
            type="button"
            aria-controls={isPassengerMenuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isPassengerMenuOpen ? "true" : undefined}
            onClick={handleOpenPassengerMenu}
            className="px-4 py-2 cursor-pointer"
          >
            {allPassengerCount} ผู้โดยสาร {seat}
          </button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isPassengerMenuOpen}
            onClose={handleClosePassengerMenu}
          >
            <div className="flex flex-col gap-4 p-4">
              <form.Field
                name="passenger"
                children={(field) => {
                  return (
                    <div>
                      {peopleType.map((value) => {
                        const peopleCount = field.state.value[value.type];
                        return (
                          <div
                            key={value.id}
                            className="flex justify-between gap-4"
                          >
                            <div>
                              <p>{value.name}</p>
                              <p className="text-sm text-gray-500">
                                {value.age}
                              </p>
                            </div>

                            <div className="flex gap-4 items-center">
                              <Button
                                sx={{ padding: 0.5, minWidth: 32 }}
                                variant="outlined"
                                onClick={() => {
                                  if (peopleCount <= 0) return;

                                  field.setValue((prev) => ({
                                    ...prev,
                                    [value.type]: prev[value.type] - 1,
                                  }));
                                }}
                                disabled={
                                  (value.id == 1 && peopleCount <= 1) ||
                                  peopleCount <= 0
                                }
                              >
                                <RemoveIcon />
                              </Button>

                              <p className="text-1xl">{peopleCount}</p>

                              <Button
                                sx={{ padding: 0.5, minWidth: 32 }}
                                variant="outlined"
                                disabled={allPassengerCount >= 9}
                                onClick={() =>
                                  field.setValue((prev) => {
                                    return {
                                      ...prev,
                                      [value.type]: prev[value.type] + 1,
                                    };
                                  })
                                }
                              >
                                <AddIcon />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              />

              <Divider />
              <p>ประเภทที่นั่ง</p>
              <form.Field
                name="seatClass"
                children={(field) => {
                  return (
                    <div className="grid grid-cols-2 gap-4">
                      {seatClassOptions.map((value) => {
                        return (
                          <button
                            key={value.id}
                            className={`p-4 rounded-sm border-1 cursor-pointer ${value.id == field.state.value ? "border-orange-400 text-orange-400" : "border-gray-400"}`}
                            onClick={() => {
                              field.handleChange(value.id);
                            }}
                          >
                            {value.title}
                          </button>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </div>
          </Menu>
          {/* <form.Field
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
          /> */}
        </div>

        <div className="flex lg:flex-row flex-col items-center gap-4">
          <form.Field
            name="originCode"
            defaultValue={flights?.originCode}
            listeners={{
              onChange: ({ fieldApi }) => {
                fieldApi.form.setFieldValue("destinationCode", null);
              },
            }}
            children={(field) => {
              const { value } = field.state;
              const options = getAirportOptions(airports, value);

              return (
                <Autocomplete
                  size="small"
                  className="lg:max-w-56 w-full"
                  id={field.name}
                  options={options}
                  value={options.find((option) => option.id === value) || null}
                  onChange={(_, value) => {
                    field.handleChange(value ? value.id : null);
                  }}
                  // value={
                  //   field.state.value === null ? field.state.value : undefined
                  // }
                  onBlur={field.handleBlur}
                  renderInput={(params) => (
                    <TextField {...params} name={field.name} label="จาก" />
                  )}
                />
              );
            }}
          />

          <form.Field
            name="destinationCode"
            defaultValue={flights?.destinationCode}
            children={(field) => {
              const { value } = field.state;

              const options = getAirportOptions(airports, value);

              return (
                <Autocomplete
                  size="small"
                  className="lg:max-w-56 w-full"
                  value={options.find((option) => option.id === value) || null}
                  options={options}
                  onChange={(_, value) =>
                    field.handleChange(value ? value.id : null)
                  }
                  getOptionDisabled={(option) => {
                    if (option.id === form.getFieldValue("originCode")) {
                      return true;
                    }

                    return false;
                  }}
                  // value={
                  //   field.state.value === null ? undefined : field.state.value
                  // }
                  onBlur={field.handleBlur}
                  renderInput={(params) => (
                    <TextField {...params} label="ถึง" />
                  )}
                />
              );
            }}
          />

          <div className="flex gap-4 mb-2">
            <DemoContainer components={["DatePicker"]}>
              <form.Field
                name="departureDate"
                children={(field) => {
                  const value = field.state.value;
                  const defaultValue =
                    typeof value == "string" ? dayjs(value) : value;

                  return (
                    <DatePicker
                      label="วันออกเดินทาง"
                      minDate={currentYear}
                      slotProps={{ textField: { size: "small" } }}
                      value={defaultValue}
                      format="DD/MM/YYYY"
                      views={["day", "month", "year"]}
                      onChange={(value) =>
                        field.handleChange(value ? value : null)
                      }
                    />
                  );
                }}
              />
            </DemoContainer>
            <DemoContainer components={["DatePicker"]}>
              {tripType == "go-back" ? (
                <form.Field
                  name="returnDate"
                  children={(field) => {
                    const value = field.state.value;
                    const defaultValue =
                      typeof value == "string" ? dayjs(value) : value;

                    return (
                      <DatePicker
                        label="วันออกเดินทาง"
                        minDate={currentYear}
                        format="DD/MM/YYYY"
                        value={defaultValue}
                        onChange={(value) =>
                          field.handleChange(value ? value : null)
                        }
                        slotProps={{ textField: { size: "small" } }}
                      />
                    );
                  }}
                />
              ) : null}
            </DemoContainer>
          </div>

          <Button
            size="small"
            variant="outlined"
            className="w-full lg:w-full"
            type="submit"
            disabled={form.state.isSubmitting}
          >
            <p className="py-1 px-16">ค้นหา</p>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BrowseFlightForm;
