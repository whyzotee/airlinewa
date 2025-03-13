import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/app/check-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const form = useForm({
    defaultValues: {
      bookingNumber: "",
      name: "",
    },
    onSubmit: ({ value }) => {
      if (!value.bookingNumber) {
        toast.error("Booking number invalid!");
        return;
      }

      if (!value.name) {
        toast.error("Name or Surname invalid!");
        return;
      }

      navigate({
        to: "/app/check-in/$bookingNumber",
        params: {
          bookingNumber: value.bookingNumber,
        },
      });
    },
  });

  return (
    <Box
      sx={{
        mx: "auto",
        // p: 3,
      }}
    >
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit();
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Search a booking to check in
            </Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              Enter your flight details to start. For AirlinwWa flights, check
              in at the respective airline’s website.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={4}
            sx={{
              alignItems: "center",
            }}
          >
            <form.Field
              name="bookingNumber"
              children={(field) => {
                return (
                  <TextField
                    name={field.name}
                    id={field.name}
                    label="Booking number or PNR"
                    variant="outlined"
                    onBlur={field.handleBlur}
                    onChange={(evt) =>
                      field.handleChange(evt.currentTarget.value)
                    }
                    fullWidth
                    // helperText="Enter your 6-digit alphanumeric AirAsia booking number"
                  />
                );
              }}
            />

            <form.Field
              name="name"
              children={(field) => {
                return (
                  <TextField
                    name={field.name}
                    id={field.name}
                    label="First name or Surname"
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
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              fullWidth
            >
              Start check-in
            </Button>
          </Stack>

          <Typography
            variant="caption"
            color="textSecondary"
            // align="center"
            // gutterBottom
          >
            By continuing this check-in, you confirm that you have read and
            agreed to our{" "}
            <Link href="#" color="inherit">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Stack>
      </form>
    </Box>
  );
}
