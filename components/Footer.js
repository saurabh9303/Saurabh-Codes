"use client";
import SmartLink from "@/components/SmartLink";
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="w-full bg-[#12141c] text-[#e5e7eb] border-t border-[#2a2f3d]">
            <div className="w-[95vw] max-w-7xl mx-auto py-14 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* 🧭 Brand & Mission */}
                <div>
                    <h2 className="text-2xl font-bold text-[#8ab4f8] mb-3">&lt;SaurabhCodes/&gt;</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Empowering developers, creators, and learners with insightful blogs, useful tools, and professional services — all in one place.
                    </p>
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} SaurabhCodes. All rights reserved.
                    </p>
                </div>

                {/* 🌐 Explore */}
                <div>
                    <h3 className="text-lg font-semibold text-[#a78bfa] mb-4">Explore</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li><SmartLink href="/" className="hover:text-[#8ab4f8] transition">Home</SmartLink></li>
                        <li><SmartLink href="/blogs" className="hover:text-[#8ab4f8] transition">Blogs</SmartLink></li>
                        <li><SmartLink href="/portfolio" className="hover:text-[#8ab4f8] transition">Portfolio</SmartLink></li>
                        <li><SmartLink href="/services" className="hover:text-[#8ab4f8] transition">Services</SmartLink></li>
                        <li><SmartLink href="/contact" className="hover:text-[#8ab4f8] transition">Contact</SmartLink></li>
                    </ul>
                </div>

                {/* 📘 Resources */}
                <div>
                    <h3 className="text-lg font-semibold text-[#a78bfa] mb-4">Resources</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li><SmartLink href="/terms" className="hover:text-[#8ab4f8] transition">Terms of Service</SmartLink></li>
                        <li><SmartLink href="/privacy" className="hover:text-[#8ab4f8] transition">Privacy Policy</SmartLink></li>
                        <li><SmartLink href="/security" className="hover:text-[#8ab4f8] transition">Security</SmartLink></li>
                        <li><SmartLink href="/status" className="hover:text-[#8ab4f8] transition">System Status</SmartLink></li>
                        <li><SmartLink href="/community" className="hover:text-[#8ab4f8] transition">Community</SmartLink></li>
                    </ul>
                </div>

                {/* 📧 Connect */}
                <div>
                    <h3 className="text-lg font-semibold text-[#a78bfa] mb-4">Connect</h3>
                    <div className="flex space-x-5 mb-4">
                        <div className="flex space-x-5 mb-4">
                            <a href="https://github.com/saurabh9303" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1e2332] rounded-full hover:bg-[#2c3a51] transition">
                                <Image src="/images/github.png" alt="GitHub" width={22} height={22} className="rounded-full" />
                            </a>
                            <a href="https://www.linkedin.com/in/saurabh-kumar-b19256364/" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1e2332] rounded-full hover:bg-[#2c3a51] transition">
                                <Image src="/images/linkedin.png" alt="LinkedIn" width={22} height={22} className="rounded-full" />
                            </a>
                            <a href="mailto:saurabhkumar930308@gmail.com" className="p-2 bg-[#1e2332] rounded-full hover:bg-[#8ab4f8] transition">
                                <Image src="/images/mail.png" alt="Email" width={22} height={22} className="rounded-full" />
                            </a>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400">Join us to stay updated with new blogs & features.</p>
                    <form className="mt-3 flex">
                        <input
                            type="email"
                            placeholder="⚠ Subscription Currently Disabled"
                            className="px-3 py-2 text-sm bg-[#1c2130] border border-[#2f3547] rounded-l-md outline-none w-full text-gray-500 cursor-not-allowed"
                            disabled
                        />
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-600 text-black font-semibold rounded-r-md cursor-not-allowed opacity-70"
                            disabled
                        >
                            Subscribe
                        </button>
                    </form>

                </div>
            </div>

            {/* 📜 Bottom Note */}
            <div className="border-t border-[#2a2f3d] py-5 text-center text-xs text-gray-500">
                Built with ❤️ by <span className="text-[#8ab4f8] font-medium">Saurabh Kumar — All Rights Reserved </span>
            </div>
        </footer>
    );
}
