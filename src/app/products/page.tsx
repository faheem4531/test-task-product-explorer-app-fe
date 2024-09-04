"use client";
// react/next imports
import { useState } from "react";
import { useRouter } from "next/navigation";

// third party imports
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// hooks and components imports
import useDebounce from "../_hooks/useDebounce";
import useProducts from "../_hooks/useProduct";
import ProductCard from "../_components/productCard/ProductCard";
import { FlatList } from "../_components";

// icons import
import SearchIcon from "@mui/icons-material/Search";

const ProductListing = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, loadMoreProducts, hasMore } =
    useProducts(searchTerm);

  const handleNavigate = (id: string) => {
    router.push(`products/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = useDebounce(handleSearchChange, 500);

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
        Products
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
      <FlatList
        data={products}
        renderItem={(item) => (
          <ProductCard
            onClick={() => handleNavigate(item._id)}
            thumbnail={item.thumbnail}
            title={item.title}
            description={item.description}
            price={item.price}
            brand={item.brand}
            category={item.category}
            rating={item.rating}
          />
        )}
        loadMore={loadMoreProducts}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={<Typography>No more products</Typography>}
        emptyMessage={<Typography>No products found</Typography>}
        keyExtractor={(item) => item._id}
        loading={loading}
      />
    </Box>
  );
};

export default ProductListing;
