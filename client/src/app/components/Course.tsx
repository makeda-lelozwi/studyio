"use client";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CourseProps } from "@/app/types";

const Course = ({ course }: CourseProps) => {
  const imageUrl = course.cover?.url
    ? `http://localhost:1337${course.cover.url}`
    : "";

  // Format the date using JavaScript's Date object
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formattedDate = course.publishedAt
    ? formatDate(course.createdAt)
    : "Unknown Date";
  return (
    <Card sx={{ margin: 2, width: 345 }}>
      <CardHeader
        title={course.title}
        subheader={`Created on ${formattedDate}`}
      />
      {imageUrl ? (
        <CardMedia component="img" height="194" image={imageUrl} alt="" />
      ) : (
        <Typography>No Image Loaded</Typography>
      )}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {course.price ? "R" + course.price : ""}
        </Typography>
        <Typography variant="body2">{course.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default Course;
