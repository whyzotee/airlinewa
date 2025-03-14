import { flightFlightOptions } from "@/client/@tanstack/react-query.gen";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/app/flight-status/$flightNumber")({
  loader: async ({ context, params, location }) => {
    const { flightNumber } = params;
    const { date } = location.search as { date?: string };

    try {
      const flight = await context.queryClient.ensureQueryData(
        flightFlightOptions({
          path: { flight_number: flightNumber },
          query: {
            from_date: date,
          },
        })
      );
      console.debug("flight", flight);
    } catch (err) {
      console.error(err);
      throw notFound();
    }
  },
  component: RouteComponent,
  notFoundComponent: RouteNotFoundComponent,
  pendingComponent: RoutePendingComponent,
});

function RouteComponent() {
  const { flightNumber } = Route.useParams();
  const { date } = Route.useSearch() as { date?: string };

  const flightQuery = useSuspenseQuery(
    flightFlightOptions({
      path: {
        flight_number: flightNumber,
      },
      query: {
        from_date: date,
      },
    })
  );
  const flight = flightQuery.data!;

  return (
    <Box>
      <Paper sx={{ mt: 3, p: 2 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              px: "1.5rem",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {"Departure"}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {"Arrival"}
            </Typography>
          </Stack>

          <Divider />

          <Grid
            container
            sx={{
              p: "1.5rem",
            }}
          >
            <Grid item xs={5}>
              <Typography variant="h4" fontWeight={600}>
                {flight.route.origin[2]}
              </Typography>
              <Typography color="textSecondary">
                {flight.route.origin[1]}
              </Typography>
              <Typography color="textSecondary">Main Terminal</Typography>
              <Typography>
                Departure: {flight.route.schedule.departure}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography textAlign="center">{flight.route.id}</Typography>
              <Typography textAlign="center" color="success.main">
                {flight.route.status}
              </Typography>
            </Grid>

            <Grid
              item
              xs={5}
              sx={{
                direction: "rtl",
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                {flight.route.destination[2]}
              </Typography>
              <Typography color="textSecondary">
                {flight.route.destination[1]}
              </Typography>
              <Typography color="textSecondary">Multiple Terminals</Typography>
              <Typography>Arrival: {flight.route.schedule.arrival}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
}

function RoutePendingComponent() {
  return <Skeleton variant="rectangular" height={200} />;
}

function RouteNotFoundComponent() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h4">Oops!</Typography>
          <Typography>
            We can't find any flights matching your request. Check your details
            and try again!
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
