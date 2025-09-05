import { ApiResponse } from "@/types/api_response";
import { useCallback, useState } from "react";

export function useFetchState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetError = () => setError(null);
  const toggleLoading = () => setLoading(!loading);

  /**
   * fetchData menerima fungsi async yang return ApiResponse<T>
   */
  const fetchData = useCallback(
    async <T>(asyncFunc: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunc();

        if (!result.success) {
          setError(result.detail);
        }
        return result;
      } catch (err: any) {
        const message = err.message || "Terjadi kesalahan";
        setError(message);
        return { data: null, success: false, detail: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, setLoading, error, setError, fetchData, resetError, toggleLoading };
}
