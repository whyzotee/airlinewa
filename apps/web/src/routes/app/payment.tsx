import AppBar from "@/components/appBar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/payment")({
  loader: ({ location }) => {
    return {
      data: location.state,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <main className="font-noto-thai">
      <AppBar />
      <h1>Payment</h1>
      <h1>{JSON.stringify(data)}</h1>
      {/* <FlightDetail id={""} info={undefined} /> */}
    </main>
  );
}
