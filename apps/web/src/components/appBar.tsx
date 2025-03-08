import { LOGO_PATH } from "@/utils";
import { Avatar } from "@mui/material";
import { Link } from "@tanstack/react-router";

const AppBar = () => {
  return (
    <div className="h-16 p-2 shadow-lg">
      <Link to="/">
        <div className="container m-auto flex items-center gap-4">
          <Avatar alt="log" src={LOGO_PATH} sx={{ width: 48, height: 48 }} />
          <h1 className="text-3xl font-bold">Airlinewa</h1>
        </div>
      </Link>
    </div>
  );
};

export default AppBar;
