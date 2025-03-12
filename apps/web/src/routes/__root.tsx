import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Fragment, lazy, Suspense } from "react";

const loadDevtools = () =>
  Promise.all([
    import("@tanstack/router-devtools"),
    import("@tanstack/react-query-devtools"),
  ]).then(([{ TanStackRouterDevtools }, { ReactQueryDevtools }]) => {
    return {
      default: () => (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      ),
    };
  });

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
  const TanStackDevtools = import.meta.env.PROD
    ? () => null
    : lazy(loadDevtools);

  return (
    <Fragment>
      <Outlet />

      <Suspense>
        <TanStackDevtools />
      </Suspense>
    </Fragment>
  );
}
