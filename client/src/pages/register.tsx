import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, TextField } from "@mui/material";

import logo from "/logo.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const registerBTN = () => {};

  return (
    <main className="w-screen h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-6">
        <Avatar
          className="rounded-xl"
          alt="log"
          src={logo}
          sx={{ width: 96, height: 96 }}
        />
        <h1 className="text-3xl font-bold">Sign up</h1>
        <p className="text-gray-500">free and get any flight after register!</p>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          size="small"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="con_password"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          size="small"
          value={conPassword}
          onChange={(e) => setConPassword(e.target.value)}
        />
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={registerBTN}
        >
          Sign up
        </Button>
        <p className="text-gray-500">Already have account?</p>
        <Button variant="outlined" fullWidth onClick={() => navigate("/login")}>
          Log in
        </Button>
      </div>
    </main>
  );
};

export default Register;
