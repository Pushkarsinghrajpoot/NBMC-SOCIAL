import { sendWhatsAppTemplate } from "@/services/whatsappService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { brands,phone } = await req.json();

    if (!brands || !Array.isArray(brands)) {
      return NextResponse.json(
        { message: "Invalid brands data" },
        { status: 400 }
      );
    }

  
    if (!phone) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN!;
    // console.log("Using Access Token:", ACCESS_TOKEN);
    const results = [];

    for (const brand of brands) {
      // Fetch Facebook page metrics
      const url = `https://graph.facebook.com/v22.0/${brand}?fields=name,fan_count,rating_count,talking_about_count,link&access_token=${ACCESS_TOKEN}`;

      const res = await fetch(url);
      const data = await res.json();
      // console.log("Fetched data for brand", brand, ":", data);
      // console.log("Phone number from cookies:", phone);
      results.push(data);

      // Send WhatsApp template via service
      // await sendWhatsAppTemplate({
      //   phone,
      //   name: data.name,
      //   fan_count: data.fan_count,
      //   rating_count: data.rating_count,
      //   talking_about_count: data.talking_about_count,
      //   link: data.link,
      // });
    }

    return NextResponse.json({
      message: "Updates sent successfully",
      data: results,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}