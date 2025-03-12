import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Fragment } from "react";

type Context = {
  queryClient: QueryClient;
  auth: {
    userId: string;
    name: string;
  } | null;
};

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Fragment>
      <Outlet />

      <ReactQueryDevtools initialIsOpen={false} />
    </Fragment>
  );
}
