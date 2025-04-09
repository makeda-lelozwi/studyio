"use client";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { CourseProps } from "@/types";
import {
  Button,
  CardActions,
  Grid2,
  IconButton,
  TextField,
} from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { ChangeEvent, useState } from "react";
import { updateCourse } from "../api/course";
import { uploadToMediaGallery } from "../api/upload";

const Course = ({ course }: CourseProps) => {
  const user = useAuthContext().user;
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [cover, setCover] = useState<number | null>(null);

  const imageUrl = course.cover?.url
    ? `http://localhost:1337${course.cover.url}`
    : "";

  // Format the date using JavaScript's Date object
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const updatedDate = formatDate(course.updatedAt);

  const toggleEditCourse = () => {
    setEdit(!edit);
  };

  const handleEditCourse = async (
    title: string,
    description: string,
    price: number | null
  ) => {
    toggleEditCourse();
    await updateCourse(course.documentId, title, description, cover, price);
    location.reload(); // TODO: find a way to trigger dashboard refresh when courses are updated
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageUpload = await uploadToMediaGallery(event);
    if (imageUpload) {
      const imageId = imageUpload[0].id;
      setCover(imageId);
    }
  };

  return (
    <Card sx={{ margin: 2, width: 345 }}>
      <Grid2
        container
        sx={{ display: "flex", flexWrap: "wrap" }}
        alignItems="center"
        justifyContent="center"
      >
        <CardHeader
          title={
            !edit ? (
              course.title
            ) : (
              <TextField
                required
                id="outlined-basic"
                label="Course Title"
                variant="outlined"
                value={title}
                sx={{ width: 200 }}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
              />
            )
          }
          subheader={`Updated on ${updatedDate}`}
        ></CardHeader>
        {user && (
          <IconButton aria-label="update course" onClick={toggleEditCourse}>
            <EditIcon />
          </IconButton>
        )}{" "}
      </Grid2>
      {!edit ? (
        imageUrl ? (
          <CardMedia
            component="img"
            height="194"
            image={imageUrl}
            alt="Course cover image"
          />
        ) : (
          <Typography>No Image Loaded</Typography>
        )
      ) : (
        <>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{ width: 300, marginLeft: 2 }}
          >
            Upload Course Cover
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
              accept="image/*"
            />
          </Button>
          {cover && <Typography>Image uploaded</Typography>}
        </>
      )}
      <CardContent>
        {!edit ? (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {course.price ? "R" + course.price : ""}
          </Typography>
        ) : (
          <TextField
            id="outlined-basic"
            type="number"
            label="Course price"
            variant="outlined"
            value={price === null ? null : price}
            sx={{ width: 150 }}
            onChange={(e) => {
              const value = e.target.value;
              setPrice(value === null ? null : Math.abs(Number(value)));
            }}
            autoComplete="off"
          />
        )}
        {!edit ? (
          <Typography variant="body2">{course.description}</Typography>
        ) : (
          <TextField
            required
            id="outlined-basic"
            label="Course description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: 200, marginTop: 2 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
          />
        )}
      </CardContent>
      {edit && (
        <CardActions>
          <Button
            size="small"
            type="submit"
            color="primary"
            onClick={() => handleEditCourse(title, description, price)}
          >
            Save
          </Button>
          <Button size="small" color="primary" onClick={toggleEditCourse}>
            Cancel
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Course;
