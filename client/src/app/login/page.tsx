"use client";
import { Grid2, TextField, Button } from "@mui/material";
import React, { useState } from "react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (event: any) => {
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

        console.log(userData);
        setUserData(userData);
      } else {
        setLoginError(data.message[0].messages[0].message);
      }
    } catch (error) {
      console.error(error);
      setLoginError("An error occured during login. Please try again later.");
    }
  };

  const handleSignOut = () => {
   setUserData(null);
  }

  return (
    <Grid2>
      <div>
        <h3>Welcome to Study.io</h3>
        <p>Enter your email and password to share your courses.</p>

        {!userData?.isLoggedIn && (
          <form action="">
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
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <Button type="submit" variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <h3>New to Study.io?</h3>
            <Button variant="text" href="/signup">
              Register Here
            </Button>
          </form>
        )}
        {userData?.isLoggedIn && (
            <div>
              <p>Logged in as: {userData.userName}</p>
              <p>Is logged in: {userData.isLoggedIn ? 'Yes' : 'No'}</p>
              <Button variant="contained" onClick={handleSignOut} color={'error'}>
                Sign Out
              </Button>
            </div>
        )}
        
      </div>
    </Grid2>
  );
};

export default Login;
