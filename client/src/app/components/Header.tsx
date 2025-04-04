"use client";

import { Grid2, Typography, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const auth = useAuthContext();
  const user = auth.user;
  const { logout, loading } = auth;
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {user ? (
        <Grid2 container spacing={2} margin={2}>
          <Typography variant={"h6"} component={"h1"}>
            Welcome to your dashboard {user?.username} !
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="contained" color="error" onClick={logout}>
              Log Out
            </Button>
            <Button variant="contained" href="/create">
              Ceate a new Course
            </Button>
          </Grid2>
        </Grid2>
      ) : (
        <Typography></Typography>
      )}
    </>
  );
};

export default Header;
