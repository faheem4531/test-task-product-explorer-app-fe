'use client'
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";

const Product = () => {
  const { id } = useParams();

  const data = {
    title: "Product Title",
    description: "An apple mobile which is nothing like apple",
    price: 459,
    rating: 4.8,
    brand: "Apple",
    category: "smartphone",
    stock: 92,
    discountPerenctage: 12.32,
    thumbnail: "https://res.cloudinary.com/dplkbzr6j/image/upload/v1725395359/bookmark-foo/oyq81uhi7ntnlym0hly8.webp",
    id: "p1"
  }

  return (
    <Box sx={{
      height: "100vh",
      padding: { sm: "70px 100px", xs: "20px" },
    }}>
      <Typography fontSize={"32px"}>{data.title}</Typography>
      <Box sx={{
        display: "flex",
        flexDirection: { md: "row", sm: "column", xs: "column" },
        alignItems: "center",
        mt: "40px"
      }}>
        <Box sx={{
          maxWidth: {
            lg: "500px",
            sm: "350px",
            xs: "300px"
          },
          width: "100%"
        }}>
          <Image
            src={data.thumbnail}
            alt="product Image"
            width={500}
            height={500}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box sx={{ ml: { md: "30px" }, mt: "20px", width: "100%" }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}>
            <Typography fontSize={"24px"}>{data.brand}</Typography>
            <Typography fontSize={"16px"}>{"Available stock: "}{data.stock}</Typography>
          </Box>
          <Typography fontSize={"18px"} color="#838282" m="20px 0">{data.description}</Typography>
          <Typography fontSize={"18px"} >{"$ "}{data.price}</Typography>
          <Typography fontSize={"18px"} m="10px 0">{"Category: "}{data.category}</Typography>
          <Box sx={{
            display: "flex",
            flexDirection: { sm: "row", xs: "comumn" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}>
            <Typography fontSize={"24px"}>{"Rating: "}{data.rating}</Typography>
            <Typography fontSize={"16px"}>{"Discount % "}{data.discountPerenctage}</Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}

export default Product;
