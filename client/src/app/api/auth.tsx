"use client";

import { BASE_URL } from "@/constant";
import { AuthResponse, User } from "@/types";
import { removeUserData } from "@/helper";

export const login = async (
  identifier: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    let data: AuthResponse | null;
    //send username or email to strapi login endpoint
    const response = await fetch(`${BASE_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      data = null;
      throw new Error("Login failed");
    } else {
      data = await response.json();
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const getUserData = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const signup = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};

export const logout = () => {
  return removeUserData();
};
