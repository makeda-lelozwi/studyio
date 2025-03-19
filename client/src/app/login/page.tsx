"use client";
import { Grid2, TextField, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserData } from "@/app/types";
import { useRouter } from "next/navigation";
import AlertComponent from "../components/AlertComponent";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // When reading the cookie, parse the JSON data
    const userDataCookie = Cookies.get("userData");
    const parsedUserData = JSON.parse(userDataCookie || "{}") as UserData; // Explicitly cast to UserData
    setUserData(parsedUserData);
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Format the user-related data before storing in the cookie
        const userData = {
          authToken: data.jwt,
          userName: data.user.username,
          user_id: data.user.id,
          isLoggedIn: data.user.confirmed,
        };

        Cookies.set("userData", JSON.stringify(userData));
        console.log(userData);
        setUserData(userData);

        router.push("/dashboard");
      } else {
        console.log(data);
        setLoginError(data.error.message);
      }
    } catch (error) {
      console.error(error);
      setLoginError("An error occured during login. Please try again later.");
    }
  };

  return (
    <Grid2
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
      container
      spacing={2}
    >
      {!userData?.isLoggedIn && (
        <>
          <Grid2>
            <Typography variant={"h6"} component={"h2"}>
              Enter your email and password to view your courses.
            </Typography>
          </Grid2>

          <Grid2>
            <form action="" onSubmit={handleLogin}>
              <div>
                <p>Username </p>{" "}
                <TextField
                  required
                  id="outlined-basic"
                  label="Email Address or Username"
                  variant="outlined"
                  value={identifier}
                  autoComplete="off"
                  onChange={(e) => setIdentifier(e.target.value)}
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
              {loginError && (
                <AlertComponent
                  message={loginError}
                  isError={true}
                ></AlertComponent>
              )}
              {/* {loginError && <p style={{ color: "red" }}>{loginError}</p>} */}

              <Button type="submit" variant="contained" sx={{ margin: "8px" }}>
                Login
              </Button>
              <h3>New to Study.io?</h3>
              <Button variant="text" href="/signup" sx={{ margin: "8px" }}>
                Register Here
              </Button>
            </form>
          </Grid2>
        </>
      )}
    </Grid2>
  );
};

export default Login;
