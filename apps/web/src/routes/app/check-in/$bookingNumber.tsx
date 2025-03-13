import { bookingBookingOptions } from "@/client/@tanstack/react-query.gen";
import { Box } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/app/check-in/$bookingNumber")({
  loader: async ({ context, params }) => {
    const { bookingNumber } = params;
    try {
      await context.queryClient.ensureQueryData(
        bookingBookingOptions({
          path: {
            booking_number: bookingNumber,
          },
        })
      );
    } catch (err) {
      console.error(err);
      throw notFound();
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <p>Booking not found!</p>,
});

function RouteComponent() {
  const { bookingNumber } = Route.useParams();

  const bookingQuery = useSuspenseQuery(
    bookingBookingOptions({
      path: {
        booking_number: bookingNumber,
      },
    })
  );

  const booking = bookingQuery.data;

  return <Box>{JSON.stringify(booking)}</Box>;
}
