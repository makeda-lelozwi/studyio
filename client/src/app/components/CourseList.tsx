"use client";
import Box from "@mui/material/Box";
import Course from "./Course";
import { CourseData } from "@/app/types";
import { Grid2 } from "@mui/material";

interface TabPropData {
  tabs: string[];
  courses: CourseData[];
}

const CourseList = ({ courses }: TabPropData) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid2 container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {courses.map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </Grid2>
    </Box>
  );
};

export default CourseList;
