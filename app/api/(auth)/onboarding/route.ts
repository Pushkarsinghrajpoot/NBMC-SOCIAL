import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { brands } = body;

    if (!brands || !Array.isArray(brands)) {
      return NextResponse.json(
        { success: false, message: "Invalid brands data" },
        { status: 400 }
      );
    }

    // ⚠️ In real apps, you'd save to DB here

    return NextResponse.json({
      success: true,
      message: "Congratulations! Your preferences have been saved.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}