import { sendSubscriptionUpdate } from "@/services/whatsappService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
   
    const { phone } = await req.json();


    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is required" },
        { status: 400 }
      );
    }

    const result = await sendSubscriptionUpdate(phone);

    return NextResponse.json({
      message: "Your whatsapp account connected successfully",
    });

  } catch (error: any) {
    console.error("Route Error:", error);

    return NextResponse.json(
      {
        message: "Failed to connect whatsapp account",
        error: error.message,
      },
      { status: 500 }
    );
  }
}