import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendWhatsAppMessage } from "@/services/whatsappService";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const OTP_EXPIRY_MIN = 5; // OTP expiry time in minutes
export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    // console.log("Received phone number:", phone);
    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is required", success: false },
        { status: 400 }
      );
    }

    if (!/^\+\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        { message: "Invalid phone number format", success: false },
        { status: 400 }
      );
    }
 
    const otp = process.env.OTP || "567765";


    // Auth token (24h)
    const authToken = jwt.sign(
      { phone },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // OTP token (5 min)
    const otpToken = jwt.sign(
      { phone, otp },
      JWT_SECRET,
      { expiresIn: "5m" }
    );

    const response = NextResponse.json({
      message: "OTP sent successfully",
      success: true,
    });

    // Store auth token
    response.cookies.set("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    // Store OTP token
    response.cookies.set("otp_token", otpToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 5,
      path: "/",
    });
     let whatsappResponse = await sendWhatsAppMessage({ phone, message: `Your OTP is ${otp}. It expires in ${OTP_EXPIRY_MIN} minutes.` });
    //  console.log("WhatsApp API response:", whatsappResponse);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to process request", success: false },
      { status: 500 }
    );
  }
}