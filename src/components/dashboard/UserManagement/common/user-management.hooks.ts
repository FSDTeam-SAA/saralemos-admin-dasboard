"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "@/lib/api/api"
import type { User } from "@/lib/types/users"
import { toast } from "sonner"

export const useUsers = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => userApi.getUsers(page, pageSize),
  })
}

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userApi.getUserById(id),
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<User, "id">) => userApi.createUser(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success(res.status || "User created successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user")
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => userApi.updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success(data.status || "User updated successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user")
    }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success(data.success || data.success || 'User Deleted Successfully');
    },
    onError:(error)=>{
      toast.error(error.message || 'User Deletion Failed');
    }
  })
}
