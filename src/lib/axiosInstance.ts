import { refreshUser } from "@/services/auth/user";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from "axios";

// Type for request with sent flag
interface RequestWithSentFlag extends InternalAxiosRequestConfig {
  sent?: boolean;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

// Store interceptor IDs for cleanup
const interceptors = {
  request: axiosInstance.interceptors.request.use(
    (config) => {
      // Add any request interceptor logic here
      return config;
    },
    (error) => Promise.reject(error)
  ),
  response: axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const prevRequest = error.config as RequestWithSentFlag;

      try {
        if (error.response?.status === 406 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshUser();
          return axiosInstance(prevRequest);
        }

        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error during request setup:", error.message);
        }
      } catch (retryError) {
        console.error("Error during retry attempt:", retryError);
      }

      return Promise.reject(error);
    }
  ),
};

// Cleanup function to remove all interceptors
export const cleanupInterceptors = () => {
  Object.values(interceptors).forEach((interceptor) => {
    axiosInstance.interceptors.response.eject(interceptor);
  });
};

export default axiosInstance;
