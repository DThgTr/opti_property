import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

// Import data from JSON
import utilityUsage from "../data/utility_usage.json";

// Transform data for water usage
const dataset = utilityUsage.reduce((acc, record) => {
  if (!acc.some((item) => item.hour === record.hour)) {
    acc.push({ hour: record.hour, floor1: 0, floor2: 0, floor3: 0 });
  }
  const current = acc.find((item) => item.hour === record.hour);
  if (record.floor1_water !== undefined) current.floor1 = record.floor1_water;
  if (record.floor2_water !== undefined) current.floor2 = record.floor2_water;
  if (record.floor3_water !== undefined) current.floor3 = record.floor3_water;
  return acc;
}, []);

export default function WaterUsage() {
  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        { id: "Hours", dataKey: "hour", scaleType: "linear", label: "Hour" },
      ]}
      series={[
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
      ]}
      width={600}
      height={400}
      margin={{ left: 70 }}
    />
  );
}
