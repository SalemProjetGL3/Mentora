// src/components/forms/SignUpForm.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import api from '@/lib/axios_auth';

interface SignUpFormProps {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: (tab: "signin" | "signup") => void;
}

export default function SignUpForm({
  setIsSubmitting,
  isSubmitting,
  setActiveTab,
}: SignUpFormProps) {
  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({});

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignUp = () => {
    const newErrors: Record<string, string> = {};

    if (!signUpData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!signUpData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(signUpData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!signUpData.password) {
      newErrors.password = "Password is required";
    } else if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setSignUpErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignUp()) return;

    setIsSubmitting(true);

    try {
      const RegistrationData = {
        username: signUpData.name,
        email: signUpData.email,
        password: signUpData.password
      };

      const response = await api.post('/auth/register', RegistrationData);

      setActiveTab("signin");
    } catch (error) {
      setSignUpErrors((prev) => ({
        ...prev,
        form: error instanceof Error ? error.message : "An unexpected error occurred",
      }));
      setIsSubmitting(false);
    }
  };

  const passwordStrengthColor =
    signUpData.password.length === 0
      ? "bg-[#334155]"
      : signUpData.password.length < 4
      ? "bg-red-500"
      : signUpData.password.length < 8
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <form onSubmit={handleSignUpSubmit} className="space-y-4">
      {signUpErrors.form && (
        <Alert variant="destructive" className="bg-red-900 border-red-700">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>{signUpErrors.form}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-white">
          Full Name
        </Label>
        <Input
          id="signup-name"
          name="name"
          type="text"
          className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
          value={signUpData.name}
          onChange={handleSignUpChange}
          required
        />
        {signUpErrors.name && <p className="text-sm text-red-400">{signUpErrors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-white">
          Email Address
        </Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
          value={signUpData.email}
          onChange={handleSignUpChange}
          required
        />
        {signUpErrors.email && <p className="text-sm text-red-400">{signUpErrors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-white">
          Password
        </Label>
        <Input
          id="signup-password"
          name="password"
          type="password"
          className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
          value={signUpData.password}
          onChange={handleSignUpChange}
          required
        />
        <div className="h-1 w-full bg-[#334155] rounded-full">
          <div
            className={`h-1 rounded-full ${passwordStrengthColor}`}
            style={{
              width: `${Math.min(100, (signUpData.password.length / 8) * 100)}%`,
            }}
          />
        </div>
        {signUpErrors.password && <p className="text-sm text-red-400">{signUpErrors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password" className="text-white">
          Confirm Password
        </Label>
        <Input
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
          value={signUpData.confirmPassword}
          onChange={handleSignUpChange}
          required
        />
        {signUpErrors.confirmPassword && (
          <p className="text-sm text-red-400">{signUpErrors.confirmPassword}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#3B82F6] hover:bg-[#4400a3] text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Sign up"
        )}
      </Button>
    </form>
  );
}
