"use client";
import React, { useState } from "react";
import Image from "next/image";

// Responsive project grid with elegant expandable cards
export default function ProjectsGrid() {
  const [expanded, setExpanded] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Chitrakoot Tourism Website",
      short: "A tourism-focused web platform showcasing the culture, temples, and travel spots of Chitrakoot.",
      tech: ["HTML", "CSS", "JavaScript", "Express", "Node.js", "MongoDB"],
      features: [
        "Dynamic temple and destination pages",
        "User contact / inquiry form with backend support",
        "Responsive design for all devices",
        "MongoDB-powered content management",
        "Photo gallery and travel information",
      ],
      thumb: "/project-thumb-chitrakoot.jpg",   // replace with your image path
      screenshot: "/project-ss-chitrakoot.png", // replace with your image path
      live: "https://chitrakoot-tourism-awl4.onrender.com/",
      source: "https://github.com/saurabh9303/Chitrakoot-Tourism",
    },
    {
      id: 2,
      title: "Cyber cafe Management System",
      short: "A comprehensive Next.js application to manage cyber cafe operations efficiently, including user management, session tracking, and billing.",
      tech: ["Next.js", "NextAuth", "MongoDB", "Tailwind CSS", "Node.js"],
      features: [
        "User authentication with Google OAuth",
        "Admin dashboard for monitoring users and sessions",
        "Form submission and record keeping",
        "Real-time billing and print management",
        "Responsive and mobile-friendly interface"
      ],
      thumb: "/cyber-cafe-thumb.jpg",
      screenshot: "/cyber-cafe-ss.jpg",
      live: "https://saurabh-cafe-one.vercel.app/",
      source: "https://github.com/saurabh9303/cyber-cafe",
    },

    {
      id: 3,
      title: "Jewelry Shop Management System",
      short: "A full-stack e-commerce application for managing jewelry products, orders, and secure online payments with role-based access.",
      tech: ["Next.js", "NextAuth", "MongoDB", "Tailwind CSS", "Node.js", "Razorpay"],
      features: [
        "User authentication using NextAuth",
        "Product browsing, add-to-cart, and order placement",
        "Online payments via Razorpay and Cash on Delivery option",
        "Order cancellation and order history for users",
        "Role-based admin dashboard to manage users, products, and orders"
      ],
      thumb: "/jewelry-shop-thumb.jpg",
      screenshot: "/jewelry-shop-ss.jpg",
      live: "https://your-jewelry-project.vercel.app/",
      source: "https://github.com/saurabh9303/Jewellery-shop"
    }

  ];

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">


        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-purple-600">
          Projects
        </h1>

        <p className="mb-4 text-sm text-yellow-800 border-l-4 border-yellow-500 px-4 py-3 font-semibold rounded">
          Notice: The first project is now live. Additional projects are currently in development and will be added shortly.
        </p>

        <p className="mb-8 text-sm text-gray-400 font-medium italic">
          💡 Tip: Click a card to view a detailed mini‑report. Click again or press “Close” to collapse it.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => {
            const isOpen = expanded === p.id;
            return (
              <article
                key={p.id}
                className={`relative rounded-2xl bg-gradient-to-br from-gray-800/70 to-black/50 ring-1 ring-gray-700 overflow-hidden transition-all duration-500 ${isOpen ? "shadow-2xl scale-[1.03] sm:col-span-2 lg:col-span-3" : "hover:shadow-lg"
                  }`}
              >
                {/* Card header / preview */}
                <button
                  onClick={() => setExpanded(isOpen ? null : p.id)}
                  className={`w-full text-left p-6 flex flex-col gap-5 transition-all duration-500 ${isOpen ? "pb-0" : "pb-6"
                    }`}
                  aria-expanded={isOpen}
                >
                  <div className="cursor-pointer flex items-start gap-6">
                    <div className="w-24 h-20 rounded-lg bg-gray-700 flex-shrink-0 overflow-hidden">
                      <Image
                        src={p.thumb}
                        alt={`${p.title} thumbnail`}
                        width={500}          // or any fixed width you want
                        height={300}         // or a fixed height; maintains aspect ratio
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{p.title}</h2>
                      <p className="text-sm text-gray-300 mt-2 leading-relaxed">{p.short}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span key={t} className="text-xs px-2 py-1 rounded bg-gray-800/70 ring-1 ring-gray-700">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <div
                  className={`transition-[max-height,opacity,padding] duration-500 overflow-hidden bg-gradient-to-t from-black/30 to-transparent ${isOpen ? "max-h-[1200px] opacity-100 p-6 pt-0" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="mt-6 grid gap-8 lg:grid-cols-2 items-start">
                    {/* Left - Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold">Features</h3>
                        <ul className="mt-3 list-disc list-inside text-sm text-gray-300 space-y-1">
                          {p.features.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold">Tech stack</h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <span key={t} className="text-xs px-3 py-1 rounded bg-gray-800/50 ring-1 ring-gray-700">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex flex-wrap gap-4">
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-teal-500 text-sm font-semibold"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Live Demo
                        </a>

                        <a
                          href={p.source}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-700 text-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 6L2 12l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Source Code
                        </a>

                        <button
                          onClick={() => setExpanded(null)}
                          className="ml-auto text-xs px-4 py-2 rounded bg-gray-800/60 ring-1 ring-gray-700 hover:bg-gray-700/60"
                        >
                          Close
                        </button>
                      </div>
                    </div>

                    {/* Right - Screenshot */}
                    <div className="rounded-xl overflow-hidden bg-gray-800/40 ring-1 ring-gray-700 flex items-center justify-center h-80">
                      <Image
                        src={p.screenshot}
                        alt={`${p.title} screenshot`}
                        width={800}          // choose appropriate width
                        height={450}         // choose appropriate height to keep aspect ratio
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}