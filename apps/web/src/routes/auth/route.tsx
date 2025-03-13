import { TITLE_PATH } from "@/utils";
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
      <main>
        <div className="flex flex-col justify-center items-center gap-4 p-6">
          <img className="mt-32 h-16" alt="log" src={TITLE_PATH} />
          <Outlet />
        </div>
      </main>
    </Fragment>
  );
}
