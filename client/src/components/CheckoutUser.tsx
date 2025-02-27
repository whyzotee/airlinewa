import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessibilityIcon from "@mui/icons-material/Accessibility";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateFormData } from "../app/reducers/checkoutUser";

const options = [{ label: "Thailand" }, { label: "Singapore" }];

const type = ["Identity Card", "Passport"];

const UserDetail = () => {
  const dispatch = useDispatch();
  const formData = useSelector(
    (state: RootState) => state.checkoutUser.formData
  );

  return (
    <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="flex gap-4">
          <AccessibilityIcon />
          <h1>ผู้ใหญ่ 1</h1>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Divider />
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-xs text-gray-400">อายุ 12 ปีขึ้นไป</p>

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
              disablePortal
              options={options}
              value={{ label: formData.country }}
              onChange={(_, v) =>
                dispatch(updateFormData({ country: v?.label }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
            <TextField
              id="brith"
              label="Brithday"
              variant="outlined"
              value={formData.birthday}
              onChange={(e) =>
                dispatch(updateFormData({ birthday: e.target.value }))
              }
            />
          </div>

          <p className="text-sm font-bold">ประเภทเอกสารการเดินทาง</p>

          <div className="grid grid-cols-3 gap-4">
            <Autocomplete
              disablePortal
              options={type}
              value={formData.identityType.type}
              onChange={(_, v) =>
                dispatch(
                  updateFormData({
                    identityType: {
                      ...formData.identityType,
                      type: v ?? "",
                    },
                  })
                )
              }
              renderInput={(params) => (
                <TextField {...params} label="Identity Card/Passport" />
              )}
            />

            <TextField
              id="number"
              label="Number"
              variant="outlined"
              value={formData.identityType.number}
              className={
                formData.identityType.type == "Passport" ? "" : "col-span-2"
              }
              onChange={(e) =>
                dispatch(
                  updateFormData({
                    identityType: {
                      ...formData.identityType,
                      number: e.target.value,
                    },
                  })
                )
              }
            />

            {formData.identityType.type === "Passport" ? (
              <TextField
                id="outdate"
                label="Out Date"
                variant="outlined"
                value={formData.identityType.out_date}
                onChange={(e) =>
                  dispatch(
                    updateFormData({
                      identityType: {
                        ...formData.identityType,
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
