// types/api_response.ts

export interface ApiResponse<T> {
  success: boolean;   // sama dengan Success di C#
  detail: string;     // sama dengan Detail di C#
  data: T | null;     // sama dengan Data (nullable)
}