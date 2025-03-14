import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/app/flight-status/")({
  component: RouteComponent,
});

function RouteComponent() {
  return null;
}
