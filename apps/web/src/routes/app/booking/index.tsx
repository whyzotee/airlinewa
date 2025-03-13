import { BookingResponse } from "@/client";
import { bookingBookingsOptions } from "@/client/@tanstack/react-query.gen";
import { Box, Button, Stack } from "@mui/material";
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
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  // @ts-ignore
  const q = String(search.q) ? String(search.q ?? "upcoming") : "upcoming";

  // const rows = [{ id: 1, date: "Snow", departure: "Jon", origin: 14 }];

  const columns = useMemo<GridColDef<BookingResponse>[]>(
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
      },
      {
        field: "origin",
        headerName: "Origin",
        valueGetter: (value) => value[0],
      },
      {
        field: "arrive",
        headerName: "Arrive",
      },
      {
        field: "destination",
        headerName: "Destination",
        valueGetter: (value) => value[0],
      },
      {
        field: "bookingNumber",
        headerName: "Booking Number",
        width: 150,
        valueGetter: (_, row) => row.id,
      },
      {
        field: "status",
        headerName: "Status",
        renderCell: (params) => {
          const { value } = params;

          if (!value) {
            return "Unknow";
          }

          switch (value) {
            case "CONFIRMED":
              return "Confirmed";

            case "AVALIABLE":
              return "Avaliable";

            default:
              return value;
          }
        },
      },
    ],
    []
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <Button
            variant={q === "upcoming" ? "contained" : "outlined"}
            onClick={() => {
              navigate({ to: "/app/booking", search: { q: "upcoming" } });
            }}
          >
            Upcoming
          </Button>
          <Button
            variant={q === "past" ? "contained" : "outlined"}
            onClick={() => {
              navigate({ to: "/app/booking", search: { q: "past" } });
            }}
          >
            Past
          </Button>
        </Stack>

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
      </Stack>
    </Box>
  );
}
