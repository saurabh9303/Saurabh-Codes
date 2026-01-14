'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SmartLink from "@/components/SmartLink";
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';

export default function ResponsiveNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => { signOut({ callbackUrl: "/" }); closeMenu(); };

    return (
        <nav className={`sticky top-0 font-medium z-50 flex justify-center w-full backdrop-blur-sm transition-all duration-500 ${isScrolled ? 'py-2' : 'py-3'
            }`}>
            <div className={`flex justify-between items-center bg-[#292f3d]/95 w-[95vw] max-w-[1200px] px-6 rounded-2xl text-gray-300 shadow-xl backdrop-blur-md mx-auto border border-gray-700/50 transition-all duration-500 ${isScrolled ? 'py-3 shadow-2xl bg-[#292f3d]/98' : 'py-4'
                }`}>
                {/* Logo/Brand with Animation */}
                <SmartLink href="/" className="text-xl font-bold text-white hover:text-[#38bdf8] transition-all duration-500 transform hover:scale-105 animate-fade-in">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-[#38bdf8] hover:to-[#0ea5e9] transition-all duration-500">
                        &lt;Saurabh&gt;
                    </span>
                </SmartLink>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8 animate-slide-in">
                    <ul className="flex gap-6 items-center">
                        {[
                            { href: '/', label: 'Home', delay: 'delay-100' },
                            { href: '/blogs', label: 'Blog', delay: 'delay-150' },
                            { href: '/portfolio', label: 'Portfolio', delay: 'delay-200' },
                            { href: '/projects', label: 'Projects', delay: 'delay-250' },
                            { href: '/services', label: 'Services', delay: 'delay-300' },
                            { href: '/contact', label: 'Contact', delay: 'delay-350' }
                        ].map((item, index) => (
                            <li key={item.href} className={`animate-fade-in-up ${item.delay}`}>
                                <SmartLink
                                    href={item.href}
                                    className="relative cursor-pointer text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 group"
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#38bdf8]/20 to-[#0ea5e9]/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] transition-all duration-300 group-hover:w-full"></span>
                                </SmartLink>
                            </li>
                        ))}
                    </ul>

                    {/* Action Buttons with Stagger Animation */}
                    <div className="flex items-center gap-3 ml-4 border-l border-gray-600 pl-6 animate-fade-in-right">
                        {status === "authenticated" && session?.user ? (
                            <>
                                {/* User Profile */}
                                <SmartLink href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image || "/default-user.png"}
                                            alt={session.user.name || "User"}
                                            width={36}   // Tailwind w-9 = 36px
                                            height={36}  // Tailwind h-9 = 36px
                                            className="rounded-full border-2 border-[#38bdf8] object-cover cursor-pointer"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center text-white font-semibold text-sm border-2 border-[#38bdf8] cursor-pointer">
                                            {session.user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <span className="text-gray-200 text-sm font-medium max-w-[100px] truncate cursor-pointer">
                                        {session.user.name || "User"}
                                    </span>
                                </SmartLink>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white rounded-lg font-medium hover:from-[#0ea5e9] hover:to-[#0284c7] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-105 animate-pulse-glow relative overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                    <span className="relative z-10">Logout</span>
                                </button>
                            </>
                        ) : (
                            <SmartLink
                                href="/signin"
                                className="px-5 py-2.5 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white rounded-lg font-medium hover:from-[#0ea5e9] hover:to-[#0284c7] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-105 animate-pulse-glow relative overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                <span className="relative z-10">Sign In</span>
                            </SmartLink>
                        )}

                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/saurabh9303"
                            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float"
                            title="GitHub Profile"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-gray-300 hover:text-white transition-colors duration-300"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button with Animation */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-300 transform hover:scale-110 group"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-gray-300 transition-all duration-500 group-hover:bg-[#38bdf8] ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-gray-300 transition-all duration-500 group-hover:bg-[#38bdf8] ${isMenuOpen ? 'opacity-0 scale-0' : ''
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-gray-300 transition-all duration-500 group-hover:bg-[#38bdf8] ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu Dropdown with Enhanced Animation */}
            <div className={`lg:hidden absolute top-full left-0 right-0 z-40 transition-all duration-500 transform ${isMenuOpen
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                }`}>
                <div className="bg-[#292f3d]/95 mx-4 rounded-xl shadow-2xl backdrop-blur-md mt-2 border border-gray-700/50 overflow-hidden">
                    <div className="p-4">
                        <ul className="flex flex-col gap-1 mb-4">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/blogs', label: 'Blog' },
                                { href: '/portfolio', label: 'Portfolio' },
                                { href: '/projects', label: 'Projects' },
                                { href: '/services', label: 'Services' },
                                { href: '/contact', label: 'Contact' }
                            ].map((item, index) => (
                                <li
                                    key={item.href}
                                    className={`transform transition-all duration-500 ${isMenuOpen
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-4 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <SmartLink
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-[#38bdf8]/10 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105 group relative overflow-hidden"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-[#38bdf8]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                        <span className="relative z-10">{item.label}</span>
                                    </SmartLink>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Action Buttons with Stagger Animation */}
                        <div className={`border-t border-gray-600 pt-4 space-y-3 transform transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}>

                            {status === "authenticated" && session?.user ? (
                                <>
                                    {/* Mobile User Profile */}
                                    <SmartLink
                                        href="/dashboard"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 px-4 py-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                                    >
                                        {session.user.image ? (

                                        <Image
                                            src={session.user.image || "/default-user.png"} // fallback अगर image ना हो
                                            alt={session.user.name || "User"}
                                            width={40}   // Tailwind w-10 = 40px
                                            height={40}  // Tailwind h-10 = 40px
                                            className="rounded-full border-2 border-[#38bdf8] object-cover"
                                        />
                                        ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center text-white font-semibold border-2 border-[#38bdf8]">
                                            {session.user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-medium truncate">{session.user.name || "User"}</div>
                                            <div className="text-xs text-gray-400 truncate">{session.user.email}</div>
                                        </div>
                                    </SmartLink>

                                    {/* Mobile Logout Button */}
                                    <button onClick={handleLogout} className="block w-full py-3 px-4 text-center bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white rounded-lg font-medium hover:from-[#0ea5e9] hover:to-[#0284c7] transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 relative overflow-hidden group" > <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span> <span className="relative z-10">Logout</span> </button>

                                </>
                            ) : (
                                <SmartLink
                                    href="/signin"
                                    onClick={closeMenu}
                                    className="block w-full py-3 px-4 text-center bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white rounded-lg font-medium hover:from-[#0ea5e9] hover:to-[#0284c7] transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 relative overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                    <span className="relative z-10">Sign In</span>
                                </SmartLink>
                            )}

                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/saurabh9303"
                                onClick={closeMenu}
                                className="flex items-center justify-center gap-3 w-full py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 transform hover:scale-105 group"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="transition-transform duration-300 group-hover:rotate-12"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub Profile
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-in {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3); }
                    50% { box-shadow: 0 4px 30px rgba(56, 189, 248, 0.5); }
                }
                
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                }
                
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
                .animate-slide-in { animation: slide-in 0.8s ease-out forwards; }
                .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
            `}</style>
        </nav>
    );
}