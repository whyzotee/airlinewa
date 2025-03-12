import { LOGO_PATH } from "@/utils";
import { Avatar } from "@mui/material";
import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <div className="h-16 p-2 shadow-lg">
      <div className="flex flex-row px-4 justify-between">
        <div>
          <Link to="/">
            <div className="container m-auto flex text-center items-center mx-4">
              <Avatar
                alt="log"
                src={LOGO_PATH}
                sx={{ width: 48, height: 48 }}
              />
              <h1 className="text-3xl font-bold">Airlinewa</h1>
            </div>
          </Link>
        </div>

        <div>User</div>
      </div>
    </div>
  );
}
