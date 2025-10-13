"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

// 🔹 Reusable OAuth Button Component
const OAuthButton = ({ provider, icon, children, loading, onClick, disabled }) => (
    <button
        type="button"
        disabled={disabled || loading}
        onClick={onClick}
        className={`relative w-full flex items-center justify-center gap-3 border rounded-xl py-3 font-semibold transition-all duration-300 
      border-[#3a4157] bg-[#ffffff]/10 text-[#e5e7eb]
      ${disabled || loading ? "cursor-not-allowed opacity-50 scale-[0.98]" : "hover:bg-[#ffffff]/15 hover:scale-[1.02]"} 
      shadow-md hover:shadow-lg`}
    >
        {/* Left Icon */}
        {!loading ? (
            <img src={icon} alt={`${provider} icon`} className="w-5 h-5" />
        ) : (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        )}

        {/* Button Label */}
        <span className="relative z-10">
            {loading ? "Signing in..." : children}
        </span>

        {/* ✨ Bottom gradient line effect */}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] transition-all duration-300 group-hover:w-full"></span>
    </button>
);

export default function LoginPage() {
    const [loadingProvider, setLoadingProvider] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleOAuth = async (provider) => {
        setLoadingProvider(provider);
        setMessage({ type: "", text: "" });

        try {
            const result = await signIn(provider, { callbackUrl: "/dashboard" });
            if (!result?.ok && result?.error) {
                throw new Error(result.error);
            }
        } catch (err) {
            console.error("OAuth login failed:", err);
            setMessage({
                type: "error",
                text: "Something went wrong during sign-in. Please try again.",
            });
            setLoadingProvider(null);
        }
    };

    // Check if any provider is currently loading
    const isAnyLoading = loadingProvider !== null;

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-10 text-[#e5e7eb] relative overflow-hidden">
            {/* 🌌 Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900/70 to-black"></div>
            <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-500/20 blur-[150px] rounded-full"></div>

            {/* 🪄 Main card */}
            <div className="relative w-full max-w-md bg-gradient-to-br from-[#1f2333] to-[#252a39] border border-[#3a4157]/50 backdrop-blur-xl rounded-3xl shadow-[0_0_35px_rgba(138,180,248,0.08)] p-8 md:p-10 space-y-8 animate-fadeIn">
                {/* Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#8ab4f8]">
                        Welcome
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Sign in to access your personalized dashboard
                    </p>
                </div>

                {/* Message */}
                {message.text && (
                    <div
                        className={`text-sm text-center font-medium rounded-lg p-2 transition-all duration-300 ${message.type === "error"
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : "bg-green-500/20 text-green-400 border border-green-500/40"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* OAuth Buttons */}
                <div className="flex flex-col gap-4">
                    <OAuthButton
                        provider="google"
                        icon="/icons/google.svg"
                        loading={loadingProvider === "google"}
                        disabled={isAnyLoading}
                        onClick={() => handleOAuth("google")}
                    >
                        Continue with Google
                    </OAuthButton>

                    <OAuthButton
                        provider="github"
                        icon="/icons/github.svg"
                        loading={loadingProvider === "github"}
                        disabled={isAnyLoading}
                        onClick={() => handleOAuth("github")}
                    >
                        Continue with GitHub
                    </OAuthButton>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 pt-2">
                    By continuing, you agree to our{" "}
                    <span className="text-[#8ab4f8] hover:underline cursor-pointer">
                        Terms
                    </span>{" "}
                    &{" "}
                    <span className="text-[#8ab4f8] hover:underline cursor-pointer">
                        Privacy Policy
                    </span>.
                </p>
            </div>
        </main>
    );
}