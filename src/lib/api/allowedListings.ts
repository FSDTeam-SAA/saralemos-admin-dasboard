import api from "./api";

export async function updateAllowedListings(
  userId: string,
  allowedListings: number,
) {
  try {
    const res = await api.patch(`/user/${userId}/allowed-listings`, {
      allowedListings,
    });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update allowed listings");
    }
  }
}
