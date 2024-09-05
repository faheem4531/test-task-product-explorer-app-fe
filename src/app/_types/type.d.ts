// interfaces/Product.ts
interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface InteractionTrend {
  searches: number;
  views: number;
  clicks: number;
  time_spend: number;
  hour: number;
}

interface MostInteractedProductsResponse {
  searches: {
    _id: string;
    count: number;
  }[];
  products: {
    totalInteractions: number;
    totalClicks: number;
    totalTimeSpent: number;
    name: string;
  }[];
}

interface ConversionFunnelResponse {
  searches: number;
  views: number;
  clicks: number;
  totalTimeSpent: number;
}
