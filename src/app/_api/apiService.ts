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

export const trackProductClick = async (id: string) => {
  try {
    const sessionId = getSessionId();
    await apiClient.post(`/products/${id}/click`, { sessionId });
  } catch (error: any) {
    throw handleError(error, "Failed to track product click");
  }
};

export const trackProductTimeSpend = async (
  id: string,
  timeSpend: number = 0
) => {
  try {
    const sessionId = getSessionId();
    await apiClient.post(`/products/${id}/time-spend`, {
      sessionId,
      timeSpend: Math.floor(timeSpend),
    });
  } catch (error: any) {
    throw handleError(error, "Failed to track product time-spent");
  }
};

export const handleError = (error: any, defaultMessage: string): void => {
  if (error.response) {
    // Server responded with an error
    console.error("Error response data:", error.response.data);
    console.error("Error response status:", error.response.status);
    console.error("Error response headers:", error.response.headers);
    throw new Error(
      `${defaultMessage}: ${
        error.response.data.message ||
        error.response.statusText ||
        "Unknown error"
      }`
    );
  } else if (error.request) {
    // No response received
    console.error("Error request:", error.request);
    throw new Error(`${defaultMessage}: No response from server`);
  } else {
    // Other errors
    console.error("Error message:", error.message);
    throw new Error(`${defaultMessage}: ${error.message}`);
  }
};
