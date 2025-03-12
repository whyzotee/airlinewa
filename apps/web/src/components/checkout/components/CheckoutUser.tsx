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

const options = [{ label: "Thailand" }, { label: "Singapore" }];

interface Props {
  userNumber: number;
  userData: any;
  updateUserDetails: (index: number, field: string, value: any) => void;
}

const UserDetail: React.FC<Props> = ({ userNumber, userData, updateUserDetails }) => {
  const isFormValid = () => {
    return (
      userData.gender &&
      userData.name &&
      userData.lastname &&
      userData.country &&
      userData.birthday &&
      userData.identity.type &&
      userData.identity.number &&
      (userData.identity.type !== "passport" || userData.identity.out_date)
    );
  };

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
            <h1>ผู้โดยสาร {userNumber}</h1>
          </div>
          {/* ✅ แสดงสถานะว่ากรอกครบหรือยัง */}
          <div
            className={`text-sm text-white rounded-lg px-2 mr-4 ${
              isFormValid() ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <p className={isFormValid() ? "text-green-500" : "text-red-500"}>
              {isFormValid() ? "เสร็จสิ้น" : "ยังไม่เสร็จ"}
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
            value={userData.gender}
            onChange={(_, v) => updateUserDetails(userNumber - 1, "gender", v)}
            aria-label="Gender"
          >
            <ToggleButton value="man">ชาย</ToggleButton>
            <ToggleButton value="woman">หญิง</ToggleButton>
          </ToggleButtonGroup>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Name"
              variant="outlined"
              value={userData.name}
              onChange={(e) => updateUserDetails(userNumber - 1, "name", e.target.value)}
            />
            <TextField
              label="Lastname"
              variant="outlined"
              value={userData.lastname}
              onChange={(e) => updateUserDetails(userNumber - 1, "lastname", e.target.value)}
            />

            <Autocomplete
              disablePortal
              options={options}
              getOptionLabel={(option) => option.label}
              value={options.find((option) => option.label === userData.country) || null}
              onChange={(_, v) => updateUserDetails(userNumber - 1, "country", v ? v.label : "")}
              renderInput={(params) => <TextField {...params} label="Country" />}
            />

            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Birthday"
                format="DD/MM/YYYY"
                views={["day", "month", "year"]}
                value={userData.birthday ? dayjs(userData.birthday) : null}
                onChange={(value) => updateUserDetails(userNumber - 1, "birthday", value?.toISOString() || "")}
              />
            </DemoContainer>
          </div>

          <p className="text-sm font-bold">ประเภทเอกสารการเดินทาง</p>

          <div className="grid grid-cols-3 gap-4">
            {/* เลือกประเภทเอกสาร */}
            <Select
              displayEmpty
              value={userData.identity?.type || ""} // ✅ ป้องกัน undefined
              onChange={(e) =>
                updateUserDetails(userNumber - 1, "identity", {
                  ...userData.identity,
                  type: e.target.value,
                })
              }
            >
              <MenuItem value="id_card">Identity Card</MenuItem>
              <MenuItem value="passport">Passport</MenuItem>
            </Select>

            {/* กรอกหมายเลขเอกสาร */}
            <NumericFormat
              label="Number"
              variant="outlined"
              customInput={TextField}
              value={userData.identity?.number || ""}
              className={userData.identity?.type === "passport" ? "" : "col-span-2"} // ✅ ให้ขยายเต็มเมื่อไม่ใช่ passport
              onChange={(e) =>
                updateUserDetails(userNumber - 1, "identity", {
                  ...userData.identity,
                  number: e.target.value,
                })
              }
            />

            {/* กรอกวันหมดอายุเอกสาร (แสดงเฉพาะ passport) */}
            {userData.identity?.type === "passport" && (
              <TextField
                label="Out Date"
                variant="outlined"
                value={userData.identity?.out_date || ""}
                onChange={(e) =>
                  updateUserDetails(userNumber - 1, "identity", {
                    ...userData.identity,
                    out_date: e.target.value,
                  })
                }
              />
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserDetail;
