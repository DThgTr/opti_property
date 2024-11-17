import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import SignIn from "./SignIn";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import OptionsMenu from "./OptionsMenu"; // Import the OptionsMenu component

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 7,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const { isAuthenticated, username, logout } = useAuth();
  const [openSignIn, setOpenSignIn] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: "block",
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 2,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          OptiProperty
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {isAuthenticated ? (
          <>{/* Replace the AccountCircle and LogoutIcon with OptionsMenu */}</>
        ) : (
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Please sign in to access the dashboard.
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        {!isAuthenticated && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenSignIn(true)}
            >
              Sign In
            </Button>
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
          </>
        )}
      </Box>
      {isAuthenticated && (
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar
            sizes="medium"
            alt={username}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ ml: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              {username}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {/* You can add the user's email here if available */}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      )}
    </Drawer>
  );
}
