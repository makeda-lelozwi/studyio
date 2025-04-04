"use client";
import { Grid2, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuthContext();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(password, identifier);
  };

  return (
    <Grid2
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
      container
      spacing={2}
    >
      <Grid2>
        <Typography variant={"h6"} component={"h2"}>
          Study.io
        </Typography>
        <Typography variant={"h6"} component={"h2"}>
          Enter your email and password to view your courses.
        </Typography>
      </Grid2>
      <Grid2>
        <form onSubmit={handleLogin}>
          <div>
            <p>Username </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Email Address or Username"
              variant="outlined"
              value={identifier}
              autoComplete="off"
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div>
            <p>Password </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" variant="contained" sx={{ margin: "8px" }}>
            Login
          </Button>
          <h3>New to Study.io?</h3>
          <Button variant="text" href="/signup" sx={{ margin: "8px" }}>
            Register Here
          </Button>
        </form>
      </Grid2>
    </Grid2>
  );
};

export default Login;
