"use client";
import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
const HomePage = () => {
  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6" component={"h1"}>
        Create and share courses with anyone, anywhere.
      </Typography>
      <Button variant="outlined" href="/login">
        JOIN STUDY.IO
      </Button>
    </Grid2>
  );
};

export default HomePage;
