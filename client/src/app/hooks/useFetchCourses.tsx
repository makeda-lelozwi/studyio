"use client";
import { useEffect, useReducer } from "react";
import { InitAction, InitState } from "../../types";
import { getCourses } from "../api/course";
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
    const fetchCourses = async () => {
      try {
        const courseResponse = await getCourses();
        if (courseResponse?.data) {
          dispatchCourses({
            type: "successful",
            payload: courseResponse.data,
            message: "",
            isLoading: false,
          });
        }
      } catch {
        dispatchCourses({
          type: "failed",
          payload: [],
          message: "Failed to fetch courses",
          isLoading: false,
        });
      }
    };

    fetchCourses();
  }, []);
  return courses;
};

export default useFetchCourses;
