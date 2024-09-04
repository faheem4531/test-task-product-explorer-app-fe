// hooks/useProducts.ts
import { useEffect, useState, useCallback } from "react";
import useDebounce from "./useDebounce";
import { getProducts } from "../_api/apiService";
import { API_LIMIT } from "../_utils/constants";

const useProducts = (searchQuery: string, limit: number = API_LIMIT) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProducts = useCallback(
    async (query: string, page: number, limit: number) => {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const response = await getProducts(query, page, limit);
        const { data, totalPages } = response;

        setProducts((prevProducts) =>
          page === 1 ? data : [...prevProducts, ...data]
        );
        setHasMore(page < totalPages);
      } catch (err: any) {
        console.error("Error fetching products:", err.message);
        setError(err.message); // Improved error message handling
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const debouncedFetchProducts = useDebounce(fetchProducts, 500);

  useEffect(() => {
    setPage(1);
    setProducts([]);
    debouncedFetchProducts(searchQuery, 1, limit);
  }, [searchQuery, debouncedFetchProducts, limit]);

  useEffect(() => {
    if (page > 1) {
      debouncedFetchProducts(searchQuery, page, limit);
    }
  }, [page, searchQuery, debouncedFetchProducts, limit]);

  const loadMoreProducts = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { products, loading, error, loadMoreProducts, hasMore };
};

export default useProducts;
