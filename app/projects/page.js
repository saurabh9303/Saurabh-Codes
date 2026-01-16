"use client";
import React from "react";
import Image from "next/image";

export default function ProjectsGrid() {
  const projects = [
    {
      id: 1,
      title: "Chitrakoot Tourism Website",
      short:
        "A tourism-focused web platform showcasing the culture, temples, and travel spots of Chitrakoot.",
      tech: ["HTML", "CSS", "JavaScript", "Express", "Node.js", "MongoDB"],
      features: [
        "Dynamic temple and destination pages",
        "User inquiry form with backend support",
        "Responsive design",
        "MongoDB-based content management",
        "Photo gallery & travel info",
      ],
      screenshot: "/project-ss-chitrakoot.png",
      live: "https://chitrakoot-tourism-awl4.onrender.com/",
      source: "https://github.com/saurabh9303/Chitrakoot-Tourism",
    },
    {
      id: 2,
      title: "Cyber Cafe Management System",
      short:
        "A Next.js application to manage cyber cafe operations including users, sessions, and billing.",
      tech: ["Next.js", "NextAuth", "MongoDB", "Tailwind CSS", "Node.js"],
      features: [
        "Google OAuth authentication",
        "Admin dashboard",
        "Session & billing management",
        "Print management",
        "Mobile responsive UI",
      ],
      screenshot: "/cyber-cafe-ss.jpg",
      live: "https://saurabh-cafe-one.vercel.app/",
      source: "https://github.com/saurabh9303/cyber-cafe",
    },
    {
      id: 3,
      title: "Jewelry Shop Management System",
      short:
        "A full-stack e-commerce app for managing jewelry products, orders, and online payments.",
      tech: [
        "Next.js",
        "NextAuth",
        "MongoDB",
        "Tailwind CSS",
        "Node.js",
        "Razorpay",
      ],
      features: [
        "User authentication",
        "Cart & order placement",
        "Online payments",
        "Order history & cancellation",
        "Role-based admin panel",
      ],
      screenshot: "/jewelry-shop-ss.jpg",
      live: "https://jewellery-shop-alpha.vercel.app/",
      source: "https://github.com/saurabh9303/Jewellery-shop",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-12 text-gray-100 border m-1 border-slate-500 rounded-xl">
      <div className="max-w-auto mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-500 mb-4">
          Projects
        </h1>

        <p className="mb-6 text-m text-yellow-800 border-l-4 border-yellow-500 px-4 py-3 font-semibold rounded">
          Below are selected projects showcasing my experience in full-stack web development, including real-world applications and production-ready solutions.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-slate-600 bg-neutral-900/60 overflow-hidden hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/9]">
                <Image
                  src={p.screenshot}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-purple-500">{p.title}</h2>

                <p className="mt-2 text-sm text-neutral-300">
                  {p.short}
                </p>

                {/* FEATURES */}
                <h2 className="text-lg mt-3 font-bold text-[#8ab4f8]">Features</h2>
                <div className="ml-3 mt-2 flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1 rounded-full bg-neutral-800 border border-slate-500"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* TECH */}
                <h2 className="text-lg mt-3 font-bold text-[#8ab4f8] ">Technologies</h2>
                <div className="ml-3 mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-neutral-800 border border-slate-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="mt-5 flex gap-3">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 w-full rounded-full bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-black text-sm font-medium hover:opacity-90"
                  >
                   🌐 Live
                  </a>
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 w-full rounded-full border border-slate-500 text-sm hover:bg-slate-800"
                  >
                     &lt;/&gt;Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
