"use client";
import { useState, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { Button, Grid2, Typography } from "@mui/material";
import { CourseData } from "@/app/types";
import AlertComponent from "../components/AlertComponent";
import { useRouter } from "next/navigation";
import CourseList from "../components/CourseList";

interface initState {
  data: CourseData[];
  isError: boolean;
  message: string;
  isLoading: boolean;
}
interface initAction {
  type: string;
  message: string;
  payload: CourseData[];
  isLoading: boolean;
}

const Dashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const tabs = ["All courses", "Create course"];

  const router = useRouter();

  const reducer = (prevState: initState, action: initAction) => {
    switch (action.type) {
      case "successful":
        return {
          ...prevState,
          data: action.payload,
          isError: false,
          message:
            action.payload.length === 0
              ? "No courses found"
              : "Successfully loaded courses",
        };
      case "failed":
        return {
          ...prevState,
          data: action.payload,
          isError: true,
          message: action.message,
        };
      case "loading":
        return {
          ...prevState,
          isLoading: action.isLoading,
        };
      default:
        throw new Error(`Unhandled action type`);
    }
  };
  const initValue: initState = {
    data: [],
    isError: false,
    message: "",
    isLoading: false,
  };
  const [courses, dispatchCourses] = useReducer(reducer, initValue);

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}");
    const token = parsedUserData.authToken;
    const user_id = parsedUserData.user_id;

    setUserName(parsedUserData.userName || null);

    fetch(
      `http://localhost:1337/api/courses?filters[user_id][$eq]=${user_id}&populate=cover`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => {
        let data;
        if (res.status === 200) {
          data = await res.json();
          dispatchCourses({
            type: "successful",
            payload: data.data,
            message: "",
            isLoading: false,
          });
        } else {
          data = await res.json();
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.log(error.message, error);
        dispatchCourses({
          type: "failed",
          message: error.message,
          payload: [],
          isLoading: false,
        });
      })
      .finally(() => {
        console.log("Courses are loaded.");
      });
  }, []);
  const handleLogOut = () => {
    Cookies.remove("userData");
    router.back();
  };
  return (
    <>
      {userName ? (
        <Grid2 container spacing={2} margin={2}>
          <Typography variant={"h6"} component={"h1"}>
            Welcome to your dashboard, {userName}!
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="contained" color="error" onClick={handleLogOut}>
              Log Out
            </Button>
            <Button variant="contained" href="/create">
              Ceate a new Course
            </Button>
          </Grid2>
        </Grid2>
      ) : (
        <Typography variant={"h6"} component={"h1"}>
          Loading Dashboard...
        </Typography>
      )}
      <AlertComponent
        message={courses.message}
        isError={courses.isError}
      ></AlertComponent>
      <CourseList tabs={tabs} courses={courses.data}></CourseList>
    </>
  );
};

export default Dashboard;
