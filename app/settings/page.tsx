'use client'
import  { useState } from "react";
import { toast } from "sonner";
import {
  Phone,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Plus,
  X,
  Search,
  Save,
  ChevronDown,
  Settings2,
  
} from "lucide-react";
import { Button } from "@/components/ui/customButton";
import { Input } from "@/components/ui/customInput";
import { Badge } from "@/components/ui/customBadge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/customCard";
import { Toggle } from "@/components/ui/customToggle";
import { useApp, BRANDS, Frequency } from "@/context/AppContext";
import { cn } from "../../lib/utils";
import { AppLayout } from "../components/AppLayout";
import axios from "axios"; 
const FREQUENCY_OPTIONS: { value: Frequency; label: string; description: string }[] = [
  { value: "daily", label: "Daily", description: "One update every day" },
  { value: "weekly", label: "Weekly", description: "Delivered every Monday" },
  { value: "monthly", label: "Monthly", description: "A monthly digest" },
];

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-[#111] font-semibold text-xl">{title}</h2>
      {description && <p className="text-sm text-[#888] mt-0.5">{description}</p>}
    </div>
  );
}

function WhatsAppSection() {
  const { phoneConnected, phoneNumber, connectPhone, disconnectPhone, changePhone,selectedBrandIds } = useApp();
  const [inputPhone, setInputPhone] = useState(phoneNumber || "");
  const [changing, setChanging] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const validatePhone = (p: string) => /^\+?[1-9]\d{7,14}$/.test(p.replace(/\s/g, ""));

// Ensure axios is imported

const handleConnect = async () => {
  // 1. Validate the phone number
  if (!validatePhone(inputPhone)) {
    toast.error("Invalid phone number", {
      description: "Please enter a valid number with country code.",
    });
    return;
  }

  setConnecting(true);

  try {
    // 2. Call the Subscription Update route first
    await axios.post("/api/whatsapp/subscription-update", {
      phone: inputPhone,
    });

    // 3. Update local state & UI
    connectPhone(inputPhone);
    setChanging(false);
    
    toast.success("WhatsApp connected successfully", {
      description: `Number ${inputPhone} is now active.`,
    });

    // 4. Wait for 2-3 seconds as requested
    // This gives the user time to see the "Connected" success message
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // 5. Call the Get Analysis route (the one that fetches FB metrics)
    // It sends both the phone and the array of brands from your Context
    await axios.post("/api/whatsapp/get-analysis", {
      phone: inputPhone,
      brands: selectedBrandIds, 
    });

    toast.info("Analysis sent", {
      description: "Brand metrics have been sent to your WhatsApp.",
    });

  } catch (error: any) {
    console.error("Connection/Analysis Error:", error);
    
    toast.error("Process failed", {
      description: error.response?.data?.message || "Something went wrong during the update.",
    });
  } finally {
    setConnecting(false);
  }
};
  const handleDisconnect = async () => {
    await new Promise((r) => setTimeout(r, 600));
    disconnectPhone();
    setInputPhone("");
    toast.success("WhatsApp disconnected", {
      description: "Your number has been removed.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle>WhatsApp Connection</CardTitle>
            <CardDescription>Connect your WhatsApp number to receive brand updates</CardDescription>
          </div>
          <Badge variant={phoneConnected ? "green" : "gray"} dot>
            {phoneConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {/* Status display */}
        {phoneConnected && !changing ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-3 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm text-[#111]">Active number</p>
                <p className="font-mono text-sm text-emerald-700">{phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChanging(true)}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDisconnect}
              >
                <XCircle className="w-3.5 h-3.5" />
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              label="WhatsApp number"
              type="tel"
              placeholder="+1 555 000 0000"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
              hint="Include your country code (e.g. +44 7700 000000)"
            />
            <div className="flex items-center gap-2">
              <Button
                onClick={handleConnect}
                loading={connecting}
                size="md"
                className="gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {phoneConnected ? "Update Number" : "Connect WhatsApp"}
              </Button>
              {changing && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => { setChanging(false); setInputPhone(phoneNumber); }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Meta notice */}
        <div className="text-xs text-[#999] bg-[#F9F9FB] rounded-xl px-3 py-2.5 border border-[#F0F0F5]">
          🔒 Your number is used exclusively to receive opted-in WhatsApp updates via Meta's Business API. We never share or use your number for any other purpose.
        </div>
      </div>
    </Card>
  );
}

function PreferencesSection() {
  const { frequency, preferences, updateFrequency, updatePreferences } = useApp();
  const [saving, setSaving] = useState(false);
  const [localFreq, setLocalFreq] = useState<Frequency>(frequency);
  const [localPrefs, setLocalPrefs] = useState(preferences);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    updateFrequency(localFreq);
    updatePreferences(localPrefs);
    setSaving(false);
    toast.success("Preferences updated", {
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Control how and when you receive WhatsApp updates</CardDescription>
      </CardHeader>

      <div className="space-y-6">
        {/* Frequency */}
        <div>
          <p className="text-sm text-[#444] mb-3">Update frequency</p>
          <div className="grid grid-cols-3 gap-2">
            {FREQUENCY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLocalFreq(opt.value)}
                className={cn(
                  "text-left p-3 rounded-xl border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                  localFreq === opt.value
                    ? "bg-[#111] border-[#111] shadow-sm"
                    : "bg-white border-[#E0E0E5] hover:border-[#BABAC4]"
                )}
              >
                <p className={cn("text-sm", localFreq === opt.value ? "text-white" : "text-[#111]")}>
                  {opt.label}
                </p>
                <p className={cn("text-[10px] mt-0.5", localFreq === opt.value ? "text-white/60" : "text-[#AAA]")}>
                  {opt.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Message types */}
        <div className="space-y-3">
          <p className="text-sm text-[#444]">Message types</p>
          <div className="space-y-3">
            <Toggle
              label="Marketing updates"
              description="Promotions, offers, new arrivals from brands you follow"
              checked={localPrefs.marketingUpdates}
              onCheckedChange={(v) => setLocalPrefs((p) => ({ ...p, marketingUpdates: v }))}
            />
            <div className="border-t border-[#F5F5F8]" />
            <Toggle
              label="Utility updates"
              description="Order confirmations, shipping notifications, receipts"
              checked={localPrefs.utilityUpdates}
              onCheckedChange={(v) => setLocalPrefs((p) => ({ ...p, utilityUpdates: v }))}
            />
          </div>
        </div>

        <Button onClick={handleSave} loading={saving} size="md" className="gap-2">
          <Save className="w-3.5 h-3.5" />
          Save preferences
        </Button>
      </div>
    </Card>
  );
}

function FollowedBrandsSection() {
  const { selectedBrandIds, updateSelectedBrands } = useApp();
  const [query, setQuery] = useState("");
  const [showBrowser, setShowBrowser] = useState(false);

  const followed = BRANDS.filter((b) => selectedBrandIds.includes(b.id));
  const available = BRANDS.filter((b) => !selectedBrandIds.includes(b.id));

  const filteredAvailable = available.filter(
    (b) =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleUnfollow = (id: string) => {
    updateSelectedBrands(selectedBrandIds.filter((i) => i !== id));
    toast.success("Unfollowed", {
      description: `You'll no longer receive updates from ${BRANDS.find((b) => b.id === id)?.name}.`,
    });
  };

  const handleFollow = (id: string) => {
    updateSelectedBrands([...selectedBrandIds, id]);
    const brand = BRANDS.find((b) => b.id === id);
    toast.success(`Now following ${brand?.name}`, {
      description: "You'll receive WhatsApp updates from this brand.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle>Followed Brands</CardTitle>
            <CardDescription>
              {followed.length > 0
                ? `Following ${followed.length} brand${followed.length !== 1 ? "s" : ""}`
                : "No brands followed yet"}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBrowser((v) => !v)}
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add brands
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showBrowser && "rotate-180")} />
          </Button>
        </div>
      </CardHeader>

      {/* Currently followed */}
      {followed.length > 0 ? (
        <div className="space-y-2 mb-4">
          {followed.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-[#F9F9FB] border border-[#F0F0F5] group hover:border-[#E0E0E5] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs shrink-0"
                  style={{ backgroundColor: brand.color }}
                >
                  {brand.initials}
                </div>
                <div>
                  <p className="text-sm text-[#111]">{brand.name}</p>
                  <p className="text-xs text-[#AAA]">{brand.category}</p>
                </div>
              </div>
              <button
                onClick={() => handleUnfollow(brand.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-[#CCC] hover:text-red-500"
                title={`Unfollow ${brand.name}`}
                aria-label={`Unfollow ${brand.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 text-center mb-4">
          <div className="w-10 h-10 bg-[#F3F3F5] rounded-2xl flex items-center justify-center mb-3">
            <Search className="w-4 h-4 text-[#CCC]" />
          </div>
          <p className="text-sm text-[#BBB]">You're not following any brands</p>
          <p className="text-xs text-[#DDD] mt-0.5">Click "Add brands" to get started</p>
        </div>
      )}

      {/* Browser */}
      {showBrowser && (
        <div className="border-t border-[#F0F0F5] pt-4 space-y-3">
          <Input
            placeholder="Search brands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
            {filteredAvailable.length === 0 ? (
              <p className="text-sm text-[#BBB] text-center py-6">
                {available.length === 0
                  ? "You're following all available brands"
                  : `No results for "${query}"`}
              </p>
            ) : (
              filteredAvailable.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F9F9FB] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs shrink-0"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.initials}
                    </div>
                    <div>
                      <p className="text-sm text-[#111]">{brand.name}</p>
                      <p className="text-xs text-[#AAA]">{brand.category}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFollow(brand.id)}
                    className="shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Follow
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

export default function Settings() {
  return (
    <AppLayout>
    <div className="space-y-7 container mx-auto my-4">
      {/* Page header */}
      <div className="flex items-center gap-3 ">
        <div className="bg-green-100 p-3 rounded-xl">
            <Settings2 className="w-6 h-6 text-green-600"/>
        </div>
     
      <div>
        <h1 className="text-[#111] text-4xl font-bold">Settings</h1>
        <p className="text-sm text-[#888] mt-1">Manage your WhatsApp connection and preferences</p>
      </div>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        <section>
          <SectionHeader
            title="WhatsApp"
            description="A. WhatsApp Connection"
          />
          <WhatsAppSection />
        </section>

        <section>
          <SectionHeader
            title="Preferences"
            description="B. Notification & delivery settings"
          />
          <PreferencesSection />
        </section>

        <section>
          <SectionHeader
            title="Following"
            description="C. Brands you receive updates from"
          />
          <FollowedBrandsSection />
        </section>
      </div>

      {/* Opt-out info */}
      <div className="text-xs text-[#BBB] border-t border-[#F0F0F5] pt-5 leading-relaxed">
        <strong className="text-[#999]">Your privacy matters.</strong> You opted in to receive WhatsApp updates from selected brands through NBMC. You can opt out at any time by replying <strong>STOP</strong> to any message or disconnecting your WhatsApp above. We process your data in accordance with our{" "}
        <a href="#" className="underline hover:text-[#666] transition-colors" onClick={(e) => e.preventDefault()}>
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-[#666] transition-colors" onClick={(e) => e.preventDefault()}>
          WhatsApp Business Policy
        </a>.
      </div>
    </div>
    </AppLayout>
  );
}
