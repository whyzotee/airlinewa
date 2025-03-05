import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Fragment } from "react";

type Context = {
  queryClient: QueryClient;
  user: {
    id: string;
  } | null;
  token: string | null;
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
