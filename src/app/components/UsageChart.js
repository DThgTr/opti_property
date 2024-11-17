// components/UsageChart.js
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function UsageChart({ title, data, colorPalette, series }) {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {data.reduce((sum, item) => sum + item.value, 0)}
            </Typography>
            {/* <Chip size="small" color="success" label="+35%" /> */}
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Usage per hour for the last 24 hours
          </Typography>
        </Stack>
        <LineChart
          dataset={data}
          xAxis={[
            {
              id: "Hours",
              dataKey: "hour",
              scaleType: "linear",
              label: "Hour",
            },
          ]}
          series={series}
          colors={colorPalette}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-electricity": {
              fill: "url('#electricity')",
            },
            "& .MuiAreaElement-series-water": {
              fill: "url('#water')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="electricity" />
          <AreaGradient color={theme.palette.secondary.main} id="water" />
        </LineChart>
      </CardContent>
    </Card>
  );
}

UsageChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  colorPalette: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
};
