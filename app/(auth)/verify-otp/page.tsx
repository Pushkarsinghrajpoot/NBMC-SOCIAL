'use client';
import { useState, useRef, useEffect } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { sendOTP, verifyOTP } from "@/lib/api/auth";
import { useRouter } from "next/navigation";


export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (/^\d$/.test(char) && i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.every((digit) => digit !== "")) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      const otpCode = otp.join("");
      await verifyOTP(otpCode);
      // Optionally redirect after verification
      router.push("/onboarding"); // or wherever
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

const handleResend = async () => {
  const fullPhone = localStorage.getItem("user_phone");

  if (!fullPhone || fullPhone.length < 10) {
    toast.error("Invalid phone number");
    return;
  }

  setLoading(true);

  try {
    
    const data = await sendOTP(fullPhone);

    if (data.success) {
      setTimer(30);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      toast.success("OTP resent successfully!");
    } else {
      toast.error("Failed to resend OTP");
    }
  } catch (error: any) {
    console.error("Error resending OTP:", error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
         onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-md">
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter the 6-digit code sent to your WhatsApp
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                ref={(el) => {inputRefs.current[index] = el;}}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366] focus:ring-opacity-20 outline-none transition-all"
                  disabled={loading}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              {timer > 0 ? (
                <p className="text-sm text-gray-600 cursor-not-allowed">
                  Resend OTP in{" "}
                  <span className="font-semibold text-[#25D366]">{timer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm font-medium text-[#25D366] cursor-pointer hover:text-[#20BA5A] transition-colors"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!otp.every((digit) => digit !== "") || loading}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-sm text-gray-600">Code sent via WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );
}