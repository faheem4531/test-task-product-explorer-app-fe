import { Box } from "@mui/material";
import Link from "next/link";

interface FeatureCardProps {
  href: string;
  bgcolor: string;
  hoverBgColor: string;
  boxShadow: string;
  text: string;
  textColor: string;
}

const FeatureCard = ({
  href,
  bgcolor,
  hoverBgColor,
  boxShadow,
  text,
  textColor,
}: FeatureCardProps) => {
  const linkStyle = {
    width: "100%",
    height: "100%",
    textDecoration: "none",
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "35px",
    fontWeight: 500,
    textAlign: "center" as const, // Type assertion to fix type error
    transition: "background-color 0.3s ease-in-out",
    color: textColor,
    boxShadow: boxShadow,
    bgcolor: bgcolor,
    "&:hover": {
      bgcolor: hoverBgColor,
    },
  };

  return (
    <Link href={href} passHref style={linkStyle}>
      <Box sx={containerStyle}>{text}</Box>
    </Link>
  );
};

export default FeatureCard;
