/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiResponse } from "@/types/api"
import type {   SubscriptionPlan, RevenueMetrics } from "@/types/user"

import axios from "axios";

import { getSession } from "next-auth/react";
import { User, UsersApiResponse } from "../types/users";



// import { Cagliostro } from "next/font/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session?.accessToken}`;
    } else {
      console.warn("No token in session");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export async function forgetPassword(email:string) {
  try{
         const res= await api.post(`/auth/forget-password`,{email:email});
         return res.data;
  }catch(error){
    if(error instanceof  Error){
      throw new Error(error.message || 'failed to forget password')
    }
  }
  
}
export async function sentOtp(otp:string,email:string) {
  try{
         const res= await api.post(`/auth/verify-code`,{otp:otp, email:email});
         return res.data;
  }catch(error){
    if(error instanceof  Error){
      throw new Error(error.message || 'failed to forget password')
    }
  }
  
}

export async function resetPassword(newPassword:string,email:string) {
  try{
         const res= await api.post(`/auth/reset-password`,{email:email,newPassword:newPassword});
         return res.data;
  }catch(error){
    if(error instanceof  Error){
      throw new Error(error.message || 'failed to forget password')
    }
  }
  
}

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const { body, method, headers, ...rest } = options || {}

    const config: any = {
      url: endpoint,
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...rest,
    }

    if (body && typeof body === "string") {
      try {
        config.data = JSON.parse(body)
      } catch (e) {
        config.data = body
      }
    }

    const response = await api(config)

    return { data: response.data, error: null, success: true }
  } catch (error: any) {
    console.error("API Call Error:", error)
    return {
      data: null as any,
      error: error.response?.data?.message || error.message || "Unknown error",
      success: false,
    }
  }
}

// User Management API
export const userApi = {
  getUsers: (page = 1, pageSize = 10) => apiCall<UsersApiResponse>(`user/all-users`),

  getUserById: (id: string) => apiCall<User>(`/users/${id}`),

  createUser: (data: Omit<User, "id">) =>
    api.post("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateUser: (id: string, data: Partial<User>) =>
    api.put(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteUser: (id: string) =>
    apiCall<void>(`/user/${id}`, {
      method: "DELETE",
    }),
}

// Hero Section API
// export const heroApi = {
//   getHeroSections: (page = 1, pageSize = 10) =>
//     apiCall<PaginatedResponse<HeroSection>>(`/hero-sections?page=${page}&pageSize=${pageSize}`),

//   getHeroById: (id: string) => apiCall<HeroSection>(`/hero-sections/${id}`),

//   createHero: (data: Omit<HeroSection, "id" | "createdAt" | "updatedAt">) =>
//     apiCall<HeroSection>("/hero-sections", {
//       method: "POST",
//       body: JSON.stringify(data),
//     }),

//   updateHero: (id: string, data: Partial<HeroSection>) =>
//     apiCall<HeroSection>(`/hero-sections/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(data),
//     }),

//   deleteHero: (id: string) =>
//     apiCall<void>(`/hero-sections/${id}`, {
//       method: "DELETE",
//     }),
// }

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get("/dashboard/stats"),
}

// Subscriptions API
// Subscriptions API
export const subscriptionsApi = {
  getPlans: () => api.get<ApiResponse<SubscriptionPlan>>("/subscriptions/plans"),

  createPlan: (data: Partial<SubscriptionPlan>) =>
    api.post("/subscriptions/plans", data),

  deletePlan: (id: string) =>
    api.delete(`/subscriptions/plans/${id}`),

  deletePromoCode: (id: string) =>
    api.delete(`/subscriptions/promo-codes/${id}`),

  getRevenueMetrics: () => api.get<RevenueMetrics>("/subscriptions/metrics"),
}
