"use client";
import useFetchCourses from "../hooks/useFetchCourses";
import { initValue } from "@/constant";
import CourseList from "../components/CourseList";

const Dashboard = () => {
  const courses = useFetchCourses(initValue);
  return (
    <>
      <CourseList courses={courses.data}></CourseList>
    </>
  );
};

export default Dashboard;
