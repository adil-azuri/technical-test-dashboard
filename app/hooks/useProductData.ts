import { useState, useEffect, useCallback } from "react";
import { next_api } from "../utils/axios";

export interface ProductType {
  product_id: string;
  product_title: string;
  product_price: number;
  product_description?: string;
  product_image?: string;
  product_category?: string;
  created_timestamp: string;
  updated_timestamp: string;
}

export const useProductData = (searchQuery?: string) => {
  const [data, setData] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Next.js API Route (Proxy) /api/products
      const params = searchQuery ? { search: searchQuery } : {};
      const response = await next_api.get(`/api/products`, { params });

      setData(Array.isArray(response.data.data) ? response.data.data : []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "Gagal memuat produk.";
      setError(errorMessage);
      console.error("Fetch Products Error from Hook:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, loading, error, refetch: fetchData };
};
