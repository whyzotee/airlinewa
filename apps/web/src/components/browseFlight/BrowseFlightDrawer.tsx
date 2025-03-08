import { Drawer } from "@mui/material";
import { FC } from "react";
import BrowseFlightForm from "./BrowseFlightDrawerForm";

interface Prop {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BrowseFlightDrawer: FC<Prop> = ({ open, setOpen }) => {
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

  return (
    <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
      <BrowseFlightForm drawerSetOpen={setOpen} />
    </Drawer>
  );
};

export default BrowseFlightDrawer;
