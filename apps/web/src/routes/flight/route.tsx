import { Breadcrumbs, Typography } from "@mui/material";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Fragment } from "react";

export const Route = createFileRoute("/flight")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Fragment>
      <div className="flex justify-between text-sm">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">หน้าแรก</Link>
          <Typography>เลือกเที่ยวบิน</Typography>
          <Typography sx={{ color: "text.primary" }}>
            รายละเอียดผู้โดยสาร
          </Typography>
        </Breadcrumbs>
      </div>

      <Outlet />
    </Fragment>
  );
}
