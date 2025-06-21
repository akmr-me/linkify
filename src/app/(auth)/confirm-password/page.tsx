"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/auth/Password";
import { authApi } from "@/services/api/auth";
import { getErrorMessage } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function ConfirmPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useStore((state) => state.auth);
  const updateAuth = useStore((state) => state.updateAuth);
  const updateUser = useStore((state) => state.updateUser);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.resetPassword(
        auth?.email || "",
        password,
        confirmPassword,
        auth?.otp || ""
      );
      if (response.status === 201) {
        toast.success("Password reset successfull!");
        updateUser({ email: response.data.email, isHuman: true });
        updateAuth(null);
        router.push("/");
      }
    } catch (error: unknown) {
      const formattedError = getErrorMessage(error);
      toast.error(
        formattedError || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.email || !auth?.otp) {
      toast.error("Invalid request. Please try again.");
      router.push("/register");
    }
  }, []);

  const isSubmitDisabled =
    !password || !confirmPassword || password !== confirmPassword || isLoading;

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <PasswordInput
            id="password"
            label="New Password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
        </div>
        <div className="grid gap-2">
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full cursor-pointer"
          onClick={handleResetPassword}
          disabled={isSubmitDisabled}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={() => router.push("/login")}
          >
            Back to login
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
