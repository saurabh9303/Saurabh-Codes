"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";


export default function ContactPageOptimized() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⛔ Not logged in
    if (!session) {
      setError("Please sign in before submitting the form.");
      return;
    }

    // Basic validation
    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        formType: "contact",
        name: session.user?.name || "Anonymous User",
        email: session.user?.email,
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      };

      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong while submitting the form.");
      }

      // ✅ Success
      setSuccess(true);
      setForm({ phone: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <main className="from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden border m-1 border-slate-500 rounded-xl text-white min-h-screen">
      {/* HERO */}
      <section className="pt-20 pb-6 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#a78bfa]">
            Contact Me
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            I&apos;m always open to discussing new projects or collaborations. Send a message, and I&apos;ll get back to you within 1–2 days..
          </p>
        </div>
      </section>

      {/* MAIN SPLIT */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 pb-12 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: FORM */}
          <div className="lg:col-span-7 ">
            <div className="bg-white/5 backdrop-blur-md   border border-slate-500 rounded-2xl p-5 sm:p-8 shadow-lg">

              <p
                role="alert"
                className="text-sm mb-3 text-yellow-800 bg-yellow-50 border-l-4 border-yellow-200 px-4 py-2 rounded-md"
              >
                💡 Please ensure you are signed in before submitting.
              </p>

              <h2 className="text-xl sm:text-2xl text-purple-400 font-semibold">
                Contact Form
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Share a few details and we&apos;ll reply with next steps.
              </p>


              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="name"
                    value={session?.user?.name || ""}
                    readOnly
                    placeholder="Your full name"
                    className="px-3 py-2 rounded-lg bg-gray-700/40 w-full text-white border border-gray-600 cursor-not-allowed"
                  />

                  <input
                    name="email"
                    type="email"
                    value={session?.user?.email || ""}
                    readOnly
                    placeholder="Email address"
                    className="px-3 py-2 rounded-lg bg-gray-700/40 w-full text-white border border-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your 10-digit Indian Number"
                    className="px-3 py-2 rounded-lg bg-white/10 w-full placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject"
                    className="px-3 py-2 rounded-lg bg-white/10 w-full placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your project"
                  className="w-full px-3 py-2 rounded-lg bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-300">
                    Prefer email ?{" "}
                    <a href="mailto:saurabhkumar930308@gmail.com" className="underline text-blue-400">
                      saurabhkumar930308@gmail.com
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 font-semibold cursor-pointer disabled:opacity-60 text-sm sm:text-base"
                  >
                    {submitting ? "Sending..." : "Contact Now"}
                  </button>
                </div>

                {error && (
                  <div className="mt-3 p-3 rounded-lg bg-red-600/80 text-white text-sm sm:text-base">
                    ❌ {error}
                  </div>
                )}
                {success && (
                  <div className="mt-3 p-3 rounded-lg bg-green-600/80 text-white text-sm sm:text-base">
                    ✅ Successfully submitted — we&apos;ll contact you soon.
                  </div>
                )}
              </form>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="px-3 py-2 rounded-lg bg-white/10 text-xs sm:text-sm border border-slate-500">
                Trusted by startups
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 text-xs sm:text-sm border border-slate-500">
                Fast responses
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 text-xs sm:text-sm border border-slate-500">
                Secure & private
              </div>
            </div>
          </div>

          {/* RIGHT: INFO + MAP */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl p-5 sm:p-6 backdrop-blur-md bg-white/10  border border-slate-500 shadow-md">
              <h3 className="text-lg sm:text-xl text-purple-400 font-bold">
                🌍 Remote-First. All India.
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                We are available for questions, feedback, or collaboration
                opportunities. Let us know how we can help!
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md  border border-slate-500 rounded-2xl p-5 sm:p-6">
              <h4 className="font-semibold text-lg text-purple-400 mb-4">Other ways to reach</h4>
              <div className="flex items-center gap-5">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/saurabh0nly/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48">
                    <radialGradient id="instaGradient" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#fdf497" />
                      <stop offset=".35" stopColor="#fd5949" />
                      <stop offset=".6" stopColor="#d6249f" />
                      <stop offset="1" stopColor="#285AEB" />
                    </radialGradient>
                    <path fill="url(#instaGradient)" d="M34,4H14C8.5,4,4,8.5,4,14v20c0,5.5,4.5,10,10,10h20c5.5,0,10-4.5,10-10V14C44,8.5,39.5,4,34,4z" />
                    <path fill="#fff" d="M24,15c-5,0-9,4-9,9c0,5,4,9,9,9s9-4,9-9C33,19,29,15,24,15z M24,29c-2.8,0-5-2.2-5-5c0-2.7,2.2-5,5-5c2.8,0,5,2.3,5,5 C29,26.8,26.8,29,24,29z M34.5,14c0,1.2-1,2.2-2.2,2.2S30,15.2,30,14s1-2.2,2.2-2.2S34.5,12.8,34.5,14z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/saurabh-kumar-b19256364/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48">
                    <path fill="#0288D1" d="M42,4H6C4.9,4,4,4.9,4,6v36c0,1.1,0.9,2,2,2h36c1.1,0,2-0.9,2-2V6C44,4.9,43.1,4,42,4z" />
                    <path fill="#FFF" d="M12 19h4v18h-4zM14 14c1.3 0 2-.8 2-2s-.7-2-2-2-2 .9-2 2 .7 2 2 2zM20 19h4v2.6c.6-1.2 2.2-2.6 4.7-2.6 4 0 4.8 2.6 4.8 6v12h-4v-10c0-2.4-.5-3.8-2.6-3.8-2.1 0-3.1 1.5-3.1 3.8v10h-4V19z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/saurabh9303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1.5 2.2 2.7 2.2 2.1-.1 3.1-.3 3.6-.7.1-.7.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.7.1-3.4 0 0 1-.3 3.3 1.2 1-.3 2-.5 3-.5s2 .2 3 .5c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3.1.1 3.4.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.5 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

              </div>
            </div>
            <div className="rounded-2xl overflow-hidden  border border-slate-500">
              <iframe
                title="office-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191053.86649614977!2d80.70130894867343!3d24.602822588671547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39847f12a0d55141%3A0xa6208334386e35e2!2sSatna%2C%20Madhya%20Pradesh!5e1!3m2!1sen!2sin!4v1763787645936!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
