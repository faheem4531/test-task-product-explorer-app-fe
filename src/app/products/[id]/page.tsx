'use client'
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

const Product = () => {
  const { id } = useParams();


  return (
    <Box sx={{
      display: 'flex',
      bgcolor: "#cdcec9",
      height: "100vh",
      padding: { md: "40px 200px", sm: "30px", xs: "20px" },
      gap: "20px"
    }}>
      {id}
    </Box>
  );
}

export default Product;
