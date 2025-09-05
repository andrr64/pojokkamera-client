// src/lib/api/auth.service.ts
import { API_ROUTE } from "@/route/api_route";
import { http } from "../http";
import { ApiResponse } from "@/types/api_response";
import { UserLogin, UserRegister } from "@/types/user.type";

export const AuthService = {
    async login(data: UserLogin) {
        return http<ApiResponse<any>>(API_ROUTE.auth.login, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
    async register(data: UserRegister) {
        return http<ApiResponse<any>>(API_ROUTE.auth.register, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}