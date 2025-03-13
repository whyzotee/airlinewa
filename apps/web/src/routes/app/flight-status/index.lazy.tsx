import { FlightResponse } from "@/client";
import { flightFindFlightMutation } from "@/client/@tanstack/react-query.gen";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/app/flight-status/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedDate, setSelectedDate] = useState(2);
  const [flightData, setFlightDate] = useState<FlightResponse | null>(null);

  const findFlightMutation = useMutation(flightFindFlightMutation());

  const form = useForm({
    defaultValues: {
      flightNumber: "",
      date: "",
    },
    onSubmit: ({ value }) => {
      const findFlight = findFlightMutation.mutateAsync({
        path: {
          flight_number: value.flightNumber,
        },
        query: {
          date: value.date,
        },
      });

      toast.promise(findFlight, {
        loading: "Find flight...",
        success: (value) => {
          setFlightDate(value);
          return "Flight found.";
        },
        error: (err) => {
          console.error(err);

          return "Flight not found!";
        },
      });
    },
  });

  const handleDateChange = (event, newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">สถานะเที่ยวบิน</Typography>
      <Typography variant="body2" color="textSecondary">
        Search by flight number or route for flight status information.
      </Typography>

      {/* {JSON.stringify(flightData)} */}

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
                  onChange={(evt) =>
                    field.handleChange(evt.currentTarget.value)
                  }
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
          >
            ค้นหาเที่ยวบิน
          </Button>
        </Box>
      </form>

      {flightData ? (
        <>
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="body1">การออกเดินทาง</Typography>

            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Typography>{flightData.route.origin[2]}</Typography>
                <Typography color="textSecondary">
                  {flightData.route.origin[1]}
                </Typography>
                <Typography color="textSecondary">Main Terminal</Typography>
                <Typography>
                  Departure: {flightData.route.schedule.departure}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography textAlign="center">
                  {flightData.route.id}
                </Typography>
                <Typography textAlign="center" color="success.main">
                  {flightData.route.status}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography>{flightData.route.destination[2]}</Typography>
                <Typography color="textSecondary">
                  {flightData.route.destination[1]}
                </Typography>
                <Typography color="textSecondary">
                  Multiple Terminals
                </Typography>
                <Typography>
                  Arrival: {flightData.route.schedule.arrival}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </>
      ) : null}
    </Box>
  );
}
