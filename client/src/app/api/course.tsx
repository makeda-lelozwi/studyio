"use client";
import { BASE_URL } from "@/constant";
import { getUserData } from "@/helper";
import { CourseResponse } from "@/types";
import qs from "qs";

const userId = getUserData().user_id; //getting user info from Cookies
const queries = qs.stringify(
  userId
    ? {
        filters: {
          user_id: {
            $eq: userId,
          },
        },
        populate: "cover",
      }
    : {
        populate: "cover", // no filters, return all courses with covers
      },
  {
    encodeValuesOnly: true,
  }
);

//fetch all courses (incl for a specific for a user )
export const getCourses = async (): Promise<CourseResponse | null> => {
  try {
    let data: CourseResponse | null;
    const response = await fetch(`${BASE_URL}/courses?${queries}`);
    if (response.ok) {
      data = await response.json();
    } else {
      data = null;
    }
    return data;
  } catch (error) {
    console.error("Fetch courses error: ", error);
    return null;
  }
};
