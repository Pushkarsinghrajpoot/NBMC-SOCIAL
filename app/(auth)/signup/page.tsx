'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MessageCircle, Mail, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/customButton";
import { Input } from "@/components/ui/customInput";
import { useApp } from "@/context/AppContext";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  whatsappConsent: boolean;
}

export default function SignUp() {
  const { signup, isAuthenticated } = useApp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isAuthenticated) router.push("/onboarding");
  }, [isAuthenticated]);

  const password = watch("password");
  const agreeTerms = watch("agreeTerms");
  const whatsappConsent = watch("whatsappConsent");
  const isValid = agreeTerms && whatsappConsent;

  const onSubmit = async (data: SignUpFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      signup(data.email, data.password);
      toast.success("Account created!", {
        description: "Welcome to NBMC. Let's personalize your experience.",
      });
      router.push("/onboarding");
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f0f0f5_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 bg-[#111] rounded-2xl flex items-center justify-center mb-4 shadow-md">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-[#111]">Create your account</h1>
          <p className="text-sm text-[#888] mt-1">Start receiving WhatsApp updates from brands you love</p>
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
              placeholder="At least 8 characters"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[0-9])/,
                  message: "Include at least one uppercase letter and number",
                },
              })}
            />

            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />

            {/* Consent checkboxes */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    className="peer w-4 h-4 rounded border border-[#DDDDE5] accent-[#111] cursor-pointer"
                    {...register("agreeTerms", { required: true })}
                  />
                </div>
                <span className="text-sm text-[#555] leading-snug">
                  I agree to the{" "}
                  <a href="#" className="text-[#111] underline underline-offset-2 hover:text-[#333]" onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-[#111] underline underline-offset-2 hover:text-[#333]" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border border-[#DDDDE5] accent-[#111] cursor-pointer"
                    {...register("whatsappConsent", { required: true })}
                  />
                </div>
                <span className="text-sm text-[#555] leading-snug">
                  I explicitly consent to receive{" "}
                  <span className="text-[#111]">WhatsApp updates</span> from brands I follow through NBMC
                </span>
              </label>
            </div>

            {(!agreeTerms || !whatsappConsent) && (
              <p className="text-xs text-[#AAA] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 shrink-0" />
                Both consents are required to create your account
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              disabled={!isValid}
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[#999] mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-[#111] hover:underline underline-offset-2 transition-all">
            Sign in
          </Link>
        </p>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[#BBB]">
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          End-to-end encrypted · GDPR compliant · Meta approved
        </div>
      </div>
    </div>
  );
}
