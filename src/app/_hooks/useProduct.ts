import { useEffect, useState, useCallback } from "react";

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
      setError(null);

      try {
        const response = await getProducts(query, page, limit);
        const { data, totalPages } = response;

        setProducts((prevProducts) => [...prevProducts, ...data]);
        setHasMore(page < totalPages);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setPage(1);
    setProducts([]);
    fetchProducts(searchQuery, 1, limit);
  }, [searchQuery, fetchProducts, limit]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(searchQuery, page, limit);
    }
  }, [page, searchQuery, fetchProducts, limit]);

  const loadMoreProducts = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { products, loading, error, loadMoreProducts, hasMore };
};

export default useProducts;
