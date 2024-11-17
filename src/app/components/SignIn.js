// components/SignIn.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { users } from "../lib/users";
import AccountCircle from "@mui/icons-material/AccountCircle";

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleSignIn = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // Redirect to the dashboard or any other protected route
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <Button
        color="inherit"
        startIcon={<AccountCircle />}
        onClick={handleClickOpen}
      >
        Admin Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your credentials to access the admin dashboard.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <DialogContentText color="error">{error}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignIn} color="primary">
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignIn;
