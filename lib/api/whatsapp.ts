import { toast } from "sonner";
import apiHelper from "../apiHelper";

export const getWhatsAppAnalysis = async () => {
  try {
    const storedData = localStorage.getItem("public_pages");
    const phone = localStorage.getItem("user_phone"); // ✅ get phone

    if (!storedData) {
      throw new Error("No public pages found");
    }

    if (!phone) {
      throw new Error("Phone number not found");
    }

    const parsedData = JSON.parse(storedData);

    const response = await apiHelper.post("/whatsapp/get-analysis", {
      ...parsedData,
      phone, // ✅ send phone in body
    });

    toast.success("Updates fetched successfully!");
    return response.data;

  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Failed to fetch updates"
    );
    throw error;
  }
};