import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Divider,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { updateFormData } from "../slices/checkoutContact";

const contryCode = ["TH +66", "CN +88"];

export default function CheckoutContact() {
  const dispatch = useDispatch();
  const checkout = useSelector((state: RootState) => state.checkoutContact);

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
        <div className="w-full flex justify-between items-center">
          <h1>รายละเอียดการติดต่อ</h1>
          <div
            className={`text-sm text-white rounded-lg px-2 mr-4 ${
              checkout.isValid ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <p className={checkout.isValid ? "text-green-500" : "text-red-500"}>
              {checkout.isValid ? "เสร็จสิ้น" : "ยังไม่เสร็จ"}
            </p>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Divider />
        <div className="mt-4 grid grid-cols-6 gap-4">
          <Select
            value={checkout.contactData.prefix}
            onChange={(e) =>
              dispatch(updateFormData({ prefix: e.target.value }))
            }
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="mr">Mr</MenuItem>
            <MenuItem value="mrs">Mrs</MenuItem>
            <MenuItem value="miss">Miss</MenuItem>
            <MenuItem value="ms">Ms</MenuItem>
          </Select>

          <TextField
            id="contact_name"
            label="Name"
            variant="outlined"
            className="col-span-2"
            value={checkout.contactData.name}
            onChange={(e) => dispatch(updateFormData({ name: e.target.value }))}
          />
          <TextField
            id="contact_lastname"
            label="Lastname"
            variant="outlined"
            className="col-span-3"
            value={checkout.contactData.lastname}
            onChange={(e) =>
              dispatch(updateFormData({ lastname: e.target.value }))
            }
          />
          <TextField
            id="contact_email"
            label="E-Mail"
            variant="outlined"
            className="col-span-2"
            value={checkout.contactData.email}
            onChange={(e) =>
              dispatch(updateFormData({ email: e.target.value }))
            }
          />
          <Autocomplete
            disablePortal
            options={contryCode}
            value={checkout.contactData.countryCode}
            onChange={(_, v) => dispatch(updateFormData({ countryCode: v! }))}
            renderInput={(params) => (
              <TextField {...params} label="Contry Code" />
            )}
            className="col-span-2"
          />
          <NumericFormat
            id="contact_phonenumber"
            label="Phone Number"
            maxLength={12}
            customInput={TextField}
            className="col-span-2"
            value={checkout.contactData.phoneNumber}
            onChange={(e) =>
              dispatch(updateFormData({ phoneNumber: e.target.value }))
            }
          />
          <h1 className="text-xs text-gray-500 col-span-5">
            เนื่องจากเราเป็นเพียงผู้ให้บริการแพลตฟอร์มการสำรองที่นั่ง
            จึงไม่สามารถออกใบกำกับภาษีเพื่อจุดประสงค์ต่างๆ ได้
            กรุณาตรวจสอบข้อมูลเพิ่มเติมได้จาก T&C ของเราและ FAQ
          </h1>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
