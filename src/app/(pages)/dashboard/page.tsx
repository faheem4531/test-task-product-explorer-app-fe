"use client";
// react/next imports
import React, { useEffect, useState } from "react";

// third party imports
import { Box, Typography } from "@mui/material";

// hooks and components imports
import {
  getInteractionTrends,
  getMostInteractedProducts,
  getConversionFunnel,
} from "@/app/_api/apiService";
import BarChart from "./components/BarChart";
import FunnelChart from "./components/FunnelChart";
import { AppLoader } from "@/app/_components";

const Dashboard: React.FC = () => {
  const [interactionTrends, setInteractionTrends] = useState<
    InteractionTrend[]
  >([]);
  const [mostInteractedProducts, setMostInteractedProducts] =
    useState<MostInteractedProductsResponse | null>(null);
  const [conversionFunnel, setConversionFunnel] =
    useState<ConversionFunnelResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trends, products, funnel] = await Promise.all([
          getInteractionTrends(),
          getMostInteractedProducts(),
          getConversionFunnel(),
        ]);
        setInteractionTrends(trends);
        setMostInteractedProducts(products);
        setConversionFunnel(funnel);
      } catch (err: any) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <AppLoader loading={loading}>
      <Box
        sx={{
          height: "100vh",
          m: "100px auto",
        }}
      >
        {conversionFunnel && <FunnelChart data={conversionFunnel} />}
        {/* <BarChart
          data={interactionTrends}
          mostInteractedProducts={mostInteractedProducts}
        /> */}
      </Box>
    </AppLoader>
  );
};

export default Dashboard;
