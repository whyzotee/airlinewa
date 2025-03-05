import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Fragment } from "react";

type Context = {
  user: {
    id: string;
  } | null;
};

export const Route = createRootRouteWithContext<Context>()({
  loader: () => {
    const token = localStorage.getItem("token");
    console.debug(token);
    // if(token) {
    //   context.
    // }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}
