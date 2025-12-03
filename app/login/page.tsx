"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email + Password Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else router.push("/dashboard");
  }

  // ✅ Google Login (UPDATED)
  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google Login Error:", error.message);
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Top Brand Header */}
      <div className="w-full border-b bg-white py-4 px-6">
        <h1 className="text-3xl font-extrabold text-orange-600">UniVerse</h1>
      </div>

      {/* Center Card */}
      <div className="mt-10 bg-white w-full max-w-md rounded-xl shadow-md p-8">
        <h3 className="mt-2 text-center text-xl font-semibold text-gray-900">
          Welcome
        </h3>

        <p className="text-center text-gray-600 mb-6">
          Sign in to your UniVerse account
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-orange-600 text-white py-3 rounded-lg text-lg hover:bg-orange-700 transition"
          >
            Continue
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-4 text-gray-700">
          Don’t have an account?
          <span
            onClick={() => router.push("/signup")}
            className="text-orange-600 font-semibold cursor-pointer hover:underline ml-1"
          >
            Sign up
          </span>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t" />
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-1 border-t" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="border rounded-lg py-3 w-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-6 h-6"
            alt="Google"
          />
          <span className="text-gray-700">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
