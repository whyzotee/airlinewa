import { useAuthStore } from "@/lib/zustand";
import { Divider, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import toast from "react-hot-toast";

type Prop = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
};

export default function UserMenu({ anchorEl, open, handleClose }: Prop) {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const handleLogout = useCallback(() => {
    toast.success("Logout success!");
    navigate({
      to: "/",
    });

    authStore.logout();

    handleClose();
  }, [authStore, handleClose, navigate]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClick={handleClose}
      slotProps={{
        list: {
          "aria-labelledby": "basic-button",
        },
      }}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
}
