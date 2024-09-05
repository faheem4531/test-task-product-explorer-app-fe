"use client";
// react/next imports
import { useRouter } from "next/navigation";
import { useState } from "react";

// third party imports
import {
  Box,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";

// hooks and components imports
import { FlatList } from "../../_components";
import ProductCard from "../../_components/productCard/ProductCard";
import useProducts from "../../_hooks/useProduct";

// icons import
import { trackProductClick } from "@/app/_api/apiService";
import SearchIcon from "@mui/icons-material/Search";
import { ThreeDots } from "react-loader-spinner";

const ProductListing = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, loadMoreProducts, hasMore, error } =
    useProducts(searchTerm);

  const handleNavigate = (id: string) => {
    trackProductClick(id);
    router.push(`products/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
        loader={<ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#29343b"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />}
        endMessage={<Typography>No more products</Typography>}
        emptyMessage={<Typography>No products found</Typography>}
        keyExtractor={(item) => item._id}
        loading={loading}
        error={error ? true : false}
      />
    </Box>
  );
};

export default ProductListing;
