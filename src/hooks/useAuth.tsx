import { authApi } from "@/services/api/auth";
export default function useAuth() {
  return {
    login: async (email: string, password: string) => {
      try {
        const response = await authApi.login(email, password);
        return response;
      } catch (error) {
        throw error;
      }
    },
    register: async (email: string, password: string) => {
      try {
        const response = await authApi.register(email, password);
        return response;
      } catch (error) {
        throw error;
      }
    },
  };
}
