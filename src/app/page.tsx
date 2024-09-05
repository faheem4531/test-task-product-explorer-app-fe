import { Box } from "@mui/material";
import Link from "next/link";

const Home = () => {
  const containerStyle = {
    width: "50%",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "35px",
    fontWeight: 500,
    transition: "background-color 0.3s ease-in-out",
  }

  return (
    <Box sx={{
      display: 'flex',
      height: "100vh",
      padding: { md: "40px 100px", sm: "30px", xs: "20px" },
      gap: "20px"
    }}>
      <Box sx={{
        bgcolor: "#546976",
        color: "#b7c0bb",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
        "&:hover": {
          bgcolor: "#29343B"
        },
        ...containerStyle
      }}>
        <Link href={"/dashboard"} >
          Dashboard
        </Link>
      </Box>
      <Box sx={{
        bgcolor: "#173B45",
        color: "#546976",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15)",
        "&:hover": {
          bgcolor: "#929c97"
        },
        ...containerStyle
      }}>
        <Link href={"/products"} >
          Products
        </Link>
      </Box>
      <Box sx={{
        bgcolor: "#1A4870",
        color: "#546976",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15)",
        "&:hover": {
          bgcolor: "#929c97"
        },
        ...containerStyle
      }}>
        <Link href={"/product-advisor"} >
         Product Advisor
        </Link>
      </Box>
    </Box>
  );
}

export default Home;
