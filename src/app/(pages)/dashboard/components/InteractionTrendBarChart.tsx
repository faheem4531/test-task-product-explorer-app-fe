// react imports
import React from "react";
import dynamic from "next/dynamic";

// third party imports
import { Box } from "@mui/material";

// local imports
import {
  getInteractionTrendChartOptions,
  processInteractionTrendChartData,
} from "@/app/_utils/helpers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface InteractionTrendBarChartProps {
  data: InteractionTrend[];
}

const InteractionTrendBarChart: React.FC<InteractionTrendBarChartProps> = ({
  data,
}) => {
  const { series, hours } = processInteractionTrendChartData(data);
  const options = getInteractionTrendChartOptions(hours);

  return (
    <Box
      sx={{
        bgcolor: "#f4f4f4",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <Chart options={options} series={series} type="bar" height={400} />
    </Box>
  );
};

export default InteractionTrendBarChart;
