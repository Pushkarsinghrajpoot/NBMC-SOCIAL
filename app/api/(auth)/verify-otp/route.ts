import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: Request) {
  try {
    const { otp } = await req.json();

    // Extract cookies from request headers
    const cookieHeader = req.headers.get("cookie") || "";
    const getCookie = (name: string) =>
      cookieHeader
        .split("; ")
        .find((c) => c.startsWith(name + "="))
        ?.split("=")[1];

    const authToken = getCookie("auth_token"); // 24h session
    const otpToken = getCookie("otp_token");   // 5m OTP

    if (!authToken || !otpToken) {
      return NextResponse.json({ message: "Session expired", success: false }, { status: 400 });
    }

    let authData: any;
    let otpData: any;

    try {
      authData = jwt.verify(authToken, JWT_SECRET); // validate session token
      otpData = jwt.verify(otpToken, JWT_SECRET);   // validate OTP token
    } catch (err) {
      return NextResponse.json({ message: "OTP expired or invalid", success: false }, { status: 400 });
    }

    // Safety check: phone in session must match phone in OTP
    if (authData.phone !== otpData.phone) {
      return NextResponse.json({ message: "Invalid session", success: false }, { status: 400 });
    }

    // Check if OTP matches
    if (otpData.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP", success: false }, { status: 400 });
    }

    // OTP is correct, remove only otp_token
    const response = NextResponse.json({ message: "Login successful", success: true });
    response.cookies.set("otp_token", "", { maxAge: 0, path: "/" });

    return response;

  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ message: "Verification failed" }, { status: 500 });
  }
}