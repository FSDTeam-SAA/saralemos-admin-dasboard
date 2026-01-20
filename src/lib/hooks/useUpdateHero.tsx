import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHero, fetchAllHero, uploadHero } from "../api/updatehero";
import { toast } from "sonner";

export function useUpdateHero() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['hero-upload'],
    mutationFn: (data: FormData) => uploadHero(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success(res?.message || "Hero asset updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update hero asset");
    }
  })
}

export function useDeleteHero() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['hero-upload'],
    mutationFn: (id:string) => deleteHero(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success(res?.message || "Hero asset deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete hero asset");
    }
  })
}


export function useGetAllHero() {
  return useQuery({
    queryKey: ["hero"],
    queryFn: fetchAllHero,
  })
}


