import { BookingModel } from "@/client";
import { bookingBookingsOptions } from "@/client/@tanstack/react-query.gen";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo } from "react";

export const Route = createFileRoute("/app/booking/")({
  component: RouteComponent,
});

function RouteComponent() {
  const bookingsQuery = useSuspenseQuery(bookingBookingsOptions());
  const bookings = bookingsQuery.data;

  // const rows = [{ id: 1, date: "Snow", departure: "Jon", origin: 14 }];

  const columns = useMemo<GridColDef<BookingModel>[]>(
    () => [
      // {
      //   field: "id",
      // },
      {
        field: "date",
        headerName: "Date",
        width: 150,
        renderCell: (parms) => {
          return dayjs(parms.value).format("ddd, D MMM BBBB");
        },
      },
      {
        field: "departure",
        headerName: "Depart",
        valueGetter: (value) => dayjs(value).format("hh:mm"),
      },
      {
        field: "origin",
        headerName: "Origin",
      },
      {
        field: "arrive",
        headerName: "Arrive",
        valueGetter: (value) => dayjs(value).format("hh:mm"),
      },
      {
        field: "destination",
        headerName: "Destination",
      },
      {
        field: "bookingNumber",
        headerName: "Booking Number",
        width: 150,
        valueGetter: (_, row) => row.id,
      },
    ],
    []
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={bookings}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
