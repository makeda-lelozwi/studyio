"use client";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadToMediaGallery } from "../api/upload";
import { createNewCourse } from "../api/course";
import { useRouter } from "next/navigation";

const Create = () => {
  //course info fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [cover, setCover] = useState<number | null>(null);
  const [coverName, setCoverName] = useState("");
  const router = useRouter();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageUpload = await uploadToMediaGallery(event);
    if (imageUpload) {
      const imageId = imageUpload[0].id;
      const imageName = imageUpload[0].name;
      setCover(imageId);
      setCoverName(imageName);
    }
  };

  const createCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    const courseResponse = await createNewCourse(
      title,
      description,
      cover,
      price
    );

    if (courseResponse.data) {
      console.log(courseResponse.data);
      router.back();
    }
    return courseResponse.data;
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
          <Typography>{coverName ? coverName : ""}</Typography>
        </div>
        <div>
          <p>Price (optional) </p>{" "}
          <TextField
            id="outlined-basic"
            type="number"
            variant="outlined"
            value={price === null ? "" : price}
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
        <Button
          variant="contained"
          color="error"
          href="/dashboard"
          sx={{ margin: "8px" }}
        >
          Back
        </Button>
      </form>
    </Grid2>
  );
};

export default Create;
