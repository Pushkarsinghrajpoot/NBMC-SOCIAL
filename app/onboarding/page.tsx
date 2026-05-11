'use client'
import React, { useState, useMemo, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Check, MessageCircle, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/customButton";
import { Input } from "@/components/ui/customInput";
import { Badge } from "@/components/ui/customBadge";
import { useApp, BRANDS } from "@/context/AppContext";
import { cn } from "../../lib/utils";

export default function Onboarding() {
  const { completeOnboarding, isAuthenticated, onboardingCompleted } = useApp();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
    if (onboardingCompleted) router.push("/dashboard");
  }, [isAuthenticated, onboardingCompleted]);

  const filtered = useMemo(() => {
    if (!query.trim()) return BRANDS;
    const q = query.toLowerCase();
    return BRANDS.filter(
      (b:any) =>
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = async () => {
    if (selected.size === 0) {
      toast.error("Select at least one brand", {
        description: "Choose brands to receive WhatsApp updates from.",
      });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    completeOnboarding([...selected]);
    toast.success("Preferences saved!", {
      description: `You'll receive updates from ${selected.size} brand${selected.size > 1 ? "s" : ""}.`,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#F0F0F5] px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#111] rounded-xl flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-[#111]">NBMC</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#999]">Step 1 of 2</span>
          <div className="flex gap-1">
            <div className="w-8 h-1.5 rounded-full bg-[#111]" />
            <div className="w-8 h-1.5 rounded-full bg-[#E0E0E5]" />
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        {/* Hero */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-full px-3 py-1 mb-4 ring-1 ring-emerald-200/80">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            WhatsApp opt-in enabled
          </div>
          <h1 className="text-[#111] mb-2">Personalize your experience</h1>
          <p className="text-[#888] text-sm max-w-md mx-auto">
            Select the brands and pages you want to receive WhatsApp updates from. You can change these anytime.
          </p>
        </div>

        {/* Search */}
        <div className="mb-5 relative">
          <Input
            placeholder="Search brands, categories..."
            value={query}
            onChange={(e:any) => setQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
          {selected.size > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="bg-[#111] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {selected.size}
              </span>
            </div>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 bg-[#F3F3F5] rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-[#BBB]" />
            </div>
            <p className="text-[#888] text-sm">No brands found for "{query}"</p>
            <button
              className="text-xs text-[#111] mt-2 hover:underline"
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((brand) => {
              const isSelected = selected.has(brand.id);
              return (
                <button
                  key={brand.id}
                  onClick={() => toggle(brand.id)}
                  className={cn(
                    "relative text-left p-4 rounded-2xl border transition-all duration-150 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-black/20",
                    isSelected
                      ? "bg-[#111] border-[#111] shadow-md"
                      : "bg-white border-[#EAEAEF] hover:border-[#CACAD2] hover:shadow-sm"
                  )}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? "Unselect" : "Select"} ${brand.name}`}
                >
                  {/* Checkmark */}
                  <div
                    className={cn(
                      "absolute top-3.5 right-3.5 w-5 h-5 rounded-full border transition-all duration-150 flex items-center justify-center",
                      isSelected
                        ? "bg-white border-white"
                        : "border-[#E0E0E5] bg-transparent"
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 text-[#111]" />}
                  </div>

                  <div className="flex items-start gap-3 pr-7">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm shrink-0"
                      style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : brand.color }}
                    >
                      {brand.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm truncate", isSelected ? "text-white" : "text-[#111]")}>
                        {brand.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={cn(
                            "text-[10px] px-1.5 py-0.5",
                            isSelected
                              ? "bg-white/10 text-white/80 ring-white/20"
                              : ""
                          )}
                        >
                          {brand.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Users className={cn("w-3 h-3", isSelected ? "text-white/60" : "text-[#BBB]")} />
                        <span className={cn("text-[10px]", isSelected ? "text-white/60" : "text-[#AAA]")}>
                          {brand.followers}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Bottom action */}
        <div className="sticky bottom-0 mt-8 pt-4 pb-6 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA] to-transparent">
          <div className="flex items-center justify-between gap-4 bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-md">
            <div>
              <p className="text-sm text-[#111]">
                {selected.size === 0
                  ? "No brands selected"
                  : `${selected.size} brand${selected.size > 1 ? "s" : ""} selected`}
              </p>
              <p className="text-xs text-[#999] mt-0.5">
                You'll receive WhatsApp updates from your selection
              </p>
            </div>
            <Button
              onClick={handleContinue}
              loading={loading}
              disabled={selected.size === 0}
              size="md"
              className="shrink-0 gap-1.5"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
