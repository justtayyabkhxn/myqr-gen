import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    if (!data) {
      return NextResponse.json({ error: "No data provided!" }, { status: 400 });
    }

    // Generate QR Code as a Data URL
    const qrImageUrl = await QRCode.toDataURL(data);

    return NextResponse.json({ imageUrl: qrImageUrl });
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
