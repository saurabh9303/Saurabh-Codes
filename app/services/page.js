"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SERVICES = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    subtitle: "High-performance, scalable web applications",
    details: "Building complete web applications using React, Next.js, Node.js, Express, MongoDB, and MySQL with responsive, accessible, and maintainable architecture."
  },
  {
    id: 2,
    title: "UI/UX Development",
    subtitle: "Intuitive, responsive, and user-centric interfaces",
    details: "Implementing responsive and accessible interfaces using React, Tailwind CSS, and Bootstrap, with reusable components and smooth user interactions."
  },
  {
    id: 3,
    title: "API & Backend Development",
    subtitle: "Secure, scalable, and efficient server-side solutions",
    details: "Developing robust REST APIs with Node.js and Express, integrating databases, implementing secure authentication, and connecting third-party services."
  },
  {
    id: 4,
    title: "Database Management",
    subtitle: "Optimized, reliable data solutions",
    details: "Designing and managing MongoDB and MySQL databases, ensuring data integrity, optimized queries, and high performance for web applications."
  },
  {
    id: 5,
    title: "Performance & SEO Optimization",
    subtitle: "Faster, more discoverable web applications",
    details: "Implementing technical SEO best practices, optimizing website and application performance, and improving page speed and user experience."
  },
  {
    id: 6,
    title: "Maintenance & Support",
    subtitle: "Ensuring long-term reliability and security",
    details: "Providing ongoing maintenance, security updates, performance monitoring, and troubleshooting to keep applications secure and up-to-date."
  },
  {
    id: 7,
    title: "Version Control & Collaboration",
    subtitle: "Professional code management and teamwork",
    details: "Managing codebases with Git and GitHub for version control, collaboration, and clean, maintainable project workflows."
  }
];

export default function ServicesOptimized() {
  const { data: session } = useSession();
  const [openId, setOpenId] = useState(null);
  const [activeFormId, setActiveFormId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", service: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(""); // Portfolio-style dynamic button

  const toggle = (id) => {
    if (openId === id) {
      setOpenId(null);
      setActiveFormId(null);
      setSubmitted(false);
      setSuccess("");
    } else {
      setOpenId(id);
      setActiveFormId(null);
      setSubmitted(false);
      setSuccess("");
    }
  };

  const openFormInCard = (id, title) => {
    setOpenId(id);
    setActiveFormId(id);
    setForm({ name: session?.user?.name || "", email: session?.user?.email || "", message: "", service: title });
    setSubmitted(false);
    setSuccess("");
  };

  // Auto-fill name & email if session changes
  useEffect(() => {
    if (session?.user && activeFormId) {
      setForm(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session, activeFormId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      setSubmitted(true);
      setSuccess("Please sign in to submit ⚠️");
      return;
    }

    if (!activeFormId) return;

    setSubmitting(true);

    try {
      const serviceValue = form.service || SERVICES.find(s => s.id === activeFormId)?.title || "Unknown Service";

      const payload = {
        formType: "services",
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        service: serviceValue,
      };

      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitted(true);
        setSuccess(data.error || "Error submitting form");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setSuccess("✅ submitted - we’ll contact you soon.");
      setSubmitting(false);

      setTimeout(() => {
        setActiveFormId(null);
        setOpenId(null);
        setForm({ name: session?.user?.name || "", email: session?.user?.email || "", message: "", service: "" });
        setSubmitted(false);
        setSuccess("");
      }, 10000);

    } catch (err) {
      setSubmitted(true);
      setSuccess("Something went wrong");
      setSubmitting(false);
    }
  };

  const onKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") toggle(id);
  };

  return (
    <main className="bg-gradient-to-b from-[#061228] to-[#000815] text-white min-h-screen">
      {/* HERO */}
      <section className="pt-16 pb-6 px-6 md:px-12 lg:px-24 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#a78bfa]">Services</h1>
        <p className="mt-3 text-gray-300 max-w-2xl mx-auto">We offer top-notch digital solutions tailored to your business needs — fast, secure and crafted for growth.</p>
      </section>

      {/* SERVICES GRID */}

      <section className="px-6 md:px-12 lg:px-24 pb-8">
        <p
          role="alert"
          className="text-sm mb-5 text-yellow-800 bg-yellow-50 border-l-4 border-yellow-200 px-4 py-2 rounded-md"
        >
          💡 Tip: Click on “Details” for any service to view full info and submit your request. We’ll get back to you within 1–2 working days!
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(s => {
            const isOpen = openId === s.id;
            const isFormOpen = activeFormId === s.id;

            return (
              <article key={s.id} className={`relative rounded-2xl overflow-hidden border border-white/7 bg-white/4 backdrop-blur-md shadow-lg transition-transform duration-300 ${isOpen ? "scale-[1.01] ring-2 ring-indigo-500/20" : "hover:-translate-y-1"}`}>
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-none text-indigo-200/90">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">{s.title}</h3>
                          <p className="text-sm text-gray-300 mt-1">{s.subtitle}</p>
                        </div>

                        <button type="button" onClick={() => toggle(s.id)} onKeyDown={(e) => onKey(e, s.id)}
                          aria-expanded={isOpen}
                          className="text-sm text-gray-300 bg-white/3 px-3 py-1 rounded-full hover:bg-white/6 focus:outline-none cursor-pointer">
                          {isOpen ? "Close" : "Details"}
                        </button>
                      </div>

                      <div className={`mt-4 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        {isFormOpen ? (
                          <form onSubmit={handleSubmit} className="mt-1 grid grid-cols-1 gap-3">
                            <div className="text-sm text-gray-300">
                              Applying for - <span className="font-medium text-[#a78bfa]">{form.service}</span>
                            </div>

                            <input
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              required
                              placeholder="Your name"
                              className="w-full px-3 py-2 rounded-lg bg-white/6 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              readOnly={!!session?.user?.name} // ✅ make readonly if user is logged in
                            />

                            <input
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              required
                              placeholder="Email address"
                              className="w-full px-3 py-2 rounded-lg bg-white/6 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              readOnly={!!session?.user?.email} // ✅ make readonly if user is logged in
                            />

                            <textarea
                              name="message"
                              value={form.message}
                              onChange={handleChange}
                              required
                              placeholder="Short message / requirements"
                              rows={4}
                              className="w-full px-3 py-2 rounded-lg bg-white/6 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="flex items-center justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => setActiveFormId(null)}
                                className="px-4 py-2 rounded-full bg-gray-600/30 text-white hover:bg-gray-600/50 transition"
                              >
                                Cancel
                              </button>

                              <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full rounded-full px-4 py-2 text-white font-semibold cursor-pointer ${submitted
                                  ? success.toLowerCase().includes("error")
                                    ? "bg-red-500"
                                    : success.toLowerCase().includes("sign in")
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  : "bg-gradient-to-r from-indigo-500 to-cyan-400"} transition-all duration-500 flex items-center justify-center gap-2`}
                              >
                                {submitted ? success : submitting ? "Sending..." : "Submit"}
                              </button>
                            </div>
                          </form>

                        ) : (
                          <div className="space-y-3">
                            <p className="text-sm text-gray-200 leading-relaxed">{s.details}</p>
                            <div className="flex items-center gap-3">
                              <button type="button" onClick={() => openFormInCard(s.id, s.title)}
                                className="cursor-pointer inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-sm font-medium shadow-sm">
                                Request This Service
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
