"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import "../src/app/globals.css";

export default function CustomiseQR() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [qrData, setQrData] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [pixelColor, setPixelColor] = useState("#000000");
  const [logo, setLogo] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(256);
  const [pattern, setPattern] = useState("classic");
  // const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check for token in localStorage
    if (!token) {
      router.push("/login"); // Redirect if no token found
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Checking authentication...</p>
      </div>
    );
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const patternShapes: {
    [key: string]: "squares" | "dots" | "fluid" | undefined;
  } = {
    classic: "squares",
    rounded: "dots",
    thin: "squares",
    smooth: "fluid",
    circles: "dots",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Customize Your QR Code</h1>

      <input
        type="text"
        placeholder="Enter text or URL"
        value={qrData}
        onChange={(e) => setQrData(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
      />

      {/* Color Pickers */}
      <div className="mt-4 w-full max-w-md p-4 border border-gray-600 rounded-lg bg-gray-800 shadow-lg hover:border-blue-400 transition">
        <label className="block text-lg font-bold mb-3 text-center">
          Customize Colors
        </label>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Background Color Picker */}
          <div className="flex flex-col items-center">
            <label className="text-sm mb-1">Background</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-12 h-12 rounded-md border border-gray-500 cursor-pointer"
            />
          </div>

          {/* Squares Color Picker */}
          <div className="flex flex-col items-center">
            <label className="text-sm mb-1">Squares</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-12 h-12 rounded-md border border-gray-500 cursor-pointer"
            />
          </div>

          {/* Pixels Color Picker */}
          <div className="flex flex-col items-center">
            <label className="text-sm mb-1">Pixels</label>
            <input
              type="color"
              value={pixelColor}
              onChange={(e) => setPixelColor(e.target.value)}
              className="w-12 h-12 rounded-md border border-gray-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* QR Code Size */}
      <div className="mt-4 w-full max-w-md p-4 border border-gray-600 rounded-lg bg-gray-800 shadow-lg hover:border-blue-400 transition">
        <label className="block text-lg font-medium mb-3 text-center">
          QR Code Size
        </label>

        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">{qrSize}px</span>
          <input
            type="range"
            min="100"
            max="500"
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
            className="w-full max-w-md mt-1 accent-blue-500"
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div className="mt-4 w-full max-w-md p-4 border border-gray-600 rounded-lg bg-gray-800 text-center shadow-lg hover:border-blue-400 transition">
        <label className="block text-lg font-medium mb-2">Upload Logo</label>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            id="logoUpload"
          />
          <label
            htmlFor="logoUpload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Choose Image
          </label>
          {logo && (
            <div className="mt-3 w-24 h-24 border border-gray-500 rounded-lg overflow-hidden">
              <img
                src={logo}
                alt="Uploaded Logo"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Pattern and Style Selection */}
      <div className="mt-4">
        <label className="block text-sm">Pattern and Style</label>
        <div className="flex gap-2">
          {["classic", "rounded", "thin", "smooth", "circles"].map((style) => (
            <button
              key={style}
              className={`p-2 border rounded ${
                pattern === style ? "bg-blue-500" : "bg-gray-700"
              }`}
              onClick={() => setPattern(style)}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Pre-made Designs */}
      {/* <div className="mt-4">
        <label className="block text-sm">Pre-made Designs</label>
        <div className="flex gap-2 overflow-x-auto">
          {["design1", "design2", "design3", "design4"].map((design) => (
            <button
              key={design}
              className={`p-2 border rounded ${selectedDesign === design ? "bg-blue-500" : "bg-gray-700"}`}
              onClick={() => setSelectedDesign(design)}
            >
              {design}
            </button>
          ))}
        </div>
      </div> */}

      {/* QR Code Display */}
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        {qrData && (
          <QRCode
            value={qrData}
            size={qrSize}
            bgColor={bgColor}
            fgColor={fgColor}
            qrStyle={patternShapes[pattern]}
            logoImage={logo || undefined}
            logoWidth={50}
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
