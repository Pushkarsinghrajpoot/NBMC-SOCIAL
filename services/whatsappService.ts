import axios from "axios";

const GRAPH_API_URL = process.env.GRAPH_API_URL; 
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN; 
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

interface WhatsAppMessagePayload {
  phone: string;
  message: string;
}


interface TemplatePayload {
  phone: string;
  name: string;
  fan_count: number;
  rating_count: number;
  talking_about_count: number;
  link: string;
}



// Sends a message via WhatsApp Graph API

let messageEndpoint = `${GRAPH_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

export const sendWhatsAppMessage = async ({ phone, message }: WhatsAppMessagePayload) => {
  try {
    const payload = {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: message },
    };

    const response = await axios.post(messageEndpoint, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to send WhatsApp message:", error.response?.data || error.message);
    throw new Error("Failed to send OTP via WhatsApp");
  }
};





export const sendWhatsAppTemplate = async ({
  phone,
  name,
  fan_count,
  rating_count,
  talking_about_count,
  link,
}: TemplatePayload) => {
 
  try {
    const payload = {
      messaging_product: "whatsapp",
      to: phone.replace('+', ''), 
      type: "template",
      template: {
        name: "page_metrics_update",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", parameter_name: "name", text: name || "N/A" },
              { type: "text", parameter_name: "fan_count", text: String(fan_count || 0) },
              { type: "text", parameter_name: "rating_count", text: String(rating_count || 0) },
              { type: "text", parameter_name: "talking_about_count", text: String(talking_about_count || 0) },
              { type: "text", parameter_name: "link", text: link || "N/A" },
            ],
          },
        ],
      },
    };

    const response = await axios.post(messageEndpoint, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to send WhatsApp template:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send WhatsApp message");
  }
};


export const sendSubscriptionUpdate = async (phone: string) => {
  try {
    const payload = {
      messaging_product: "whatsapp",
      to: phone.replace('+', ''), 
      type: "template",
      template: {
        name: "subscription_update",
        language: { 
          code: "en" 
        },
        
        components: [], 
      },
    };

    const response = await axios.post(messageEndpoint, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to send subscription update:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send WhatsApp message");
  }
};