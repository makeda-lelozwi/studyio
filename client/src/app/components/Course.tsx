import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CourseData } from "@/types";

interface CourseProps {
  course: CourseData;
}

const Course = ({ course }: CourseProps) => {
  const imageUrl = course.cover?.url
    ? `http://localhost:1337${course.cover.url}`
    : "";
  return (
    <Card sx={{ maxWidth: 345, margin: 5 }}>
      <CardHeader title={course.title} subheader="September 14, 2016" />
      <CardMedia component="img" height="194" image={imageUrl} alt="" />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {course.description}
        </Typography>
        <Typography variant="body2">
          {course.price ? "R" + course.price : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Course;
