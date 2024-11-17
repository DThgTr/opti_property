import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import { handleChatRequest } from "./ChatHandler.js"; // Import the chat handler

export default function ChatBox({ state, setState }) {
  const [open, setOpen] = useState(false); // State to control the sidebar visibility
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(""); // State for input field

  // Toggle the sidebar open or close
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add the user's message to the chat
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput(""); // Clear the input field

      try {
        console.log(state);
        // Call the chat handler function with the prompt
        const result = await handleChatRequest(input, state);
        setState(result.result);
        console.log(result);

        // Add the AI's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: result.closure, sender: "AI" },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong.", sender: "AI" },
        ]);
      }
    }
  };

  return (
    <div>
      {/* Button to open the sidebar */}
      <IconButton
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "50%",
          padding: 10,
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Sidebar with the chat options */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleSidebar}
        style={{ width: 350 }}
      >
        <div
          style={{
            width: 350,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Chat window */}
          <Box
            style={{
              flexGrow: 1,
              padding: 10,
              overflowY: "auto",
              height: "calc(100% - 120px)", // Adjust height for the input and button
              backgroundColor: "#f1f1f1",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {messages
              .slice(0)
              .reverse()
              .map((msg, index) => (
                <List key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={msg.text}
                      secondary={msg.sender === "user" ? "You" : "AI"}
                    />
                  </ListItem>
                  <Divider />
                </List>
              ))}
          </Box>

          {/* Input and Send button */}
          <Box
            style={{
              padding: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              label="Type your message"
              variant="outlined"
              fullWidth
              style={{ marginRight: 10 }}
            />
            <IconButton
              onClick={handleSendMessage}
              color="primary"
              style={{ padding: 10 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </div>
      </Drawer>
    </div>
  );
}
