// components/Navbar.js

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SignIn from "./SignIn";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isAuthenticated, username, logout } = useAuth();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {isAuthenticated ? `Welcome, ${username}` : "My Project"}
        </Typography>
        {isAuthenticated ? (
          <>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <SignIn />
        )}
      </Toolbar>
      <Drawer anchor="right" open={isChatOpen} onClose={toggleChat}>
        <div style={{ width: 250 }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
            <Divider />
            {/* Add more chat-related items here */}
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
