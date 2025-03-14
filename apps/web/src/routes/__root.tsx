import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

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
    email: string;
  } | null;
};

const Navbar = lazy(() => import("@/components/Navbar"));

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
});

function RootComponent() {
  const TanStackDevtools = import.meta.env.PROD
    ? () => null
    : lazy(loadDevtools);

  return (
    <main className="font-noto-thai">
      <Navbar />
      <div className="container mx-auto my-8">
        {/* <div className="flex justify-between text-sm">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/">หน้าแรก</Link>
              <Typography>เลือกเที่ยวบิน</Typography>
              <Typography>รายละเอียดผู้โดยสาร</Typography>
              <Typography sx={{ color: "text.primary" }}>ชำระเงิน</Typography>
            </Breadcrumbs>
          </div> */}

        <Outlet />

        <Suspense>{/* <TanStackDevtools /> */}</Suspense>
      </div>
    </main>
  );
}
