"use client";
import { Grid2, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserData } from "@/types";
import { useRouter } from "next/navigation";

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
          isLoggedIn: data.user.confirmed,
        };

        Cookies.set("userData", JSON.stringify(userData));
        console.log(userData);
        setUserData(userData);

        router.push("/dashboard");
      } else {
        setLoginError(data.message[0].messages[0].message);
      }
    } catch (error) {
      console.error(error);
      setLoginError("An error occured during login. Please try again later.");
    }
  };

  return (
    <Grid2>
      {!userData?.isLoggedIn && (
        <div>
          <h3>Welcome to Study.io</h3>
          <p>Enter your email and password to share your courses.</p>

          <form action="" onSubmit={handleLogin}>
            <div>
              <p>Username </p>{" "}
              <TextField
                required
                id="outlined-basic"
                label="Email Address or Username"
                variant="outlined"
                value={identifier}
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
                autoComplete={"true"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <Button type="submit" variant="contained">
              Login
            </Button>
            <h3>New to Study.io?</h3>
            <Button variant="text" href="/signup">
              Register Here
            </Button>
          </form>
        </div>
      )}
    </Grid2>
  );
};

export default Login;
