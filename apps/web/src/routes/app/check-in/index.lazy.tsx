import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/app/check-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box
      sx={{
        mx: "auto",
        // p: 3,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Search a booking to check in
          </Typography>

          <Typography variant="body2" color="textSecondary" gutterBottom>
            Enter your flight details to start. For AirlinwWa flights, check in
            at the respective airline’s website.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={4}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            label="Booking number or PNR"
            variant="outlined"
            fullWidth
            // helperText="Enter your 6-digit alphanumeric AirAsia booking number"
          />

          <TextField
            label="First name or Surname"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="success" size="large" fullWidth>
            Start check-in
          </Button>
        </Stack>

        <Typography
          variant="caption"
          color="textSecondary"
          // align="center"
          // gutterBottom
        >
          By continuing this check-in, you confirm that you have read and agreed
          to our{" "}
          <Link href="#" color="inherit">
            Privacy Policy
          </Link>
          .
        </Typography>
      </Stack>
    </Box>
  );
}
