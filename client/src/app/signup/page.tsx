"use client";
import React, { SyntheticEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid2 } from "@mui/material";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <Grid2>
      <div>
        <h3>Get started with Study.io</h3>
        <p>Sign in and start creating courses now!</p>

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
            />
          </div>
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
          <h3>Already with us?</h3>
          <Button variant="text" href="/login">
            Login Here
          </Button>
        </form>
      </div>
    </Grid2>
  );
};

export default SignUp;
