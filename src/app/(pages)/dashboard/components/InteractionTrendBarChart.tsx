// react imports
import dynamic from "next/dynamic";
import React from "react";

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
  styles: object;
}

const InteractionTrendBarChart: React.FC<InteractionTrendBarChartProps> = ({
  data, styles
}) => {
  const { series, hours } = processInteractionTrendChartData(data);
  const options = getInteractionTrendChartOptions(hours);

  return (
    <Box sx={styles} >
      <Chart options={options} series={series} type="bar" height={500} />
    </Box>
  );

};

export default InteractionTrendBarChart;
