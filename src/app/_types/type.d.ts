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

interface InteractionData {
  x: string;
  y: number;
}

interface MostInteractedItem {
  name: string;
  data: InteractionData[];
}

// interfaces/apiService.ts
interface ProductApiResponse {
  data: IProduct[];
  page: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
}
interface MostInteractedProductsResponse {
  searches: MostInteractedItem[];
  products: MostInteractedItem[];
}

interface ConversionFunnelResponse {
  searches: number;
  views: number;
  clicks: number;
  totalTimeSpent: number;
}

interface ProductRecommendationsResponse {
  recommendationText: string;
  recommendedProducts: IProduct[];
}
