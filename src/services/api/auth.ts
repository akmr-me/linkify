import axiosInstance from "@/lib/axiosInstance";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";

export const authApi = {
  login: async (email: string, password: string) => {
    try {
      return await axiosInstance.post("/auth/login", { email, password });
      // No need for .data as interceptor handles it
    } catch (error) {
      throw error;
    }
  },

  generateOTP: async (email: string, password: string) => {
    try {
      return await axiosInstance.post("/auth/generate-otp", {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  },

  register: async (email: string, password: string, otp?: string | number) => {
    try {
      return await axiosInstance.post("/auth/register", {
        email,
        password,
        otp,
      });
    } catch (error) {
      throw error;
    }
  },

  googleOAuth: async (credential?: string, code?: string) => {
    if (!code && !credential) throw new Error("Google OAuth code is required");
    try {
      return await axiosInstance.post("/auth/google", { credential, code });
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      return await axiosInstance.post("/auth/logout");
    } catch (error) {
      throw error;
    }
  },
  turnstile: async (token: string): Promise<string | undefined> => {
    try {
      // Get Browser Fingerprint
      const fingerprint = await getCurrentBrowserFingerPrint();
      console.log("Browser Fingerprint:", fingerprint);
      const response = await axiosInstance.post("/auth/turnstile", {
        token,
        guestId: fingerprint,
      });
      if (response.status >= 200 && response.status < 300) {
        return fingerprint;
      }
    } catch (error) {
      throw error;
    }
  },

  forgetPassword: async (email: string) => {
    try {
      return await axiosInstance.post("/auth/forgot-password", { email });
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (
    email: string,
    password: string,
    confirmPassword: string,
    otp: string | number
  ) => {
    try {
      return await axiosInstance.post("/auth/reset-password", {
        email,
        otp,
        password,
        confirmPassword,
      });
    } catch (error) {
      throw error;
    }
  },

  verifyOTP: async (email: string, _: string, otp: string) => {
    try {
      return await axiosInstance.post("/auth/verify-otp", { email, otp });
    } catch (error) {
      throw error;
    }
  },
};
