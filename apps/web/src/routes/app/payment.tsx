import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/payment")({
  loader: ({ location }) => {
    return {
      data: location.state.data,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  console.log(data.state);

  return (
    <main className="font-noto-thai">
      <h1>Payment</h1>
      <h1>{JSON.stringify(data.state)}</h1>
    </main>
  );
}
