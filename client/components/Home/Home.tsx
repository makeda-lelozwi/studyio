"use client";
import { Button, Typography } from "@mui/material";
import React from "react";
const HomePage = () => {
  return (
    <>
      <Typography variant="h6" component={"h1"}>
        Create and share courses with anyone, anywhere.
      </Typography>
      <Button href="/login">JOIN STUDY.IO</Button>
    </>
  );
};

export default HomePage;
