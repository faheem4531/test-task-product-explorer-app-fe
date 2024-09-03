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
      bgcolor: "#cdcec9",
      height: "100vh",
      padding: { md: "40px 200px", sm: "30px", xs: "20px" },
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
        bgcolor: "#b7c0bb",
        color: "#546976",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15)",
        "&:hover": {
          bgcolor: "#929c97"
        },
        ...containerStyle
      }}>
        <Link href={"/product-listing"} >
          Products
        </Link>
      </Box>
    </Box>
  );
}

export default Home;
