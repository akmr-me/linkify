"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useStore } from "@/lib/store";
import { authApi } from "@/services/api/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { getErrorMessage } from "@/lib/utils";

interface OTPState {
  value: string;
  isResendEnabled: boolean;
  resendTimeout: number | null;
  isVerifying: boolean;
}

export default function OTP() {
  const router = useRouter();
  const auth = useStore((state) => state.auth);
  const updateUser = useStore((state) => state.updateUser);
  const updateAuth = useStore((state) => state.updateAuth);
  const isRegistrationComplete = auth?.email && auth?.password;

  const [state, setState] = useState<OTPState>({
    value: "",
    isResendEnabled: false,
    resendTimeout: 30,
    isVerifying: false,
  });
  // Protect route
  useEffect(() => {
    if (!auth?.email) {
      router.replace("/register");
    }
  }, [auth?.email, auth?.password, router]);

  // Handle OTP verification
  const handleVerifyEmail = useCallback(async () => {
    if (state.isVerifying) return;

    setState((prev) => ({ ...prev, isVerifying: true }));
    try {
      const response = await authApi[
        isRegistrationComplete ? "register" : "verifyOTP"
      ](auth?.email || "", auth?.password || "", state.value);
      if (response.request?.responseURL.includes("verify-otp")) {
        router.push("/confirm-password");
        updateAuth({ email: auth?.email || "", otp: state.value });
        return;
      }
      updateUser({ email: response.data.email, isHuman: true });
      updateAuth(null);
      toast.success("Email verified successfully!");
      router.push("/");
    } catch (error: unknown) {
      const formattedError = getErrorMessage(error);
      toast.error(formattedError || "Verification failed. Please try again.");
    } finally {
      setState((prev) => ({ ...prev, isVerifying: false }));
    }
  }, [state.value, state.isVerifying, auth, updateUser, updateAuth, router]);

  // Handle resend code
  const handleResendCode = useCallback(async () => {
    try {
      await authApi[isRegistrationComplete ? "generateOTP" : "forgetPassword"](
        auth?.email || "",
        auth?.password || ""
      );
      setState((prev) => ({
        ...prev,
        value: "",
        resendTimeout: 30,
        isResendEnabled: false,
      }));
      toast.success("Verification code resent!");
    } catch (error: unknown) {
      const formattedError = getErrorMessage(error);
      toast.error(formattedError || "Failed to resend code. Please try again.");
    }
  }, [auth]);

  // Resend timeout effect
  useEffect(() => {
    if (state.resendTimeout === null || state.resendTimeout === 0) return;

    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        resendTimeout: prev.resendTimeout! - 1,
        isResendEnabled: prev.resendTimeout === 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [state.resendTimeout]);

  const maskedEmail =
    auth?.email?.replace(/(.{2})(.*)(?=@)/, "$1****") || "*****";

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the 4-digit code sent to your email address{" "}
          <span className="font-semibold">{maskedEmail}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="mx-auto">
        <InputOTP
          maxLength={4}
          value={state.value}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={(value) => setState((prev) => ({ ...prev, value }))}
        >
          <InputOTPGroup className="gap-2">
            {[...Array(4)].map((_, i) => (
              <>
                <InputOTPSlot key={i} index={i} />
                {i < 3 && <InputOTPSeparator />}
              </>
            ))}
          </InputOTPGroup>
        </InputOTP>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full cursor-pointer"
          disabled={state.value.length < 4 || state.isVerifying}
          onClick={handleVerifyEmail}
        >
          {state.isVerifying ? "Verifying..." : "Verify Email"}
        </Button>
        <Button
          variant="ghost"
          className="w-full cursor-pointer"
          onClick={handleResendCode}
          disabled={!state.isResendEnabled}
        >
          Resend Code {state.resendTimeout ? `in ${state.resendTimeout}s` : ""}
        </Button>
      </CardFooter>
    </Card>
  );
}
