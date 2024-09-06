"use client";
// react/next imports
import React, { useEffect, useState } from "react";

// third party imports
import { Box, Typography } from "@mui/material";

// hooks and components imports
import {
  getConversionFunnel,
  getInteractionTrends,
  getMostInteractedProducts,
} from "@/app/_api/apiService";
import { AppLoader } from "@/app/_components";
import FunnelChart from "./components/FunnelChart";
import HeatmapChart from "./components/HeatmapChart";
import InteractionTrendBarChart from "./components/InteractionTrendBarChart";

const Dashboard: React.FC = () => {
  const [interactionTrends, setInteractionTrends] = useState<InteractionTrend[]>([]);
  const [mostInteractedProducts, setMostInteractedProducts] = useState<MostInteractedProductsResponse>({ products: [], searches: [] });
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnelResponse | null>(null);
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

  // Graph styles
  const graphStyles = {
    bgcolor: "#f3f3f3",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    maxWidth: "1200px",
    minWidth: "600px",
    overflowX: "auto",
    whiteSpace: "nowrap",
    margin: "40px auto",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
    },
  };

  const hasConversionFunnelData = conversionFunnel && Object.keys(conversionFunnel).length > 0;
  const hasInteractionTrendsData = interactionTrends.length > 0;
  const hasMostInteractedProductsData = mostInteractedProducts.products.length > 0;

  return (
    <Box
      sx={{
        m: "50px 50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "38px",
          fontWeight: "bold",
          mb: "20px",
          color: "#29343b",
          textAlign: "center",
        }}
      >
        Data Visualization
      </Typography>
      <AppLoader loading={loading}>
        <Box margin="0 auto" >
          {hasConversionFunnelData && (
            <FunnelChart data={conversionFunnel} styles={graphStyles} />
          )}
          {hasInteractionTrendsData && (
            <InteractionTrendBarChart data={interactionTrends} styles={graphStyles} />
          )}
          {hasMostInteractedProductsData && (
            <HeatmapChart
              data={mostInteractedProducts.products}
              title={"Products"}
              styles={graphStyles}
            />
          )}
        </Box>
      </AppLoader>
    </Box>
  );
};

export default Dashboard;
