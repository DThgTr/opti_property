// components/Dashboard.js
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
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
      {/* Switches for controlling lights and water */}
      <Grid item xs={12}>
        <FormGroup row>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Lights Floor 1"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Lights Floor 2"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Lights Floor 3"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Water Floor 1"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Water Floor 2"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Water Floor 3"
          />
        </FormGroup>
      </Grid>

      {/* ElectricLineGraph.js and WaterLineGraph.js in One Row */}
      <Grid container item spacing={2}>
        <Grid item xs={12} sm={6}>
          <ElectricLineGraph colorPalette={electricityColorPalette} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <WaterLineGraph colorPalette={waterColorPalette} />
        </Grid>
      </Grid>
    </Grid>
  );
}
