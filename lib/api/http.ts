import { ApiResponse } from '@/types/api_response';

export const BASE_URL = `http://localhost:5165/api/v1`;

export async function http<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      return {
        data: null,
        success: false,
        detail: (errorBody as any)?.detail || `HTTP error ${res.status}`,
      };
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    clearTimeout(timeoutId);
    return {
      data: null,
      success: false,
      detail: err.message || 'Timeout: Gagal terhubung ke server',
    };
  }
}