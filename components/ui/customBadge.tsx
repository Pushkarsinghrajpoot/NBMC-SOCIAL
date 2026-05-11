import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "gray" | "blue" | "red" | "yellow" | "default";
  dot?: boolean;
}

export function Badge({ variant = "default", dot, children, className, ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#F3F3F5] text-[#555]",
    green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80",
    gray: "bg-[#F3F3F5] text-[#666] ring-1 ring-[#E0E0E5]",
    blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/80",
    red: "bg-red-50 text-red-700 ring-1 ring-red-200/80",
    yellow: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80",
  };

  const dotColors = {
    default: "bg-[#AAA]",
    green: "bg-emerald-500",
    gray: "bg-[#AAA]",
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-amber-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
