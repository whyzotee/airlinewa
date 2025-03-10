import AccessibilityIcon from "@mui/icons-material/Accessibility";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { updateFormData } from "../slices/checkoutUser";

const options = [{ label: "Thailand" }, { label: "Singapore" }];

const UserDetail = () => {
  const dispatch = useDispatch();
  const { formData, isValid } = useSelector(
    (state: RootState) => state.checkoutUser
  );

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
          <div className="flex gap-4">
            <AccessibilityIcon />
            <h1>ผู้ใหญ่ 1</h1>
          </div>
          <div
            className={`text-sm text-white rounded-lg px-2 mr-4 ${
              isValid ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <p className={isValid ? "text-green-500" : "text-red-500"}>
              {isValid ? "เสร็จสิ้น" : "ยังไม่เสร็จ"}
            </p>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Divider />
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-xs text-gray-500">อายุ 12 ปีขึ้นไป</p>

          <ToggleButtonGroup
            exclusive
            color="primary"
            value={formData.gender}
            onChange={(_, v) => dispatch(updateFormData({ gender: v }))}
            aria-label="Platform"
          >
            <ToggleButton value="man">ชาย</ToggleButton>
            <ToggleButton value="woman">หญิง</ToggleButton>
          </ToggleButtonGroup>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                dispatch(updateFormData({ name: e.target.value }))
              }
            />
            <TextField
              id="lastname"
              label="Lastname"
              variant="outlined"
              value={formData.lastname}
              onChange={(e) =>
                dispatch(updateFormData({ lastname: e.target.value }))
              }
            />
            <Autocomplete
              className="pt-2"
              disablePortal
              options={options}
              value={{ label: formData.country }}
              onChange={(_, v) =>
                dispatch(updateFormData({ country: v?.label ?? "" }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
            <DemoContainer
              components={["DatePicker", "DatePicker", "DatePicker"]}
            >
              <DatePicker
                // maxDate={dayjs("2025/12/31")}
                label="Brithday"
                format="DD/MM/YYYY"
                views={["day", "month", "year"]}
                value={
                  formData.birthday != "" ? dayjs(formData.birthday) : null
                }
                onChange={(value) =>
                  dispatch(updateFormData({ birthday: value?.toISOString() }))
                }
              />
            </DemoContainer>
          </div>

          <p className="text-sm font-bold">ประเภทเอกสารการเดินทาง</p>

          <div className="grid grid-cols-3 gap-4">
            <Select
              displayEmpty
              value={formData.identity.type}
              onChange={(e) =>
                dispatch(
                  updateFormData({
                    identity: {
                      ...formData.identity,
                      type: e.target.value,
                    },
                  })
                )
              }
            >
              <MenuItem value="id_card">Identity Card</MenuItem>
              <MenuItem value="passport">Passport</MenuItem>
            </Select>

            <NumericFormat
              id="number"
              label="Number"
              variant="outlined"
              customInput={TextField}
              value={formData.identity.number}
              className={
                formData.identity.type == "passport" ? "" : "col-span-2"
              }
              onChange={(e) =>
                dispatch(
                  updateFormData({
                    identity: {
                      ...formData.identity,
                      number: e.target.value,
                    },
                  })
                )
              }
            />

            {formData.identity.type === "passport" ? (
              <TextField
                id="outdate"
                label="Out Date"
                variant="outlined"
                value={formData.identity.out_date}
                onChange={(e) =>
                  dispatch(
                    updateFormData({
                      identity: {
                        ...formData.identity,
                        out_date: e.target.value,
                      },
                    })
                  )
                }
              />
            ) : null}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserDetail;
