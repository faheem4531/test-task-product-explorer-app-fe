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
    const response = await apiClient.get("/products", {
      params: {
        search: searchQuery,
        page,
        limit,
        sessionId: "temp", // Example session ID
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response:", error.response);
      throw new Error(
        `Failed to fetch products: ${
          error.response.data.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
      throw new Error("Failed to fetch products: No response from server");
    } else {
      console.error("Error message:", error.message);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }
};
