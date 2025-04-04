"use client";
import { SyntheticEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid2, Typography } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { signup } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();
    await signup(username, email, password);
  };
  
  return (
    <Grid2
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
      container
    >
      <div>
        <Typography variant={"h6"} component={"h2"}>
          {" "}
          Get started with Study.io
        </Typography>

        <Typography variant={"h6"}>
          Sign in and start creating courses now!
        </Typography>

        <form action="" onSubmit={handleRegister}>
          <div>
            <p>Name </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <p>Email Address </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
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
            Sign Up
          </Button>
          <h3>Already with us?</h3>
          <Button variant="text" href="/login" sx={{ margin: "8px" }}>
            Login Here
          </Button>
        </form>
      </div>
    </Grid2>
  );
};

export default SignUp;
