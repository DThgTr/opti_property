"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import utilityUsage from "../data/utility_usage.json";

const dataset = utilityUsage.floors.flatMap((floor) =>
  floor.hourlyData.map((data) => ({
    hour: data.hour,
    electricity: data.electricity,
    water: data.water,
    floor: `Floor ${floor.floor}`,
  }))
);

export default function StackedAreas() {
  return (
    <div>
      <h2>Electricity Usage</h2>
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            id: "Hours",
            dataKey: "hour",
            scaleType: "linear",
          },
        ]}
        series={[
          {
            id: "Floor 1 Electricity",
            label: "Floor 1 Electricity",
            dataKey: "electricity",
            stack: "total",
            area: true,
            showMark: false,
            filter: (data) => data.floor === "Floor 1",
          },
          {
            id: "Floor 2 Electricity",
            label: "Floor 2 Electricity",
            dataKey: "electricity",
            stack: "total",
            area: true,
            showMark: false,
            filter: (data) => data.floor === "Floor 2",
          },
          {
            id: "Floor 3 Electricity",
            label: "Floor 3 Electricity",
            dataKey: "electricity",
            stack: "total",
            area: true,
            showMark: false,
            filter: (data) => data.floor === "Floor 3",
          },
        ]}
        width={600}
        height={400}
        margin={{ left: 70 }}
      />

      <h2>Water Usage</h2>
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            id: "Hours",
            dataKey: "hour",
            scaleType: "linear",
          },
        ]}
        series={[
          {
            id: "Floor 1 Water",
            label: "Floor 1 Water",
            dataKey: "water",
            stack: "total",
            area: true,
            showMark: false,
            filter: (data) => data.floor === "Floor 1",
          },
          {
            id: "Floor 2 Water",
            label: "Floor 2 Water",
            dataKey: "water",
            stack: "total",
            area: true,
            showMark: false,
            filter: (data) => data.floor === "Floor 2",
          },
          {
            id: "Floor 3 Water",
            label: "Floor 3 Water",
            dataKey: "water",
            stack: "total",
            area: true,
            showMark: false,
            filter: (data) => data.floor === "Floor 3",
          },
        ]}
        width={600}
        height={400}
        margin={{ left: 70 }}
      />
    </div>
  );
}
