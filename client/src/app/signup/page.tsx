"use client";
import { SyntheticEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AlertComponent from "../components/AlertComponent";
import Cookies from "js-cookie";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  let message = "";
  let isError = false;
  let showAlert = false;
  const router = useRouter();

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        message = "Successfully registered account.";
        isError = false;
        showAlert = true;

        const userData = {
          authToken: data.jwt,
          userName: data.user.username,
          user_id: data.user.id,
          isLoggedIn: data.user.confirmed,
        };

        Cookies.set("userData", JSON.stringify(userData));
      } else {
        setSignUpError(data.error.message);
        return;
      }
      router.push("/login");
    } catch (error) {
      showAlert = true;
      console.error("Registration error:", error);
      setSignUpError(
        "An error occured during sign up. Please try again later."
      );
    }
  };
  return (
    <Grid2
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
      container
    >
      <div>
        <Typography variant={"h6"} component={"h2"}>
          {" "}
          Get started with Study.io
        </Typography>

        <Typography variant={"h6"}>
          Sign in and start creating courses now!
        </Typography>

        {showAlert && (
          <AlertComponent message={message} isError={isError}></AlertComponent>
        )}

        <form action="" onSubmit={handleRegister}>
          <div>
            <p>Name </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <p>Email Address </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <p>Password </p>{" "}
            <TextField
              required
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          {signUpError && (
            <AlertComponent
              message={signUpError}
              isError={true}
            ></AlertComponent>
          )}
          <Button type="submit" variant="contained" sx={{ margin: "8px" }}>
            Sign Up
          </Button>
          <h3>Already with us?</h3>
          <Button variant="text" href="/login" sx={{ margin: "8px" }}>
            Login Here
          </Button>
        </form>
      </div>
    </Grid2>
  );
};

export default SignUp;
