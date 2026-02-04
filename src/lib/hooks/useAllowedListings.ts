import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAllowedListings } from "../api/allowedListings";
import { toast } from "sonner";

export function useUpdateAllowedListings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      allowedListings,
    }: {
      userId: string;
      allowedListings: number;
    }) => updateAllowedListings(userId, allowedListings),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(res?.message || "Allowed listings updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update allowed listings");
    },
  });
}
