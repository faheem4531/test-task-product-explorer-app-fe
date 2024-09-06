"use client";

// react imports
import dynamic from "next/dynamic";
import React from "react";

// third party imports
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";

// local imports
import { getFunnelOptions, processFunnelData } from "@/app/_utils/helpers";

// Dynamically import the Chart component
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



interface FunnelChartProps {
  data: ConversionFunnelResponse;
  styles: object;
}

const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  styles
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
    <Box sx={styles}>
      <Chart options={options} series={series} type="bar" height={450} />
    </Box>
  );
};

export default FunnelChart;
