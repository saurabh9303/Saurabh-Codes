"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SmartLink from "@/components/SmartLink";
import Image from "next/image";

export default function DashboardClient() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    function formatDate12Hour(dateString) {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const hh = String(hours).padStart(2, "0");

        return `${dd}/${mm}/${yyyy} ${hh}:${minutes}:${seconds} ${ampm}`;
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            async function fetchData() {
                try {
                    const res = await fetch("/api/userData");

                    if (res.status === 404) {
                        setError("notFound");
                        setLoading(false);
                        return;
                    }

                    if (!res.ok) {
                        setError("serverError");
                        setLoading(false);
                        return;
                    }

                    const data = await res.json();

                    if (!data) {
                        setError("notFound");
                        setLoading(false);
                        return;
                    }

                    const formattedUser = {
                        name: data.name || "User",
                        email: data.email || "Not provided",
                        image: data.image || null,
                        role: data.role || "user",
                        status: data.status || "active",
                        plan: data.plan || "free",
                        loginCount: data.loginCount ?? 0,
                        lastLogin: data.lastLogin || null,
                        device: data.device || "Unknown",
                        ipAddress: data.ipAddress || "Unknown",
                        location: data.location || "Unknown",
                    };

                    setUserData(formattedUser);
                    if (formattedUser.loginCount <= 1) setIsNewUser(true);
                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setError("networkError");
                    setLoading(false);
                }
            }

            fetchData();
        } else if (status === "unauthenticated") {
            setLoading(false);
        }
    }, [status]);

    if (!mounted) return null;

    // Loading State
    if (status === "loading" || loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-ping opacity-20"></div>
                        <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-lg font-medium text-slate-200">Loading Dashboard</p>
                </div>
            </div>
        );
    }

    // Unauthenticated State
    if (status === "unauthenticated") {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
                <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-100 mb-2">Authentication Required</h1>
                            <p className="text-slate-400 text-sm">
                                Please sign in to access your dashboard and view your account information.
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/signin")}
                            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            Sign In to Continue
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Error States
    if (error === "notFound") {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
                <div className="max-w-lg w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="p-4 border-l-4 border-red-500 bg-red-500/10 rounded">
                            <h1 className="text-xl font-semibold text-red-400 mb-2">Account Access Issue Detected</h1>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                We were unable to locate your account data. This can occur if your profile was deleted
                                or if there was an issue connecting to our database.
                            </p>

                            <div className="mt-3 bg-red-500/20 text-red-300 text-sm px-3 py-2 rounded">
                                <span className="font-semibold text-red-200">Required Action:</span>
                                Please <strong>sign out and sign in again</strong> to restore your account.
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Refresh Page
                            </button>
                            <button
                                onClick={() => signOut({ callbackUrl: "/signin" })}
                                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error === "serverError" || error === "networkError") {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
                <div className="max-w-lg w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-100 mb-2">
                                {error === "serverError" ? "Service Temporarily Unavailable" : "Connection Issue"}
                            </h1>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {error === "serverError"
                                    ? "We're experiencing technical difficulties. Our team has been notified and is working to resolve this. Please try again in a few moments."
                                    : "Unable to connect to our servers. Please check your internet connection and try again."}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => router.push("/signin")}
                                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Authenticated Dashboard - No Scroll
    return (
        <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center overflow-hidden">
            <div className="max-w-4xl w-full">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4">
                        <div className="flex items-center gap-4">
                            {userData.image ? (
                                <Image
                                    src={userData.image}
                                    alt={userData.name}
                                    width={64}    // px में specify करें
                                    height={64}   // px में specify करें
                                    className="rounded-full border-4 border-white/20 object-cover shadow-xl"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                                    {userData.name[0].toUpperCase()}
                                </div>
                            )}
                            <div className="flex-1">
                                <h1 className="text-xl font-bold text-white mb-0.5">
                                    {isNewUser ? `Welcome, ${userData.name}` : `Welcome back, ${userData.name}`}
                                </h1>
                                <p className="text-indigo-100 text-sm">
                                    {userData.email}
                                </p>
                                {isNewUser && (
                                    <div className="mt-1 inline-flex items-center gap-2 px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        New Member
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-4">
                        {/* Account Overview */}
                        <div>
                            <h2 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Account Overview
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                <InfoCard label="Role" value={userData.role} />
                                <InfoCard label="Status" value={userData.status} />
                                <InfoCard label="Plan" value={userData.plan} />
                            </div>
                        </div>

                        {/* Activity Details */}
                        <div>
                            <h2 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Activity Details
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                <InfoCard label="Last Login" value={formatDate12Hour(userData.lastLogin)} />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex gap-3">
                            {userData.role === "admin" && (
                                <SmartLink
                                    href="/admin"
                                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl text-white font-semibold text-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                >
                                    Admin Dashboard
                                </SmartLink>
                            )}
                            <button
                                onClick={() => signOut({ callbackUrl: "/signin" })}
                                className="flex-1 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-3 border border-slate-600/50 hover:border-indigo-500/50 transition-colors duration-200">
            <p className="text-xs font-medium text-slate-400 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-slate-100 break-words capitalize">
                {value || "N/A"}
            </p>
        </div>
    );
}