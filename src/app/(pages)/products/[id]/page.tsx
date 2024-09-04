"use client";
// react/next imports
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

// third party imports
import { getProductById } from "@/app/_api/apiService";
import { AppLoader } from "@/app/_components";
import { Box, Typography } from "@mui/material";

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setData(product);
        } catch (err) {
          setError("Failed to fetch product details");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      setError("Invalid product ID.");
      setLoading(false);
    }
  }, [id]);

  if (error) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <AppLoader loading={loading}>
      <Box
        sx={{
          height: "100vh",
          padding: { sm: "70px 100px", xs: "20px" },
        }}
      >
        {data && (
          <>
            <Typography fontSize={"32px"}>{data.title}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", sm: "column", xs: "column" },
                alignItems: "center",
                mt: "40px",
              }}
            >
              <Box
                sx={{
                  maxWidth: {
                    lg: "500px",
                    sm: "350px",
                    xs: "300px",
                  },
                  width: "100%",
                }}
              >
                <Image
                  src={data.thumbnail}
                  alt="product Image"
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box sx={{ ml: { md: "30px" }, mt: "20px", width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography fontSize={"24px"}>{data.brand}</Typography>
                  <Typography fontSize={"16px"}>
                    {"Available stock: "}
                    {data.stock}
                  </Typography>
                </Box>
                <Typography fontSize={"18px"} color="#838282" m="20px 0">
                  {data.description}
                </Typography>
                <Typography fontSize={"18px"}>
                  {"$ "}
                  {data.price}
                </Typography>
                <Typography fontSize={"18px"} m="10px 0">
                  {"Category: "}
                  {data.category}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { sm: "row", xs: "comumn" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography fontSize={"24px"}>
                    {"Rating: "}
                    {data.rating}
                  </Typography>
                  <Typography fontSize={"16px"}>
                    {"Discount % "}
                    {data.discountPercentage}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </AppLoader>
  );
};

export default Product;
