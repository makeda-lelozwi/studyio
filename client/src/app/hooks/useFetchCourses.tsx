"use client";
import { useEffect, useReducer } from "react";
import { InitAction, InitState } from "../types";

const reducer = (prevState: InitState, action: InitAction) => {
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
const useFetchCourses = (initialData: InitState) => {
  const [courses, dispatchCourses] = useReducer(reducer, initialData);

  useEffect(() => {
    fetch("http://localhost:1337/api/courses?populate=cover")
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

  return courses.data;
};

export default useFetchCourses;
