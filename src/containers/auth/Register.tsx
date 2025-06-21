"use client";
import Register from "@/components/auth/Register";
import { useStore } from "@/lib/store";
import { getErrorMessage } from "@/lib/utils";
import { authApi } from "@/services/api/auth";
import { GoogleOAuthCodeResponse, User } from "@/types";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const updateAuth = useStore((state) => state.updateAuth);
  const updateUser = useStore((state) => state.updateUser);

  const googleOAuthLogin = useGoogleLogin({
    onSuccess: async (codeResponse: GoogleOAuthCodeResponse) => {
      setIsLoading(true);
      try {
        const response = await authApi.googleOAuth(
          undefined,
          codeResponse.code
        );
        if (response) {
          updateUser(response.data as User);
          toast.success(response.data.message || "Login successful!");
          router.replace("/"); // Redirect to dashboard after successful login
        } else {
        }
      } catch (error) {
        console.error("Google OAuth failed:", error);
        toast.error("Authentication failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google OAuth error:", errorResponse);
      setIsLoading(false);
    },
    flow: "auth-code",
  });

  const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await authApi.generateOTP(email, password);
      if (response.status === 200) {
        toast.success(response.data.message || "OTP sent successfully!");
        updateAuth({ email, password });
        router.push("/otp");
      }
    } catch (error: unknown) {
      console.log("Error during registration:", error);
      const formattedError = getErrorMessage(error);
      toast.error(formattedError || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = isLoading || !email || !password;
  return (
    <Register
      email={email}
      password={password}
      handleOnEmailChange={handleOnEmailChange}
      handleOnPasswordChange={handleOnPasswordChange}
      handleOnSubmit={handleOnSubmit}
      isSubmitDisabled={isSubmitDisabled}
      googleOAuthLogin={googleOAuthLogin}
    />
  );
}
