import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface ProductCardProps {
    thumbnail: string;
    title: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    rating: number;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ thumbnail, title, description, price, brand, category, rating, onClick }) => {
    return (
        <Box sx={{
            borderRadius: "4px", bgcolor: "#b7c0bb", width: "280px", m: "0 auto", cursor: "pointer",
            "&:hover": {
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15)",
            },
        }}
            onClick={onClick}
        >
            <Box sx={{ position: "relative" }}>
                <Typography
                    sx={{
                        position: "absolute",
                        left: "20px",
                        top: "20px",
                        border: "1px solid #29343b",
                        p: "2px 5px",
                        borderRadius: "4px",
                        fontSize: "14px"
                    }}>
                    {brand}
                </Typography>
                <Image src={thumbnail} alt="product image" width={280} height={280} />
                <Typography
                    sx={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                        bgcolor: "#f7a032",
                        p: "3px 5px",
                        borderRadius: "4px",
                        fontSize: "14px"
                    }}>
                    {rating}
                </Typography>
            </Box>
            <Box sx={{ padding: "10px 10px 20px" }}>
                <Typography height={"60px"} fontSize={"20px"} fontWeight={500}>{title}</Typography>
                <Typography
                    fontSize="14px"
                    m="10px 0"
                    sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        textOverflow: "ellipsis",
                    }}>
                    {description}
                </Typography>
                <Typography fontSize={"14px"} fontWeight={600} >{"$ "}{price}</Typography>
                <Typography fontSize={"14px"} mt="20px">{"Category : "}{category}</Typography>
            </Box>
        </Box>
    )
}

export default ProductCard;