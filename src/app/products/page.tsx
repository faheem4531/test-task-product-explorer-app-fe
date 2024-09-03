'use client'

import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useRouter } from "next/navigation";
import ProductCard from "../_components/productCard/ProductCard";

const image = "https://res.cloudinary.com/dplkbzr6j/image/upload/v1725395359/bookmark-foo/oyq81uhi7ntnlym0hly8.webp"

const ProductListing = () => {
  const router = useRouter()
  const cards = [
    {
      title: "Product 1",
      description: "An apple mobile which is nothing like apple",
      price: 459,
      ratting: 4.8,
      brand: "Apple",
      category: "smartphone",
      stock: 92,
      discountPerenctage: 12.32,
      image: [],
      thumbnail: image,
      id: "p1"
    },
    {
      title: "Product 1",
      description: "An apple mobile which is nothing like apple,An apple mobile which is nothing like apple.An apple mobile which is nothing like apple",
      price: 459,
      ratting: 4.8,
      brand: "microsoft surface",
      category: "smartphone",
      stock: 92,
      discountPerenctage: 12.32,
      image: [],
      thumbnail: image,
      id: "p2"
    },
    {
      title: "Product 1",
      description: "An apple mobile which is nothing like apple",
      price: 459,
      ratting: 4.8,
      brand: "Impression of Acqua Di Gio",
      category: "smartphone",
      stock: 92,
      discountPerenctage: 12.32,
      image: [],
      thumbnail: image,
      id: "p3"
    },
    {
      title: "Product 1",
      description: "An apple mobile which is nothing like apple",
      price: 459,
      ratting: 4.8,
      brand: "Apple",
      category: "smartphone",
      stock: 92,
      discountPerenctage: 12.32,
      image: [],
      thumbnail: image,
      id: "p4"
    },
    {
      title: "Product 1",
      description: "An apple mobile which is nothing like apple",
      price: 459,
      ratting: 4.8,
      brand: "Apple",
      category: "smartphone",
      stock: 92,
      discountPerenctage: 12.32,
      image: [],
      thumbnail: image,
      id: "p4"
    },
    {
      title: "Product 1",
      description: "An apple mobile which is nothing like apple",
      price: 459,
      ratting: 4.8,
      brand: "Apple",
      category: "smartphone",
      stock: 92,
      discountPerenctage: 12.32,
      image: [],
      thumbnail: image,
      id: "p5"
    },
    {
      title: "Product 1",
      description: "An apple mobile which is nothing like apple",
      price: 459,
      ratting: 4.8,
      brand: "Apple",
      category: "smartphone",
      stock: 92,
      discountPerenctage: 12.32,
      image: [],
      thumbnail: image,
      id: "p6"
    },
  ]
  
  function handleNavigate(id: string) {
    router.push(`products/${id}`);
  }

  return (
    <Box sx={{
      m: "50px 50px",
    }}>
      <Typography sx={{
        fontSize: "38px",
      }}>
        Products
      </Typography>
      <Box m="20px 0">
        Searchbar
      </Box>
      <Box sx={{
        m: "0 auto 100px",
      }}>
        <Grid container spacing={2}>
          {cards.map((item, index) => <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={index} >
            <ProductCard
              onClick={() => handleNavigate(item.id)}
              thumbnail={item.thumbnail}
              title={item.title}
              description={item.description}
              price={item.price}
              brand={item.brand}
              category={item.category}
              ratting={item.ratting}
            />
          </Grid>
          )}
        </Grid>
      </Box>

    </Box>
  );
}

export default ProductListing;