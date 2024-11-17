import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Import data from JSON
import utilityUsage from "../data/utility_usage.json";

// Transform data for water usage
const dataset = utilityUsage.reduce((acc, record) => {
  if (!acc.some((item) => item.hour === record.hour)) {
    acc.push({
      hour: record.hour,
      floor1: 0,
      floor2: 0,
      floor3: 0,
      date: record.date,
    });
  }
  const current = acc.find((item) => item.hour === record.hour);
  if (record.floor1_water !== undefined) current.floor1 = record.floor1_water;
  if (record.floor2_water !== undefined) current.floor2 = record.floor2_water;
  if (record.floor3_water !== undefined) current.floor3 = record.floor3_water;
  return acc;
}, []);

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

export default function WaterUsage() {
  const theme = useTheme();
  const [selectedFloors, setSelectedFloors] = React.useState([
    "Floor1",
    "Floor2",
    "Floor3",
  ]);

  const handleChange = (event) => {
    setSelectedFloors(event.target.value);
  };

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const filteredSeries = [
    {
      id: "Floor1",
      label: "Floor 1",
      dataKey: "floor1",
      stack: "total",
      area: true,
      showMark: false,
    },
    {
      id: "Floor2",
      label: "Floor 2",
      dataKey: "floor2",
      stack: "total",
      area: true,
      showMark: false,
    },
    {
      id: "Floor3",
      label: "Floor 3",
      dataKey: "floor3",
      stack: "total",
      area: true,
      showMark: false,
    },
  ].filter((series) => selectedFloors.includes(series.id));

  const sumOfUsage = dataset.reduce((sum, item) => {
    return (
      sum +
      selectedFloors.reduce((acc, floor) => {
        return acc + item[floor.toLowerCase()];
      }, 0)
    );
  }, 0);

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Water Usage
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
              {sumOfUsage}
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Water usage per hour for the last 24 hours
          </Typography>
        </Stack>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            multiple
            value={selectedFloors}
            onChange={handleChange}
            renderValue={(selected) => {
              const floorNumbers = selected.map((floor) =>
                parseInt(floor.slice(-1))
              );
              return `Floor: ${floorNumbers.join(", ")}`;
            }}
          >
            <MenuItem value="Floor1">Floor 1</MenuItem>
            <MenuItem value="Floor2">Floor 2</MenuItem>
            <MenuItem value="Floor3">Floor 3</MenuItem>
          </Select>
        </FormControl>
        <LineChart
          dataset={dataset}
          xAxis={[
            {
              id: "Hours",
              dataKey: "hour",
              scaleType: "linear",
              label: "Hour",
              tickFormatter: (value) => `${23 - value}:00`, // Reverse the order
            },
          ]}
          series={filteredSeries}
          colors={colorPalette}
          height={400}
          width={600}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-Floor1": {
              fill: "url('#floor1')",
            },
            "& .MuiAreaElement-series-Floor2": {
              fill: "url('#floor2')",
            },
            "& .MuiAreaElement-series-Floor3": {
              fill: "url('#floor3')",
            },
          }}
          slotProps={{
            tooltip: {
              formatter: (point) =>
                `Hour: ${23 - point.hour}\nDate: ${point.date}`,
            },
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="floor1" />
          <AreaGradient color={theme.palette.primary.main} id="floor2" />
          <AreaGradient color={theme.palette.primary.light} id="floor3" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
