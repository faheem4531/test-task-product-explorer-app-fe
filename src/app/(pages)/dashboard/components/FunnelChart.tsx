"use client";

// react imports
import React from "react";
import dynamic from "next/dynamic";

// third party imports
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";

// local imports
import { getFunnelOptions, processFunnelData } from "@/app/_utils/helpers";

// Dynamically import the Chart component
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FunnelChart: React.FC<{ data: ConversionFunnelResponse }> = ({
  data,
}) => {
  const { sortedCategories, sortedValues } = processFunnelData(data);
  const options: ApexOptions = getFunnelOptions(sortedCategories, sortedValues);
  const series = [
    {
      name: "Funnel visualization",
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
