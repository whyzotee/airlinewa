import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
} from "@mui/material";
import logo from "/logo.png";

interface Schedule {
  id: string;
  dayOfWeek: number[];
  departure: string;
  arrive: string;
  duration: number;
}

interface Info {
  origin: number[];
  destination: number[];
  schedule: Schedule;
  date: string;
}

const FlightDetail = ({
  id,
  info,
  back_info,
}: {
  id: string;
  info: Info;
  back_info: Info | undefined;
}) => {
  const schedule = info.schedule;

  const d_hour = Math.floor(schedule.duration / 60);
  const t_hour = d_hour != 0 ? `${d_hour} ชม ` : null;

  const d_min = schedule.duration % 60;
  const t_min = d_min != 0 ? `${d_min} นาที ` : null;

  const travelDate = new Date(info.date);
  const day = travelDate.getDate();

  const t_day = travelDate.toLocaleDateString("th-TH", {
    weekday: "short",
  });

  const month = travelDate.toLocaleDateString("th-TH", {
    month: "short",
  });

  let schedule_back;
  let d_hour_back;
  let t_hour_back;
  let d_min_back;
  let t_min_back;
  let travelDate_back;
  let day_back;
  let t_day_back;
  let month_back;

  if (back_info != undefined) {
    schedule_back = back_info.schedule;
    d_hour_back = Math.floor(schedule_back.duration / 60);
    t_hour_back = d_hour_back != 0 ? `${d_hour_back} ชม ` : null;

    d_min_back = schedule_back.duration % 60;
    t_min_back = d_min_back != 0 ? `${d_min_back} นาที ` : null;

    travelDate_back = new Date(back_info.date);
    day_back = travelDate_back.getDate();

    t_day_back = travelDate_back.toLocaleDateString("th-TH", {
      weekday: "short",
    });

    month_back = travelDate_back.toLocaleDateString("th-TH", {
      month: "short",
    });
  }

  return (
    <Accordion
      slotProps={{ transition: { unmountOnExit: true } }}
      elevation={0}
      sx={{
        border: 2,
        borderRadius: 2,
        borderColor: "#00000015",
        "&.MuiAccordion-root:before": {
          backgroundColor: "white",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="flex justify-between w-full pr-8">
          <div className="flex">
            <Avatar alt="log" src={logo} sx={{ width: 56, height: 56 }} />
            <div className="ml-4 flex flex-col">
              <h1>
                {info.origin[2]} - {info.destination[2]}
              </h1>
              <p className="text-sm text-gray-500">
                {t_day} {day} {month} |{schedule.departure} - {schedule.arrive}{" "}
                | เที่ยวบินตรง
              </p>
            </div>
          </div>

          {back_info != undefined ? (
            <>
              <Divider orientation="vertical" />

              <div className="flex">
                <Avatar alt="log" src={logo} sx={{ width: 56, height: 56 }} />
                <div className="ml-4 flex flex-col">
                  <h1>
                    {back_info.origin[2]} - {back_info.destination[2]}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {t_day_back} {day_back} {month_back} |
                    {schedule_back!.departure} - {schedule.arrive} |
                    เที่ยวบินตรง
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Divider />
        <h1 className="mt-4">
          ขาไป , {day} {month}
        </h1>

        <div className="flex p-8">
          <div className="flex flex-col justify-between">
            <div>
              <p>{schedule.departure}</p>
              <p className="text-sm text-gray-500">
                {day} {month}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {t_hour} {t_min}
            </p>
            <div>
              <p>{schedule.arrive}</p>
              <p className="text-sm text-gray-600">
                {day} {month}
              </p>
            </div>
          </div>

          <div className="h-38 inline-flex flex-col justify-center items-center my-4 gap-4">
            <FlightTakeoffIcon />
            <Divider orientation="vertical" />
            <FlightLandIcon />
          </div>

          <div className="flex flex-col justify-between ">
            <div>
              <p>{info.origin[2]}</p>
              <p className="text-sm text-gray-600">{info.origin[0]}</p>
            </div>
            <div className="flex gap-2 bg-gray-100 items-center rounded-full px-4 py-2">
              <img className="h-6" alt="log" src={logo} />
              <p className="text-sm text-gray-500">Airlinewa, {id}</p>
            </div>
            <div>
              <p>{info.destination[2]}</p>
              <p className="text-sm text-gray-600">{info.destination[0]}</p>
            </div>
          </div>
        </div>

        {back_info != undefined ? (
          <>
            <h1 className="mt-4">
              ขากลับ , {day_back} {month_back}
            </h1>

            <div className="flex p-8">
              <div className="flex flex-col justify-between">
                <div>
                  <p>{schedule_back!.departure}</p>
                  <p className="text-sm text-gray-500">
                    {day_back} {month_back}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {t_hour_back} {t_min_back}
                </p>
                <div>
                  <p>{schedule_back!.arrive}</p>
                  <p className="text-sm text-gray-600">
                    {day_back} {month_back}
                  </p>
                </div>
              </div>

              <div className="h-38 inline-flex flex-col justify-center items-center my-4 gap-4">
                <FlightTakeoffIcon />
                <Divider orientation="vertical" />
                <FlightLandIcon />
              </div>

              <div className="flex flex-col justify-between ">
                <div>
                  <p>{back_info.origin[2]}</p>
                  <p className="text-sm text-gray-600">{back_info.origin[0]}</p>
                </div>
                <div className="flex gap-2 bg-gray-100 items-center rounded-full px-4 py-2">
                  <img className="h-6" alt="log" src={logo} />
                  <p className="text-sm text-gray-500">
                    Airlinewa, {back_info.id}
                  </p>
                </div>
                <div>
                  <p>{back_info.destination[2]}</p>
                  <p className="text-sm text-gray-600">
                    {back_info.destination[0]}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
};

export default FlightDetail;
