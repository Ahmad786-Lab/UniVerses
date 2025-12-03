"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // Email + Password Signup
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  // ✅ GOOGLE SIGNUP
  async function handleGoogleSignup() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google Signup Error:", error.message);
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <div className="w-full bg-white border-b py-4 px-6">
        <h1 className="text-3xl font-extrabold text-orange-600">UniVerse</h1>
      </div>

      {/* Signup Card */}
      <div className="mt-10 bg-white w-full max-w-md rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-orange-600 text-center">
          Create Account
        </h2>

        <p className="text-center text-gray-600 mb-6">Sign up to continue</p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

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

          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-orange-600 text-white py-3 rounded-lg text-lg hover:bg-orange-700 transition"
          >
            Create Account
          </button>
        </form>

        {/* Already have account? */}
        <p className="text-center mt-4 text-gray-700">
          Already have an account?
          <span
            onClick={() => router.push("/login")}
            className="text-orange-600 font-semibold cursor-pointer hover:underline ml-1"
          >
            Sign in
          </span>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t" />
          <span className="mx-3 text-gray-500">OR</span>
          <div className="flex-1 border-t" />
        </div>

        {/* GOOGLE SIGNUP BUTTON */}
        <button
          onClick={handleGoogleSignup}
          className="border rounded-lg py-3 w-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-6 h-6"
            alt="Google"
          />
          <span className="text-gray-700">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
