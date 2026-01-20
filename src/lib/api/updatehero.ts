import api from "./api";

export async function uploadHero(data: FormData) {
  try {
    const res = await api.post("/cms/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to upload hero");
    }
  }
}

export async function deleteHero(id: string) {
  try {
    const res = await api.post(`/cms/delete/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to upload hero");
    }
  }
}

export async function fetchAllHero() {
  try {
    const res = await api.get("cms/assets");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to upload hero");
    }
  }
}
