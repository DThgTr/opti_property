"use client";
import localFont from "next/font/local";
import "./globals.css";
import SideMenu from "./components/SideMenu";
import { AuthProvider } from "../app/context/AuthContext";
import { Box } from "@mui/material";
import { ThemeProvider } from "styled-components";
import theme from "../app/lib/theme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SideMenu />
            <Box sx={{ marginLeft: { xs: 0, md: "240px" }, padding: 2 }}>
              {children}
            </Box>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
