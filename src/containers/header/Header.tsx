"use client";

import { useEffect, useState } from "react";
import { useGoogleOneTapLogin, googleLogout } from "@react-oauth/google";
import { usePathname, useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import Header from "@/components/header";
import HeaderSkeleton from "@/components/header/HeaderSkeleton";
import { refreshUser } from "@/services/auth/user";
import { authApi } from "@/services/api/auth";
import { useStore } from "@/lib/store";
import { cleanupInterceptors } from "@/lib/axiosInstance";
import { User } from "@/types";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { comingSoonRoutes } from "@/constants/routes";

export default function HeaderContainer() {
  const [enableGoogleAuthPopup, setEnableGoogleAuthPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isTurnstileAvailable, setIsTurnstileAvailable] = useState(true);
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = ["/login", "/register", "/otp"].includes(pathname);
  const isComingSoonPage = comingSoonRoutes.includes(pathname);

  useEffect(() => {
    const checkInitialUser = async () => {
      try {
        const data = await refreshUser();
        if (data) {
          setEnableGoogleAuthPopup(false);
          updateUser({ ...data, isHuman: true } as User);
        }
      } catch (error) {
        console.error("Failed to check initial user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialUser();
  }, [updateUser]);

  const handleGoogleAuthSuccess = async (data: User) => {
    setIsLoading(true);
    try {
      setEnableGoogleAuthPopup(false);
      updateUser(data);
      toast.success(`${data?.name || data?.email} logged in successfully`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuthError = (error: Error) => {
    toast.error("Authentication failed! Please try again.");
    console.error("Google OAuth failed:", error);
    setEnableGoogleAuthPopup(true);
  };

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      setIsLoading(true);
      try {
        const response = await authApi.googleOAuth(
          credentialResponse.credential!
        );
        if (response?.data) {
          await handleGoogleAuthSuccess(response.data as User);
        }
      } catch (error) {
        handleGoogleAuthError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => handleGoogleAuthError(new Error("Login Failed")),
    disabled: !user?.isHuman || !enableGoogleAuthPopup || isAuthPage,
    use_fedcm_for_prompt: true,
  });

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      googleLogout();
      await authApi.logout();
      updateUser(null);
      toast.success("Logged out successfully");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserGeneration = async (guestId: string) => {
    try {
      const data = await refreshUser();
      if (data) {
        setEnableGoogleAuthPopup(false);
        updateUser({ ...data, isHuman: true, guestId } as User);
      } else {
        updateUser({ isHuman: true, guestId });
        setEnableGoogleAuthPopup(true);
      }
    } catch (error) {
      console.error("Failed to generate user ID:", error);
      setEnableGoogleAuthPopup(true);
      toast.error("Failed to generate user ID. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTurnstileSuccess = async (token: string) => {
    try {
      const guestId = await authApi.turnstile(token);
      if (guestId) {
        await handleUserGeneration(guestId);
        return;
      }
    } catch (error) {
      console.error("Turnstile error:", error);
      setIsTurnstileAvailable(false);
    }
    console.error("Turnstile verification failed");
    updateUser({ isHuman: false } as User);
    setIsLoading(false);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      toast.info("Development mode");
    }
    return () => cleanupInterceptors();
  }, []);

  return (
    <>
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <>
          {isTurnstileAvailable && (
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={handleTurnstileSuccess}
              onError={() => {
                console.error("Turnstile error");
                updateUser({ isHuman: false } as User);
                toast.error("Human verification failed");
                setIsTurnstileAvailable(false);
                setIsLoading(false);
              }}
              onExpire={() => {
                console.error("Turnstile expired");
                setIsTurnstileAvailable(false);
                setIsLoading(false);
              }}
              className="hidden"
              options={{ size: "invisible", retry: "never" }}
            />
          )}
          <Header
            user={user}
            handleLogout={handleLogout}
            isComingSoonPage={isComingSoonPage}
          />
        </>
      )}
      <div className="fixed top-4 right-4 z-50">
        <Toaster
          richColors
          closeButton
          position={
            process.env.NODE_ENV === "development" ? "top-left" : "top-center"
          }
        />
      </div>
    </>
  );
}
