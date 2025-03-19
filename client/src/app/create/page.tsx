"use client";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Cookies from "js-cookie";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AlertComponent from "../components/AlertComponent";
import { useRouter } from "next/navigation";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [cover, setCover] = useState<number | null>(null);
  const [coverDescription, setCoverDescription] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");
  const [createError, setCreateError] = useState("");
  const router = useRouter();

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

      const data = await response.json();

      if (response.ok) {
        const imageId = data[0].id;
        const coverName = data[0].name;
        setCover(imageId);
        setCoverDescription(coverName);
      } else {
        throw new Error("File upload failed");
      }
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
      const data = await response.json();
      if (response.ok) {
        setCreateSuccess("Course successfully created.");
        router.back();
      } else {
        setCreateError(data.error.message);
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching courses data:", error);
    }
  };

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      margin={2}
    >
      <Typography variant={"h6"} component={"h2"}>
        Complete the form and upload a course
      </Typography>
      {createSuccess && (
        <AlertComponent message={createSuccess} isError={false} />
      )}
      {createError && <AlertComponent message={createError} isError={true} />}
      <form action="" onSubmit={createCourse}>
        <div>
          <p>Course Title </p>{" "}
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            value={title}
            sx={{ width: 350 }}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <p>Course Description </p>{" "}
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: 350 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <p>Course Cover </p>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{ width: 350 }}
          >
            Upload Course Cover
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
              accept="image/*"
            />
          </Button>
          <Typography>{coverDescription ? coverDescription : ""}</Typography>
        </div>
        <div>
          <p>Price (optional) </p>
          {""}
          <TextField
            id="outlined-basic"
            type="number"
            variant="outlined"
            value={price}
            sx={{ width: 350 }}
            onChange={(e) => {
              const value = e.target.value;
              setPrice(value === "" ? null : Number(value));
            }}
            autoComplete="off"
          />
        </div>
        <Button type="submit" variant="contained" sx={{ margin: "8px" }}>
          Create Course
        </Button>
      </form>
    </Grid2>
  );
};

export default Create;
