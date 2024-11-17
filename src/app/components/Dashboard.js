// components/Dashboard.js
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import UsageChart from "./UsageChart";
import ElectricLineGraph from "./ElectricLineGraph";
import WaterLineGraph from "./WaterLineGraph";
import utilityUsage from "../data/utility_usage.json";

const transformData = (data, key) => {
  return data.reduce((acc, record) => {
    if (!acc.some((item) => item.hour === record.hour)) {
      acc.push({ hour: record.hour, value: 0 });
    }
    const current = acc.find((item) => item.hour === record.hour);
    const value = record[key];
    if (typeof value === "number" && !isNaN(value)) {
      current.value = value;
    }
    return acc;
  }, []);
};

export default function Dashboard() {
  const theme = useTheme();

  const electricityColorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const waterColorPalette = [
    theme.palette.secondary.light,
    theme.palette.secondary.main,
    theme.palette.secondary.dark,
  ];

  const floor1ElectricityData = transformData(
    utilityUsage,
    "floor1_electricity"
  );
  const floor2ElectricityData = transformData(
    utilityUsage,
    "floor2_electricity"
  );
  const floor3ElectricityData = transformData(
    utilityUsage,
    "floor3_electricity"
  );

  const floor1WaterData = transformData(utilityUsage, "floor1_water");
  const floor2WaterData = transformData(utilityUsage, "floor2_water");
  const floor3WaterData = transformData(utilityUsage, "floor3_water");

  return (
    <Grid container spacing={2}>
      {/* Individual Floor Charts in One Row */}
      <Grid container item spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <UsageChart
            title="Floor 1 Electricity Usage"
            data={floor1ElectricityData}
            colorPalette={electricityColorPalette}
            series={[
              {
                id: "electricity",
                label: "Electricity",
                dataKey: "value",
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <UsageChart
            title="Floor 2 Electricity Usage"
            data={floor2ElectricityData}
            colorPalette={electricityColorPalette}
            series={[
              {
                id: "electricity",
                label: "Electricity",
                dataKey: "value",
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <UsageChart
            title="Floor 3 Electricity Usage"
            data={floor3ElectricityData}
            colorPalette={electricityColorPalette}
            series={[
              {
                id: "electricity",
                label: "Electricity",
                dataKey: "value",
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <UsageChart
            title="Floor 1 Water Usage"
            data={floor1WaterData}
            colorPalette={waterColorPalette}
            series={[
              {
                id: "water",
                label: "Water",
                dataKey: "value",
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <UsageChart
            title="Floor 2 Water Usage"
            data={floor2WaterData}
            colorPalette={waterColorPalette}
            series={[
              {
                id: "water",
                label: "Water",
                dataKey: "value",
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <UsageChart
            title="Floor 3 Water Usage"
            data={floor3WaterData}
            colorPalette={waterColorPalette}
            series={[
              {
                id: "water",
                label: "Water",
                dataKey: "value",
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
          />
        </Grid>
      </Grid>

      {/* ElectricLineGraph.js and WaterLineGraph.js in One Row */}
      <Grid container item spacing={2}>
        <Grid item xs={12} sm={6}>
          <ElectricLineGraph />
        </Grid>
        <Grid item xs={12} sm={6}>
          <WaterLineGraph />
        </Grid>
      </Grid>
    </Grid>
  );
}
