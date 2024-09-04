"use client";

import { Box } from "@mui/material";
import React from "react";
import BarChart from "./components/BarChart";
import FunnelChart from "./components/FunnelChart";

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        m: "100px auto",
      }}
    >
      <FunnelChart />
      <BarChart />
    </Box>
  );
};

export default Dashboard;
