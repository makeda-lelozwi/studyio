"use client";
import Cookies from "js-cookie";
import { AuthResponse } from "./types";

export const getUserData = () => {
  const userDataCookie = Cookies.get("userData");
  const parsedUserData = JSON.parse(userDataCookie || "{}");
  return parsedUserData;
};

export const setUserDataToCookies = (data: AuthResponse | null) => {
  const userData = {
    authToken: data?.jwt,
    userName: data?.user.username,
    user_id: data?.user.id,
    isLoggedIn: data?.user.confirmed,
  };

  Cookies.set("userData", JSON.stringify(userData));
  console.log("user data", userData);
};

export const removeUserData = () => {
  Cookies.remove("userData");
};

export const getToken = () => {
  return getUserData().authToken;
};
