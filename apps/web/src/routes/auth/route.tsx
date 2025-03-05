import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Fragment } from "react";

export const Route = createFileRoute("/auth")({
  loader: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/flight",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}
