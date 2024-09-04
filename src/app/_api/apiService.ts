// services/apiService.ts
import { getSessionId } from "../_utils/helpers";
import apiClient from "./apiClient";

export interface ApiResponse {
  data: IProduct[];
  page: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
}

export const getProducts = async (
  searchQuery: string = "",
  page: number = 1,
  limit: number = 60
): Promise<ApiResponse> => {
  try {
    const sessionId = getSessionId();
    const response = await apiClient.get("/products", {
      params: {
        search: searchQuery,
        page,
        limit,
        sessionId,
      },
    });
    return response.data;
  } catch (error: any) {
    throw handleError(error, "Failed to fetch products");
  }
};

export const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const sessionId = getSessionId();
    const response = await apiClient.get(`/products/${id}`, {
      params: { sessionId },
    });
    return response.data;
  } catch (error: any) {
    throw handleError(error, "Failed to fetch product details");
  }
};

const handleError = (error: any, defaultMessage: string) => {
  if (error.response) {
    console.error("Error response:", error.response);
    throw new Error(
      `${defaultMessage}: ${
        error.response.data.message ||
        error.response.statusText ||
        "Unknown error"
      }`
    );
  } else if (error.request) {
    console.error("Error request:", error.request);
    throw new Error(`${defaultMessage}: No response from the server`);
  } else {
    console.error("Error message:", error.message);
    throw new Error(`${defaultMessage}: ${error.message}`);
  }
};
