"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FunnelChart: React.FC<{ data: ConversionFunnelResponse }> = ({
  data,
}) => {
  // Define categories and values
  const categories = ["Searches", "Views", "Clicks", "Time Spent"];
  const values = [data.searches, data.views, data.clicks, data.totalTimeSpent];

  // Combine categories and values into a sortable array of objects
  const dataPairs = categories.map((category, index) => ({
    category,
    value: values[index],
  }));

  // Sort the data pairs in descending order based on value
  dataPairs.sort((a, b) => b.value - a.value);

  // Extract sorted categories and values
  const sortedCategories = dataPairs.map((pair) => pair.category);
  const sortedValues = dataPairs.map((pair) => pair.value);

  // Chart options
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opt: any) {
        return `${opt.w.globals.labels[opt.dataPointIndex]}: ${val}`;
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.5,
      },
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["#333"],
      },
    },
    title: {
      text: "Recruitment Funnel",
      align: "center", // Corrected to match ApexOptions type
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      categories: sortedCategories,
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#333"],
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#008FFB"],
  };

  // Series data for the chart
  const series = [
    {
      name: "Funnel Series",
      data: sortedValues,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f4f4f4",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "700px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <Chart options={options} series={series} type="bar" height={350} />
    </Box>
  );
};

export default FunnelChart;
