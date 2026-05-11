import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
      primary: "bg-[#111] text-white hover:bg-[#333] active:bg-[#000]",
      secondary: "bg-[#F3F3F5] text-[#111] hover:bg-[#E8E8EC] active:bg-[#DCDCE2]",
      ghost: "text-[#555] hover:bg-[#F3F3F5] active:bg-[#E8E8EC]",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
      outline: "border border-[#E0E0E5] bg-white text-[#111] hover:bg-[#F9F9FB] active:bg-[#F3F3F5]",
    };

    const sizes = {
      sm: "text-sm px-3 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-9",
      lg: "text-base px-5 py-2.5 h-11",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
