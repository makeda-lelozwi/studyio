"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button, Typography } from "@mui/material";
import TabComponent from "../../../components/TabComponent";


const Dashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const tabs = ["All courses", "Create course"];
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Read the user data cookie and parse the JSON data
    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}");
    const token = parsedUserData.authToken;
    console.log(parsedUserData);
    setUserName(parsedUserData.userName || null);

    async function fetchCourseData() {
      try {
        const response = await fetch("http://localhost:1337/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const courseResponse = await response.json();
        setCourses(courseResponse.data);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    }
    fetchCourseData();
  }, []);

  console.log(courses);

  if (!userName) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userName ? (
        <>
          <Typography variant={"h6"} component={"h1"}>
            Welcome to your dashboard,{" "}
            <span style={{ color: "red" }}>{userName}</span>!
          </Typography>
          <Button variant="contained">Sign out</Button>

          <TabComponent tabs={tabs} courses={courses}></TabComponent>
        </>
      ) : (
        <Typography>You need to login.</Typography>
      )}
    </>
  );
};

export default Dashboard;
