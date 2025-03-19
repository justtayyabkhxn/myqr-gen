"use client";
import "./globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [input, setInput] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const generateQrCode = async () => {
    if (!input) {
      setError("Enter some text!");
      return;
    }
    setError("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: input }),
    });

    const result = await response.json();
    setQrCode(result.imageUrl);
  };

  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">QR Code Generator</h1>
        <p className="text-gray-400 mt-2">Instantly create QR codes for free</p>
      </header>

      <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter text or URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-2 bg-gray-700 text-white"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={generateQrCode}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-bold"
        >
          Generate QR Code
        </button>
        <button
          onClick={() => router.push("/login")}
          className="w-full mt-3 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition font-bold"
        >
          Customize QR Code
        </button>

        {qrCode && (
          <div className="mt-6 text-center">
            <img
              src={qrCode}
              alt="Generated QR Code"
              className="w-40 h-40 mx-auto border border-gray-600 rounded"
            />
            <button
              onClick={downloadQrCode}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-300">
          Why Use Our QR Generator?
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="p-4 bg-gray-800 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Fast & Free</h3>
            <p className="text-gray-400 text-sm">
              Generate QR codes instantly at no cost.
            </p>
          </div>
          <div className="p-4 bg-gray-800 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Customizable</h3>
            <p className="text-gray-400 text-sm">
              Modify colors, sizes, and more (Login Required).
            </p>
          </div>
          <div className="p-4 bg-gray-800 shadow rounded-lg">
            <h3 className="text-lg font-semibold">Secure</h3>
            <p className="text-gray-400 text-sm">
              No data is stored—your QR codes are private.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400">
        <p>
          © 2025 QR Code Generator. Built by{" "}
          <a
            href="https://justtayyabkhan.vercel.app"
            target="_blank"
            className="text-orange-400 cursor-pointer hover:underline"
          >
            Tayyab Khan
          </a>
        </p>
      </footer>
    </div>
  );
}
