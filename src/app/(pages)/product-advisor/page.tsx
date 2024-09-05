"use client";
// react/next imports
import { useRouter } from "next/navigation";
import { useState } from "react";

// third party imports
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";

import { getProductRecommendations } from "@/app/_api/apiService";
import ProductCard from "@/app/_components/productCard/ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import { ThreeDots } from "react-loader-spinner";

const ProductAdvisor = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [recomendation, setrecomendation] = useState<string>("")
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigate = (id: string) => {
    router.push(`products/${id}`);
  };

  const handleSearch = async () => {
    if (searchTerm) {
      const { recommendationText, recommendedProducts } = await getProductRecommendations(searchTerm);
      setrecomendation(recommendationText);
      setProducts(recommendedProducts);
      setSearchTerm("");
    }
    else {
      console.log("enter any product")
    }

  }
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
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#29343b"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <Box m="20px 0" position={"relative"}>
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
        <Button sx={{
          bgcolor: "#29343b",
          color: "#b7c0bb",
          width: "170px",
          position: "absolute",
          right: "15px",
          top: "7px",
          height: "40px"
        }}
          onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box>
        <Typography>
          Results:
        </Typography>
        <Box sx={{ bgcolor: "#f3f3f3", minHeight: "50vh", m: "20px 0", p: "30px", borderRadius: "10px" }}>
          <Typography>{recomendation}</Typography>
          <Grid container spacing={2} mt={4}>
            {products.map((item, index) => (
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
