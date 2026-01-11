'use client'
import Image from "next/image";
import Link from "next/link";
import TypingEffect from "@/components/TypingEffect";
import SmartLink from "@/components/SmartLink";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1c1f2b] text-[#e5e7eb] flex flex-col items-center justify-center px-4 py-16">

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between w-[95vw] max-w-6xl gap-12 bg-gradient-to-br from-[#1f2333] to-[#252a39] backdrop-blur-xl border border-[#3a4157]/50 rounded-3xl p-10 shadow-[0_0_25px_rgba(138,180,248,0.08)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(138,180,248,0.15)]">

        {/* ✨ Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Welcome to <span className="text-[#38bdf8]">SaurabhCodes</span>
          </h1>

          {/* ✅ Typing Effect Text */}
          <p className="text-lg md:text-2xl font-extrabold tracking-tight leading-relaxed min-h-[40px] text-[#a78bfa]">
            <TypingEffect />
          </p>

          {/* 🚀 CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <SmartLink
              href="/projects"
              className="bg-[#8ab4f8] hover:bg-[#6b9ff5] transition-all duration-300 px-6 py-3 rounded-xl font-semibold text-[#1c1f2b] text-center"
            >
              View Projects
            </SmartLink>
            <SmartLink
              href="/portfolio"
              className="border border-[#8ab4f8] hover:bg-[#8ab4f8] hover:text-[#1c1f2b] transition-all duration-300 px-6 py-3 rounded-xl font-semibold text-[#8ab4f8] text-center"
            >
              Portfolio
            </SmartLink>
          </div>
        </div>

        {/* 📸 Profile Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[#8ab4f8]/50 hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/your-photo.png"
              alt="Your Photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== Skills Section ===== */}
      <section className="max-w-5xl w-[95vw] mt-20 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#8ab4f8]">Services & Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Web Development",
              desc: "Responsive, performance-focused websites using Next.js, React, and Tailwind.",
            },
            {
              title: "UI/UX Design",
              desc: "Elegant, user-centric interfaces with a premium touch and smooth experience.",
            },
            {
              title: "Backend Solutions",
              desc: "Scalable backend systems & APIs to power modern, reliable applications.",
            },
          ].map((item, index) => (
           <div
              key={index}
              className="bg-[#252a39]/70 border border-[#3a4157] p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 hover:cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-[#a78bfa] mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-8">
          <SmartLink
            href="/services"
            className="w-full md:col-span-1 px-20 py-3 bg-[#252a39]/80 border border-[#3a4157] text-[#a78bfa] font-semibold rounded-2xl hover:bg-[#3a4157] hover:text-white hover:scale-105 transition-all duration-300"
          >
            Show More →
          </SmartLink>
        </div>
      </section>


      <section className="max-w-5xl w-[95vw] mt-20 mb-10">
        <div className="bg-gradient-to-r from-[#8ab4f8]/20 to-[#a78bfa]/20 border border-[#8ab4f8]/30 rounded-3xl p-10 text-center shadow-[0_0_30px_rgba(138,180,248,0.1)]">
          <h2 className="text-3xl font-bold mb-4 text-[#8ab4f8]">Ready to Start Your Project?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Let&apos;s collaborate and bring your ideas to life with cutting-edge technology and design.
          </p>
          <SmartLink
            href="/contact"
            className="inline-block bg-[#8ab4f8] hover:bg-[#6b9ff5] transition-all duration-300 px-8 py-4 rounded-xl font-semibold text-[#1c1f2b] text-lg"
          >
            Get In Touch
          </SmartLink>
        </div>
      </section>
    </main>
  );
}
