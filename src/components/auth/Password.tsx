import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOffIcon } from "lucide-react";

export default function PasswordInput({
  id,
  value,
  onChange,
  label = "Password",
}: React.ComponentProps<"input"> & { label: string } & {
  error?: string | undefined;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid gap-2 relative">
      <Label htmlFor="password">{label}</Label>
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        placeholder="Password"
      />
      {showPassword ? (
        <EyeOffIcon
          className="absolute right-2 top-[50%] cursor-pointer"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <Eye
          className="absolute right-2 top-[50%] cursor-pointer"
          onClick={() => value && setShowPassword(true)}
        />
      )}
    </div>
  );
}
