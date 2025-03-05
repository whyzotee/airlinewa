import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: "/auth/login",
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
