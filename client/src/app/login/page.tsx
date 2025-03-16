import { Grid2, Box, TextField, Button } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Grid2>
      <div>
        <h3>Welcome to Study.io</h3>
        <p>Enter your email and password to share your courses.</p>

        <Box component="form" autoComplete="off">
          <div>
            <p>Email Address </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
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
            />
          </div>

          <h3>New to Study.io?</h3>
          <Button variant="text">Register Here</Button>
        </Box>
      </div>
    </Grid2>
  );
};

export default Login;
