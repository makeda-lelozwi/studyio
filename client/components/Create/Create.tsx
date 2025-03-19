import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import Cookies from "js-cookie";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [cover, setCover] = useState<number | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}");
    const token = parsedUserData.authToken;
    //Step 1: Upload file to Strapi Media Library
    if (!event.target.files) {
      return;
    }
    const imageFile = event.target.files[0];

    const form = new FormData();
    form.append("files", imageFile);
    try {
      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      // Step 3: Parse the response and store the image ID
      const data = await response.json();
      console.log("File uploaded successfully:", data);

      // Extract the image ID from the response
      const imageId = data[0].id;
      setCover(imageId);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const createCourse = async (event: React.FormEvent) => {
    event.preventDefault();

    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}");
    const token = parsedUserData.authToken;
    const user_id = parsedUserData.user_id;

    try {
      const response = await fetch("http://localhost:1337/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: { title, description, price, user_id, cover: cover },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const courseCreateResponse = await response.json();
      console.log("Course created successfully", courseCreateResponse);

      
    } catch (error) {
      console.error("Error fetching courses data:", error);
    }
  };

  return (
    <>
      <form action="" onSubmit={createCourse}>
        <div>
          <p>Course Title </p>{" "}
          <TextField
            required
            id="outlined-basic"
            label="Course Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <p>Course Description </p>{" "}
          <TextField
            required
            id="outlined-basic"
            label="Course Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <p>Course Cover </p>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
          >
            Upload Course Cover
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
        </div>
        <div>
          <p>Price </p>{" "}
          <TextField
            id="outlined-basic"
            type="number"
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              // Convert the string to a number or set to null if empty
              setPrice(value === "" ? null : Number(value));
            }}
          />
        </div>
        <Button type="submit" variant="contained">
          Create Course
        </Button>
      </form>
    </>
  );
};

export default Create;
