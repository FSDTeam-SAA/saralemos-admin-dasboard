import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteHero, fetchAllHero, uploadHero } from "../api/updatehero";

export function useUpdateHero() {
  return useMutation({
    mutationKey: ['hero-upload'],
    mutationFn: (data: FormData) => uploadHero(data),
  })
}

export function useDeleteHero() {
  return useMutation({
    mutationKey: ['hero-upload'],
    mutationFn: (id:string) => deleteHero(id),
  })
}


export function useGetAllHero() {
  return useQuery({
    queryKey: ["hero"],
    queryFn: fetchAllHero,
  })
}


