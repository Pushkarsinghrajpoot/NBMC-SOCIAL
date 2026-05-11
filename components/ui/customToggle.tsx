import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Toggle({ checked, onCheckedChange, label, description, disabled, id, className }: ToggleProps) {
  const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label htmlFor={switchId} className="text-sm text-[#111] cursor-pointer select-none">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-[#999] mt-0.5">{description}</p>
          )}
        </div>
      )}
      <Switch.Root
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
          "transition-colors duration-200 ease-in-out cursor-pointer",
          checked ? "bg-[#111]" : "bg-[#D1D1D8]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Switch.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm",
            "transition-transform duration-200 ease-in-out",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </Switch.Root>
    </div>
  );
}
