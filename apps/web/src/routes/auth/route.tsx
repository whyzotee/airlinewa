import { LOGO_PATH } from "@/utils";
import { Avatar } from "@mui/material";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Fragment } from "react";

export const Route = createFileRoute("/auth")({
  loader: ({ context }) => {
    if (context.auth) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Fragment>
      <main className="w-screen h-screen">
        <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-6">
          <Avatar
            className="rounded-xl"
            alt="log"
            src={LOGO_PATH}
            sx={{ width: 96, height: 96 }}
          />

          <Outlet />
        </div>
      </main>
    </Fragment>
  );
}
