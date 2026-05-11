'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MessageCircle, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/customButton";
import { Input } from "@/components/ui/customInput";
import { useApp } from "@/context/AppContext";
interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { login, isAuthenticated, onboardingCompleted } = useApp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(onboardingCompleted ? "/dashboard" : "/onboarding");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((r) => setTimeout(r, 900));
    try {
      login(data.email, data.password);
      toast.success("Welcome back!", { description: "You've been signed in successfully." });
      router.push(onboardingCompleted ? "/dashboard" : "/onboarding");
    } catch {
      toast.error("Sign in failed", { description: "Please check your credentials and try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f0f0f5_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 bg-[#111] rounded-2xl flex items-center justify-center mb-4 shadow-md">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-[#111]">Welcome back</h1>
          <p className="text-sm text-[#888] mt-1">Sign in to your NBMC account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#EAEAEF] rounded-2xl shadow-sm p-8 space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />

            <div className="flex items-center justify-end">
              <a href="#" className="text-xs text-[#888] hover:text-[#111] transition-colors" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#F0F0F5]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#999] mt-5">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#111] hover:underline underline-offset-2 transition-all">
            Create account
          </Link>
        </p>

        {/* Trust indicator */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[#BBB]">
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          WhatsApp verified platform · Meta Business Partner
        </div>
      </div>
    </div>
  );
}
