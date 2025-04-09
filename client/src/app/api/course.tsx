"use client";
import { BASE_URL } from "@/constant";
import { getToken, getUserData } from "@/helper";
import { CourseEntry, CourseResponse } from "@/types";
import qs from "qs";

const userId = getUserData().user_id; //getting user info from Cookies
const token = getToken();
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

//create new courses
export const createNewCourse = async (
  title: string,
  description: string,
  cover?: number | null,
  price?: number | null
) => {
  try {
    let data;
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: { title, description, price, userId, cover },
      }),
    });

    if (response.ok) {
      data = await response.json();
    } else {
      data = null;
      throw new Error("Course creation failed.");
    }
    return data;
  } catch (error) {
    console.error("Error creating course:", error);
    return null;
  }
};

export const updateCourse = async (
  documentId: string,
  title: string,
  description: string,
  cover?: number | null,
  price?: number | null
): Promise<CourseResponse | null> => {
  const data: CourseEntry | null = {};
  if (title != null) data.title = title;
  if (description != null) data.description = description;
  if (price != null) data.price = price;
  if (userId != null) data.user_id = userId;
  if (cover != null) data.cover = cover;

  try {
    const response = await fetch(`${BASE_URL}/courses/${documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      const dataResponse = await response.json();
      return dataResponse;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating course:", error);
    return null;
  }
};
