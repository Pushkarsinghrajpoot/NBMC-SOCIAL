import apiHelper from "../apiHelper";
import { toast } from "sonner";

export const sendOTP = async (phone: string) => {
  try {
    const response = await apiHelper.post("/login", { phone });
    // console.log(response);

    // ✅ Save phone to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user_phone", phone);
    }

    // Show success toast
    toast.success("OTP sent successfully!");

    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to send OTP");
    throw error;
  }
};
export const verifyOTP = async (otp: string) => {
  try {
    const response = await apiHelper.post("/verify-otp", { otp });
    toast.success(response.data.message || "OTP verified successfully!");
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "OTP verification failed");
    throw error;
  }
};

export const submitOnboarding = async (brands: string[]) => {
  try {
    const response = await apiHelper.post("/onboarding", 
      {brands}
    );

    toast.success(response.data.message || "Onboarding completed!");
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Failed to save preferences"
    );
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiHelper.post("/logout");

    // Clear localStorage
    localStorage.removeItem("user_phone");
    localStorage.removeItem("public_pages");

    toast.success(response.data.message || "Logged out successfully!");
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Logout failed");
    throw error;
  }
};