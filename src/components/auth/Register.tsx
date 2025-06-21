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
import { type Register } from "@/types";
import Link from "next/link";
import PasswordInput from "./Password";

export default function Register({
  email,
  password,
  handleOnEmailChange,
  handleOnPasswordChange,
  handleOnSubmit,
  isSubmitDisabled,
  googleOAuthLogin,
}: Register) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={googleOAuthLogin}
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
            onChange={handleOnEmailChange}
          />
        </div>
        <div className="grid gap-2">
          {/* <Label htmlFor="password">Password</Label> */}
          {/* <Input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={handleOnPasswordChange}
          /> */}
          <PasswordInput
            id="password"
            value={password}
            onChange={handleOnPasswordChange}
            label="Password"
          />
        </div>
        <div className="text-sm text-right">
          <Link
            href="/reset-password"
            // href={{ pathname: "/secret", query: { fromLink: "true" } }}
            className="text-muted-foreground hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full cursor-pointer"
          onClick={handleOnSubmit}
          disabled={isSubmitDisabled}
        >
          Create account
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
