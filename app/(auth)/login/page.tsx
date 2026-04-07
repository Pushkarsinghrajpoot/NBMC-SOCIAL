'use client';
import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { sendOTP } from '@/lib/api/auth';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';


export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${countryCode}${phoneNumber}`;
      const data = await sendOTP(fullPhone);

      if (data.success) {
        router.push("/verify-otp");
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Illustration Side */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="w-80 h-80 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircle className="w-40 h-40 text-[#25D366]" strokeWidth={1.5} />
          </div>
          <h2 className="mt-8 text-2xl font-semibold text-gray-800">Connect via WhatsApp</h2>
          <p className="mt-2 text-gray-600 text-center max-w-sm">Secure authentication and messaging powered by WhatsApp</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-md">
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">Login with WhatsApp</h1>
          <p className="text-gray-600 text-center mb-8">We will send a verification code to your WhatsApp number</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="flex gap-3">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none bg-white transition-all"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                  <option value="+86">+86</option>
                </select>
                <div className="flex-1 relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter phone number"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none transition-all"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={phoneNumber.length < 10 || loading}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Sending..." : "Send OTP on WhatsApp"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
