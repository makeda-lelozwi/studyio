"use client";
import React from "react";
import Button from "@mui/material/Button";
import useFetchCourses from "../hooks/useFetchCourses";
import CourseList from "../components/CourseList";
import { Grid2, Typography } from "@mui/material";
import { initValue } from "@/constant";

const Home = () => {
 
  const courses = useFetchCourses(initValue);
  return (
    <>
      <Grid2 container spacing={2} margin={2}>
        <Typography variant={"h6"} component={"h1"}>
          Study.io Courses
        </Typography>
        <Button variant="outlined" href="/login">
          Login
        </Button>
        <Button variant="outlined" href="/signup">
          Create account
        </Button>
      </Grid2>

      <CourseList courses={courses}/>
    </>
  );
};

export default Home;
