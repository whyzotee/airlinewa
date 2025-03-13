import { useAuthStore } from "@/lib/zustand";
import { TITLE_PATH } from "@/utils";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
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
          sx={{
            height: "4rem",
          }}
        >
          <div className="container w-full flex justify-between items-center mx-auto">
            <Link to="/">
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: "center",
                }}
              >
                <img src={TITLE_PATH} alt="title" className="h-10" />
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

              <Divider orientation="vertical" className="px-2 py-4" />
              <div className="ml-2">
                {authStore.auth ? (
                  <Button onClick={handleClickUserMenu}>
                    {authStore.auth.name}
                  </Button>
                ) : (
                  <Link to="/auth/login">{`Login/Register`}</Link>
                )}
              </div>
            </Stack>
          </div>
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
