import { APILogin } from "@/services/authentication";
import { LOGO_PATH } from "@/utils";
import { Avatar, Button, TextField } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginBTNPress = async () => {
    if (loading) return;

    setLoading(true);
    toast.promise(APILogin(username, password), {
      loading: "Loading...",
      success: (data) => {
        localStorage.setItem("token", data);
        window.close();
        return null;
      },
      error: (err) => {
        console.log(err);
        setLoading(false);
        return err.message;
      },
    });
  };

  return (
    <main className="w-screen h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-6">
        <Avatar
          className="rounded-xl"
          alt="log"
          src={LOGO_PATH}
          sx={{ width: 96, height: 96 }}
        />
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="text-gray-500">
          you can continue your flight after log in
        </p>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          size="small"
          disabled={loading}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          size="small"
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={loginBTNPress}
        >
          Log in
        </Button>
        <p className="text-gray-500">No have any account?</p>
        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            navigate({
              to: "/auth/register",
            })
          }
        >
          Register
        </Button>
      </div>
    </main>
  );
}
