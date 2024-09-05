"use client";
// react/next imports
import { useRouter } from "next/navigation";
import { useState } from "react";

// third party imports
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";

import ProductCard from "@/app/_components/productCard/ProductCard";
import SearchIcon from "@mui/icons-material/Search";

const ProductAdvisor = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const Productss = [
    {
      "_id": "66d67fbf6a12e84cee94700c",
      "title": "Gaming Mouse with RGB Lighting",
      "description": "High-precision gaming mouse with customizable DPI settings and RGB lighting effects.",
      "price": 45,
      "discountPercentage": 15,
      "rating": 4.9,
      "stock": 100,
      "brand": "GamerTech",
      "category": "gaming accessories",
      "thumbnail": "https://res.cloudinary.com/dplkbzr6j/image/upload/v1725395359/bookmark-foo/oyq81uhi7ntnlym0hly8.webp",
      "images": [
        "https://i.dummyjson.com/data/products/49/1.jpg",
        "https://i.dummyjson.com/data/products/49/2.jpg"
      ]
    },
    {
      "_id": "66d679bd6a12e84cee946fdb",
      "title": "Hyaluronic Acid Serum",
      "description": "L'OrÃ©️al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
      "price": 19,
      "discountPercentage": 13.31,
      "rating": 4.83,
      "stock": 110,
      "brand": "L'Oreal Paris",
      "category": "skincare",
      "thumbnail": "https://res.cloudinary.com/dplkbzr6j/image/upload/v1725395359/bookmark-foo/oyq81uhi7ntnlym0hly8.webp",
      "images": [
        "https://i.dummyjson.com/data/products/16/1.png",
        "https://i.dummyjson.com/data/products/16/2.webp",
        "https://i.dummyjson.com/data/products/16/3.jpg",
        "https://i.dummyjson.com/data/products/16/4.jpg",
        "https://i.dummyjson.com/data/products/16/thumbnail.jpg"
      ]
    }
  ]

  const handleNavigate = (id: string) => {
    // trackProductClick(id);
    router.push(`products/${id}`);
  };

  const value = "Gaming Mouse with RGB Lighting by GamerTech, Price: 45\nHyaluronic Acid Serum by L'Oreal Paris, Price: 19"
  return (
    <Box
      sx={{
        m: "50px 50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "38px",
        }}
      >
        Search Relevant Product
      </Typography>
      <Box m="20px 0">
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box>
        <Typography>
          Results:
        </Typography>
        <Box sx={{ bgcolor: "#fff", m: "20px 0", p: "30px", borderRadius: "10px" }}>
          <Typography>{value}</Typography>
          <Grid container spacing={2} mt={4}>
            {Productss.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard
                  key={index}
                  onClick={() => handleNavigate(item._id)}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  brand={item.brand}
                  category={item.category}
                  rating={item.rating}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

    </Box>
  );
};

export default ProductAdvisor;
