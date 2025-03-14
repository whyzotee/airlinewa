import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export const Route = createFileRoute("/app/flight-status")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { date } = Route.useSearch() as { date?: string };
  const parms = Route.useParams() as { flightNumber?: string };

  // const findFlightMutation = useMutation({
  //   ...flightFindFlightMutation(),
  // });

  const form = useForm({
    defaultValues: {
      flightNumber: parms.flightNumber ?? "",
      date: date ? date : dayjs().format("YYYY-MM-DD"),
    },
    onSubmit: ({ value }) => {
      const flightNumber = value.flightNumber.trim();
      const date = value.date.trim();

      if (!flightNumber) {
        toast.error("Please fill Flight number!");
        return;
      }

      if (!date) {
        toast.error("Please select date!");
        return;
      }

      navigate({
        to: "/app/flight-status/$flightNumber",
        params: {
          flightNumber,
        },
        search: {
          date,
        },
      });

      // const findFlight = findFlightMutation.mutateAsync({
      //   path: {
      //     flight_number: value.flightNumber.trim(),
      //   },
      //   query: {
      //     date,
      //   },
      // });

      // toast.promise(findFlight, {
      //   loading: "Find flight...",
      //   success: (value) => {
      //     setFlightDate(value);
      //     navigate({
      //       to: "/app/flight-status/$flightNumber",
      //       params: {
      //         flightNumber,
      //       },
      //     });
      //     return "Flight found.";
      //   },
      //   error: (err) => {
      //     console.error(err);
      //     navigate({
      //       to: "/app/flight-status/$flightNumber",
      //       params: {
      //         flightNumber,
      //       },
      //     });

      //     return "Flight not found!";
      //   },
      // });
    },
  });
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">สถานะเที่ยวบิน</Typography>
      <Typography variant="body2" color="textSecondary">
        Search by flight number or route for flight status information.
      </Typography>

      <Stack spacing={3}>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit();
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <form.Field
              name="flightNumber"
              children={(field) => {
                return (
                  <TextField
                    name={field.name}
                    id={field.name}
                    label="หมายเลขเที่ยวบิน"
                    variant="outlined"
                    onBlur={field.handleBlur}
                    onChange={(evt) =>
                      field.handleChange(evt.currentTarget.value)
                    }
                    value={field.state.value}
                    fullWidth
                  />
                );
              }}
            />

            <form.Field
              name="date"
              children={(field) => {
                return (
                  <TextField
                    name={field.name}
                    id={field.name}
                    type="date"
                    label="วันเดินทาง"
                    InputLabelProps={{ shrink: true }}
                    onBlur={field.handleBlur}
                    onChange={(evt) => {
                      const date = evt.currentTarget.value;
                      // console.debug(date);
                      field.handleChange(date);
                    }}
                    value={field.state.value}
                    variant="outlined"
                    fullWidth
                  />
                );
              }}
            />

            <Button
              variant="contained"
              type="submit"
              color="error"
              fullWidth
              sx={{ fontSize: 18 }}
              // disabled={findFlightMutation.isPending}
            >
              ค้นหาเที่ยวบิน
            </Button>
          </Box>
        </form>

        <Outlet />
      </Stack>
    </Box>
  );
}
