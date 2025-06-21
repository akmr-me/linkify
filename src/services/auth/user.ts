import axiosInstance from "@/lib/axiosInstance";
// import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { User } from "@/types";

// interface GuestIdResponse {
//   success: boolean;
//   data?: User;
//   error?: string;
// }

export const refreshUser = async (): Promise<User | null> => {
  try {
    // First try to refresh the token
    const response = await axiosInstance.get<User>("/auth/refresh");
    return response.data;
  } catch (refreshError) {
    try {
      console.log(
        "Failed to refresh token, generating guest ID...",
        refreshError
      );
      // // If refresh fails, generate and set guest ID
      // const fingerprint = await getCurrentBrowserFingerPrint();

      // const guestResponse = await axiosInstance.post<GuestIdResponse>(
      //   "/auth/set-guest-id",
      //   {
      //     guestId: fingerprint,
      //   }
      // );
      // console.log("Guest ID response:", guestResponse);
      // if (guestResponse?.data) {
      //   return guestResponse.data as unknown as User;
      // }
      // console.log({ guestResponse });
      return null;
    } catch (guestError) {
      console.error("Failed to set guest ID:", guestError);
      return null;
    }
  }
};

// Optional: Add a function to check if user is guest
export const isGuestUser = (user: User | null): boolean => {
  return !!user?.guestId;
};
