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
  const [recomendation, setRecomendation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigate = (id: string) => {
    router.push(`products/${id}`);
  };

  const handleSearch = async () => {
    if (searchTerm) {
      setLoading(true);
      setSearchPerformed(true);
      const { recommendationText, recommendedProducts } = await getProductRecommendations(searchTerm);
      setRecomendation(recommendationText);
      setProducts(recommendedProducts);
      setLoading(false);
      setSearchTerm("");
    } else {
      console.log("enter any product");
    }
  };

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
        Search Relevant Products
      </Typography>

      {/* Search Box */}
      <Box m="20px 0" position={"relative"}>
        <TextField
          variant="outlined"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: "50px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#29343B",
              },
              "&:hover fieldset": {
                borderColor: "#29343B",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#29343B"
              },
            },
          }}
        />
        <Button
          sx={{
            bgcolor: "#29343b",
            color: "#fff",
            width: "170px",
            position: "absolute",
            right: "15px",
            top: "7px",
            height: "40px",
            borderRadius: "50px",
            "&:hover": {
              bgcolor: "#1f2a33",
            },
          }}
          disabled={loading}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" color="#29343b" mb={2}>
          Results:
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <ThreeDots visible={true} height="80" width="80" color="#29343b" />
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: "#F8F8F3",
              minHeight: "50vh",
              m: "20px 0",
              p: "30px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {searchPerformed && products.length === 0 ? (
              <Typography
                variant="h6"
                color="#29343B"
                textAlign="center"
              >
                No products found. Try a different search.
              </Typography>
            ) : (
              <>
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
              </>)}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductAdvisor;
