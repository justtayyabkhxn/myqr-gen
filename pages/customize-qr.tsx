"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import "../src/app/globals.css";

export default function CustomiseQR() {
  const router = useRouter();
  const [qrData, setQrData] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [pixelColor, setPixelColor] = useState("#000000");
  const [logo, setLogo] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(256); // Default size: 256px

  // Function to handle image upload
  const handleLogoUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Customize Your QR Code</h1>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter text or URL"
        value={qrData}
        onChange={(e) => setQrData(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
      />

      {/* Color Pickers */}
      <div className="flex flex-wrap justify-center gap-4">
        <div>
          <label className="block text-sm">Background</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Squares</label>
          <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Pixels</label>
          <input type="color" value={pixelColor} onChange={(e) => setPixelColor(e.target.value)} />
        </div>
      </div>

      {/* QR Size Adjuster */}
      <div className="mt-4">
        <label className="block text-sm">QR Code Size ({qrSize}px)</label>
        <input
          type="range"
          min="100"
          max="500"
          value={qrSize}
          onChange={(e) => setQrSize(Number(e.target.value))}
          className="w-full max-w-md mt-1"
        />
      </div>

      {/* Logo Upload */}
      <div className="mt-4">
        <label className="block text-sm">Upload Logo</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} className="mt-1 text-sm" />
      </div>

      {/* QR Code Display */}
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        {qrData && (
          <QRCodeCanvas
            value={qrData}
            size={qrSize}
            bgColor={bgColor}
            fgColor={fgColor}
            includeMargin={true}
            imageSettings={logo ? { src: logo, width: 40, height: 40, excavate: true } : undefined}
          />
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => {
            const canvas = document.querySelector("canvas");
            if (canvas) {
              const link = document.createElement("a");
              link.href = canvas.toDataURL("image/png");
              link.download = "qr-code.png";
              link.click();
            }
          }}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Download QR Code
        </button>

        <button
          onClick={() => router.push("/")}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
