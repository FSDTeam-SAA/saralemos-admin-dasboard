"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "@/lib/api/api"
import type { User } from "@/types/user"

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => userApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}
