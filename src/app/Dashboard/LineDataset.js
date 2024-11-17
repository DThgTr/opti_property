"use client";

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import utilityUsage from '../data/utility_usage.json'; 

const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none', // To stack 0 on top of others
};

const customize = {
  width: 700,
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
};

// Flattening and formatting the data for the chart


export default function LineDataset() {
  

  const formatDataForChart = (data) => {
    return data.floors.flatMap(floor => {
      return floor.hourlyData.map((entry) => ({
        hour: entry.hour,
        electricity: entry.electricity,
        water: entry.water,
        floor: floor.floor,
      }));
    });
  };

  const formattedData = formatDataForChart(utilityUsage); // Get the formatted data

  return (
    <LineChart
      xAxis={[
        {
          dataKey: 'hour',
          valueFormatter: (value) => value.toString(),
          min: 0,
          max: 23,
        },
      ]}
      series={[
        {
          dataKey: 'electricity',
          label: 'Electricity',
          color: 'blue', // Choose an appropriate color
          showMark: false,
          ...stackStrategy,
        },
        {
          dataKey: 'water',
          label: 'Water',
          color: 'green', // Choose an appropriate color
          showMark: false,
          ...stackStrategy,
        },
      ]}
      dataset={formattedData}
      {...customize}
    />
  );
}
