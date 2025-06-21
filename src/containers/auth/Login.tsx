"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import LoginComponent from "@/components/auth/Login";
import { authApi } from "@/services/api/auth";
import { useStore } from "@/lib/store";
import { GoogleOAuthCodeResponse, User } from "@/types";

export default function LoginContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateUser = useStore((state) => state.updateUser);
  const router = useRouter();

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleEmailLogin = async () => {
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);
      if (response) {
        updateUser(response.data as User);
        toast.success(response.data.message || "Login successful!");
        router.replace("/");
      } else {
      }
    } catch (error) {
      console.error("Email login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  const isLoginDisabled = isLoading || !email || !password;

  return (
    <LoginComponent
      googleOAuthLogin={googleOAuthLogin}
      onEmailLogin={handleEmailLogin}
      isLoginDisabled={isLoginDisabled}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      email={email}
      password={password}
    />
  );
}
