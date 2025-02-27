import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import logo from "/logo.jpg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
} from "@mui/material";

const FlightDetail = (props: any) => {
  let data = props.data;

  return (
    <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Avatar alt="log" src={logo} sx={{ width: 56, height: 56 }} />
        <div className="ml-4 flex flex-col">
          <h1>
            {data[2]} - {data[3]}
          </h1>
          <p>พฤ. 27 ก.พ. | 20:35-21:55 | เที่ยวบินตรง</p>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Divider />
        <h1 className="mt-4">ขาไป , 27 ก.พ.</h1>

        <div className="flex p-8">
          <div className="flex flex-col justify-between">
            <div>
              <p>20:35</p>
              <p className="text-sm text-gray-500">27 ก.พ.</p>
            </div>
            <p className="text-sm text-gray-500">1 ชม. 25 นาที</p>
            <div>
              <p>20:35</p>
              <p className="text-sm text-gray-600">27 ก.พ.</p>
            </div>
          </div>

          <div className="h-38 inline-flex flex-col justify-center items-center my-4 gap-4">
            <FlightTakeoffIcon />
            <Divider orientation="vertical" />
            <FlightLandIcon />
          </div>

          <div className="flex flex-col justify-between ">
            <div>
              <p>{data[2]}</p>
              <p className="text-sm text-gray-600">{data[2]}</p>
            </div>
            <div className="flex gap-2 bg-gray-100 items-center rounded-full px-4 py-2">
              <img className="h-6" alt="log" src={logo} />
              <p className="text-sm text-gray-500">Airlinewa, AW 0888</p>
            </div>
            <div>
              <p>{data[3]}</p>
              <p className="text-sm text-gray-600">{data[3]}</p>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default FlightDetail;
