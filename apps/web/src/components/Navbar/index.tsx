import { useAuthStore } from "@/lib/zustand";
import { LOGO_PATH } from "@/utils";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { lazy, MouseEvent, Suspense, useState } from "react";

const UserMenu = lazy(() => import("./UserMenu"));

export default function NavBar() {
  const authStore = useAuthStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userMenuOpen = Boolean(anchorEl);

  const handleClickUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ boxShadow: 3, px: "1.5rem" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            height: "4rem",
          }}
        >
          <Link to="/">
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
              }}
            >
              <Avatar
                alt="logo"
                src={LOGO_PATH}
                sx={{ width: 48, height: 48 }}
              />

              <Typography variant="h4" fontWeight="700">
                AirlineWa
              </Typography>
            </Stack>
          </Link>

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Stack direction="row" spacing={2}>
              <Link to="/app/booking">
                <Typography>{"Purchases"}</Typography>
              </Link>
              <Link to="/app/check-in">
                <Typography>{"Check-in"}</Typography>
              </Link>
              <Link to="/app/flight-status">
                <Typography>{"Flight status"}</Typography>
              </Link>
            </Stack>

            <Divider orientation="vertical" />
            {authStore.auth ? (
              <Button onClick={handleClickUserMenu}>
                {authStore.auth.name}
              </Button>
            ) : (
              <Link to="/auth/login">{`Login/Register`}</Link>
            )}
          </Stack>
        </Stack>
      </Box>

      <Suspense>
        <UserMenu
          anchorEl={anchorEl}
          handleClose={handleCloseUserMenu}
          open={userMenuOpen}
        />
      </Suspense>
    </>
  );
}
