// react imports
import dynamic from "next/dynamic";
import React from "react";

// third party imports
import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";

// local imports
import { generateHeatmapOptions } from "@/app/_utils/helpers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ProductHeatmapChartProps {
  data: MostInteractedItem[];
  title: string;
  styles: object;
}

const HeatmapChart: React.FC<ProductHeatmapChartProps> = ({ data, title, styles }) => {
  const options: ApexOptions = generateHeatmapOptions(title);

  return (
    <Box sx={styles}>
      <Chart options={options} series={data} type="heatmap" height={450} />
    </Box>
  );
};

export default HeatmapChart;
