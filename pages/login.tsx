"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import "../src/app/globals.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/customize-qr");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed!");
      }
  
      localStorage.setItem("token", data.token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/customise-qr"), 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* Home Button */}
      <button 
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition font-bold cursor-pointer"
      >
        Generate QR
      </button>
      
      {/* Login Form */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white mb-4"
            required
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white mb-4"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex pb-3 items-center text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded text-white hover:bg-blue-600 transition font-bold text-lg cursor-pointer"
          >
            Login
          </button>
        </form>
        
        <div className="mt-4 flex justify-between text-sm text-gray-400 cursor-pointer">
          <button onClick={() => router.push("/forgot-password")} className="hover:underline cursor-pointer">Forgot Password?</button>
          <button onClick={() => router.push("/signup")} className="text-blue-400 cursor-pointer hover:underline">Sign Up</button>
        </div>
      </div>
    </div>
  );
}