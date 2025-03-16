import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid2 } from "@mui/material";

const SignUp = () => {
  return (
    <Grid2>
        <div>
          <h3>Get started with Study.io</h3>
          <p>Sign in and start creating courses now!</p>

          <Box component="form" autoComplete="off">
            <div>
              <p>Name </p>{" "}
              <TextField
                required
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
            </div>
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

            <h3>Already with us?</h3>
            <Button variant="text">Login Here</Button>
          </Box>
        </div>
      
    </Grid2>
  );
};

export default SignUp;
