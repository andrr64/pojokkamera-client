import { ApiResponse } from "@/types/api_response";

export const BASE_URL = `http://localhost:5165/api/v1`;

export async function http<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 detik

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(
        (errorBody as any)?.detail || `HTTP error ${res.status}`
      );
    }

    return res.json();
  } catch (err) {
    clearTimeout(timeoutId);

    // Kembalikan response default jika timeout atau error
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      detail: "Timeout: Gagal terhubung dengan server",
    };

    return response as unknown as T;
  }
}
