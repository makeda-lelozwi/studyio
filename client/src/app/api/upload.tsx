"use client";
import { BASE_URL } from "@/constant";
import { getToken } from "@/helper";
import { ImageUploadResponse } from "@/types";
import { ChangeEvent } from "react";

const token = getToken();

export const uploadToMediaGallery = async (
  event: ChangeEvent<HTMLInputElement>
): Promise<ImageUploadResponse | null> => {
  if (!event.target.files) {
    return null;
  }
  const imageFile = event.target.files[0];

  const form = new FormData();
  form.append("files", imageFile);

  try {
    let data: ImageUploadResponse | null;
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    if (response.ok) {
      data = await response.json();
      console.log("updated media gallery");
    } else {
      data = null;
      throw new Error("File upload failed");
    }
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
