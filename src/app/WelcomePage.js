// components/WelcomePage.js
"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SignIn from "./components/SignIn";
import { useAuth } from "./context/AuthContext";

const WelcomePage = () => {
  const { isAuthenticated } = useAuth();
  const [openSignIn, setOpenSignIn] = useState(false);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Admin Dashboard for OptiProperty
      </Typography>
      <Typography variant="h5" gutterBottom>
        Please sign in to access the dashboard.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenSignIn(true)}
      >
        Sign In
      </Button>
      <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </div>
  );
};

export default WelcomePage;
