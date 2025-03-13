import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/app/flight-status/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedDate, setSelectedDate] = useState(2);

  const handleDateChange = (event, newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">สถานะเที่ยวบิน</Typography>
      <Typography variant="body2" color="textSecondary">
        Search by flight number or route for flight status information.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField label="หมายเลขเที่ยวบิน" variant="outlined" fullWidth />
        <TextField
          type="date"
          label="วันเดินทาง"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="error">
          ค้นหาเที่ยวบิน
        </Button>
      </Box>

      <Tabs value={selectedDate} onChange={handleDateChange} centered>
        <Tab label="11 Mar 2025" />
        <Tab label="12 Mar 2025" />
        <Tab label="13 Mar 2025" />
        <Tab label="14 Mar 2025" />
        <Tab label="15 Mar 2025" />
      </Tabs>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="body1">การออกเดินทาง</Typography>

        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography>BKK</Typography>
            <Typography color="textSecondary">
              Suvarnabhumi International Airport
            </Typography>
            <Typography color="textSecondary">Main Terminal</Typography>
            <Typography>Departure: 19:45</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign="center">FD 8103</Typography>
            <Typography textAlign="center" color="success.main">
              On Time
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>CNX</Typography>
            <Typography color="textSecondary">
              Chiang Mai International Airport
            </Typography>
            <Typography color="textSecondary">Multiple Terminals</Typography>
            <Typography>Arrival: 21:00</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
