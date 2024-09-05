import { Box } from "@mui/material";
import FeatureCard from "./_components/featureCard/FeatureCard";

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: "100vh",
        padding: { md: "40px 100px", sm: "30px", xs: "20px" },
        gap: "20px",
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <FeatureCard
        href="/dashboard"
        bgcolor="#546976"
        hoverBgColor="#29343B"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)"
        text="Dashboard"
        textColor="#b7c0bb"
      />
      <FeatureCard
        href="/products"
        bgcolor="#173B45"
        hoverBgColor="#0D2228"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15)"
        text="Products"
        textColor="#b7c0bb"
      />
      <FeatureCard
        href="/product-advisor"
        bgcolor="#1A4870"
        hoverBgColor="#0D2336"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15)"
        text="Product Advisor"
        textColor="#b7c0bb"
      />
    </Box>
  );
};

export default Home;
