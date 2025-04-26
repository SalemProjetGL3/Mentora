// src/components/forms/SignInForm.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/axios_auth";

interface SignInFormProps {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignInForm({
  setIsSubmitting,
  isSubmitting,
}: SignInFormProps) {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signInErrors, setSignInErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignIn = () => {
    const newErrors: Record<string, string> = {};

    if (!signInData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(signInData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!signInData.password) {
      newErrors.password = "Password is required";
    }

    setSignInErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const LoginData = {
        email: signInData.email,
        password: signInData.password
      };
      
      const response = await api.post('/auth/login', LoginData);
      console.log('Login successful:', response.data);

      window.location.href = '/dashboard';

    } catch (error) {
      setIsSubmitting(false);
      alert('Login failed. Please check your credentials and try again.');
    }
    
    e.preventDefault();

    if (!validateSignIn()) return;

    setIsSubmitting(true);
    setFormError(null); // Clear previous form errors
  };

  return (
    <form onSubmit={handleSignInSubmit} className="space-y-6">
      {formError && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="signin-email" className="text-white">
          Email Address
        </Label>
        <Input
          id="signin-email"
          name="email"
          type="email"
          className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
          value={signInData.email}
          onChange={handleSignInChange}
          required
        />
        {signInErrors.email && (
          <p className="text-sm text-red-400">{signInErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password" className="text-white">
          Password
        </Label>
        <Input
          id="signin-password"
          name="password"
          type="password"
          className="bg-[#0F172A] border-[#334155] text-white focus:border-[#5b00b3]"
          value={signInData.password}
          onChange={handleSignInChange}
          required
        />
        {signInErrors.password && (
          <p className="text-sm text-red-400">{signInErrors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-[#3B82F6] hover:text-[#2563EB]"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#3B82F6] hover:bg-[#4400a3] text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
