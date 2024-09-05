// react imports
import React from "react";
import dynamic from "next/dynamic";

// third party imports
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";

// local imports
import { generateHeatmapOptions } from "@/app/_utils/helpers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ProductHeatmapChartProps {
  data: MostInteractedItem[];
  title: string;
}

const HeatmapChart: React.FC<ProductHeatmapChartProps> = ({ data, title }) => {
  const options: ApexOptions = generateHeatmapOptions(title);

  return (
    <Box
      sx={{
        padding: "20px",
        bgcolor: "#f4f4f4",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <Chart options={options} series={data} type="heatmap" height={400} />
    </Box>
  );
};

export default HeatmapChart;
