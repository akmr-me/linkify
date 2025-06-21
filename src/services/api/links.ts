import axiosInstance from "@/lib/axiosInstance";

export const linksApi = {
  shortenLink: async (url: string, alias?: string) => {
    try {
      const response = await axiosInstance.post("/url", {
        fullURL: url,
        alias: alias || "",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getLinks: async (page: number, limit: number) => {
    try {
      const response = await axiosInstance.get(
        `/url?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching links:", error);
      throw error;
    }
  },

  deleteLink: async (id: string) => {
    if (!id) return;
    if (id.includes("/")) id = id.split("/")[1];
    try {
      const response = await axiosInstance.delete(`url/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
