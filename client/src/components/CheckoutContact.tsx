import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Divider,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateFormData } from "../app/reducers/checkoutContact";

const type = ["Mr", "Mrs", "Miss", "Ms"];
const contryCode = ["TH +66", "CN +88"];

const CheckoutContact = () => {
  const dispatch = useDispatch();
  const dataContact = useSelector((state: RootState) => state.checkoutContact);

  return (
    <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h1>รายละเอียดการติดต่อ</h1>
      </AccordionSummary>

      <AccordionDetails>
        <Divider />
        <div className="mt-4 grid grid-cols-6 gap-4">
          <Autocomplete
            disablePortal
            options={type}
            value={dataContact.prefix}
            onChange={(_, v) => dispatch(updateFormData({ prefix: v! }))}
            renderInput={(params) => <TextField {...params} label="Prefix" />}
            className="col-span-1"
          />
          <TextField
            id="contact_name"
            label="Name"
            variant="outlined"
            className="col-span-2"
            value={dataContact.name}
            onChange={(e) => dispatch(updateFormData({ name: e.target.value }))}
          />
          <TextField
            id="contact_lastname"
            label="Lastname"
            variant="outlined"
            className="col-span-3"
            value={dataContact.lastname}
            onChange={(e) =>
              dispatch(updateFormData({ lastname: e.target.value }))
            }
          />
          <TextField
            id="contact_email"
            label="E-Mail"
            variant="outlined"
            className="col-span-2"
            value={dataContact.email}
            onChange={(e) =>
              dispatch(updateFormData({ email: e.target.value }))
            }
          />
          <Autocomplete
            disablePortal
            options={contryCode}
            value={dataContact.countryCode}
            onChange={(_, v) => dispatch(updateFormData({ countryCode: v! }))}
            renderInput={(params) => (
              <TextField {...params} label="Contry Code" />
            )}
            className="col-span-2"
          />
          <TextField
            // error={dataContact.phoneNumber != ""}
            id="contact_phonenumber"
            label="Phone Number"
            variant="outlined"
            className="col-span-2"
          />
          <h1 className="text-xs text-gray-400 col-span-5">
            เนื่องจากเราเป็นเพียงผู้ให้บริการแพลตฟอร์มการสำรองที่นั่ง
            จึงไม่สามารถออกใบกำกับภาษีเพื่อจุดประสงค์ต่างๆ ได้
            กรุณาตรวจสอบข้อมูลเพิ่มเติมได้จาก T&C ของเราและ FAQ
          </h1>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CheckoutContact;
