"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import PasswordInput from "./Password";

interface LoginProps {
  googleOAuthLogin: () => void;
  onEmailLogin: () => void;
  isLoginDisabled?: boolean;
  password?: string;
  email?: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Login({
  googleOAuthLogin,
  onEmailLogin,
  isLoginDisabled,
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: LoginProps) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
          <Button
            variant="outline"
            onClick={googleOAuthLogin}
            className="cursor-pointer"
          >
            <Icons.google />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div className="grid gap-2">
          <PasswordInput
            id="password"
            value={password}
            onChange={onPasswordChange}
            label="Password"
          />
        </div>
        <div className="text-sm text-right">
          <Link
            href="/reset-password"
            className="text-muted-foreground hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full cursor-pointer"
          onClick={onEmailLogin}
          disabled={isLoginDisabled}
        >
          Login
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
