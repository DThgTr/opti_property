// lib/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#81c784", // Light Green
      main: "#4caf50", // Green
      dark: "#388e3c", // Dark Green
      contrastText: "#fff", // White text for better contrast
    },
    secondary: {
      light: "#ff7961", // Light Red (optional, for secondary actions)
      main: "#f44336", // Red (optional, for secondary actions)
      dark: "#ba000d", // Dark Red (optional, for secondary actions)
      contrastText: "#000", // Black text for better contrast
    },
  },
});

export default theme;
