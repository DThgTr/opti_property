// components/Navbar.js
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Box from "@mui/material/Box";

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Project
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" href="/admin/login">
            Admin Login
          </Button>
          <IconButton color="inherit" onClick={handleChatToggle}>
            <ChatIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {isChatOpen && (
        <Box sx={{ p: 2 }}>
          {/* Placeholder for AI Chatbox */}
          <Typography variant="body1">AI Chatbox will appear here</Typography>
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
d