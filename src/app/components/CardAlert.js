import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export default function CardAlert() {
  return (
    <Card variant="outlined" sx={{ m: 1.5, p: 1.5 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          🚀 Track CBRE and Samba Nova 🚀
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          🎉 HackUTD 2024 🎉
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          🌟 Hope you guys have a wonderful hackathon! 🌟
        </Typography>
      </CardContent>
    </Card>
  );
}
