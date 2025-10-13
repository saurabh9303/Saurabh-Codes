'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const featured = [
    { title: 'Chitrakoot Tourism Website', subtitle: 'Journey through Nature, Myth & Devotion', tags: ['Design', 'React', 'Tailwind'], link: 'https://chitrakoot-tourism-awl4.onrender.com/' },
    { title: 'Socket-based realtime messaging platform - (WhatsApp Inspired)', subtitle: 'Coming Soon....', tags: ['    ', ' ', '  '], link: '#' },
    { title: 'Fast checkout and offline-first UX - E-Commerce PWA', subtitle: 'Coming Soon....', tags: ['    ', '   ', '  '], link: '#' }
  ];

  const skills = [
    { name: 'HTML', icon: '/icons/html.png' },
    { name: 'CSS', icon: '/icons/css.png' },
    { name: 'JavaScript', icon: '/icons/javascript.png' },
    { name: 'TypeScript', icon: '/icons/typescript.png' },
    { name: 'React', icon: '/icons/react.png' },
    { name: 'Next.js', icon: '/icons/nextjs.png' },
    { name: 'Node.js', icon: '/icons/nodejs.png' },
    { name: 'Express', icon: '/icons/express.png' },
    { name: 'NestJS', icon: '/icons/nestjs.png' },
    { name: 'MongoDB', icon: '/icons/mongodb.png' },
    { name: 'MySQL', icon: '/icons/mysql.png' },
    { name: 'Tailwind', icon: '/icons/tailwind.png' },
    {name:'Bootstrap', icon:'/icons/bootstrap.png'},
    { name: 'Git', icon: '/icons/git.png' },
    { name: 'GitHub', icon: '/icons/github.png' }
  ];

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    // 🔒 Not logged in — show message instead of error
    if (status !== "authenticated" || !session?.user) {
      setSuccess("Please sign in to submit the form ⚠️");
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
      return;
    }

    try {
      const payload = {
        formType: "portfolio",
        name: session.user.name,
        email: session.user.email,
        message: formData.message.trim(),
      };

      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong");

      setSuccess("✅ Successfully submitted!");
      setSubmitted(true);
      setFormData({ name: session.user.name, email: session.user.email, message: "" });

      setTimeout(() => {
        setSubmitted(false);
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(err);
      setSuccess("❌ Submission failed, please try again.");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSuccess("");
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={windowWidth} className="min-h-screen bg-gradient-to-b from-white/50 to-transparent dark:from-[#071025] dark:via-[#061028] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <main className="max-w-6xl mx-auto px-4 sm:px-5 py-8 sm:py-12">

        {/* HERO SECTION */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Full-stack & Product-focused</p>
            <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-tight break-words">
              I craft modern products —
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06b6d4] via-[#7c3aed] to-[#f472b6]">
                from UI to APIs
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              I specialise in building fast, accessible and maintainable web applications using modern stacks like Next.js, Node.js, and scalable databases. I enjoy working on systems that feel delightful and perform reliably in production.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 w-full">
              <a href="#projects" className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm border border-slate-200/20 dark:border-slate-700 bg-white/80 dark:bg-white/3 shadow-sm hover:translate-y-[-2px] transition">Featured Projects</a>
              <a href="#contact" className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm border border-transparent bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-white shadow-md hover:brightness-95 transition">Hire / Contact</a>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#06b6d4] to-[#7c3aed] text-slate-900 font-bold text-sm">SK</div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold break-words">Saurabh Kumar <span className='text-green-500'>•</span> A Full Stack Web Developer</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Full-Stack Engineer</div>
                </div>
              </div>

              <div className="flex gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex-wrap">
                <div>🇮🇳 Based in India</div>
                <div className='font-extrabold text-green-500'>•</div>
                <div>Available for remote</div>
              </div>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <aside className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-sm rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-white/70 to-transparent dark:from-[#041421] border border-slate-200/10 dark:border-slate-800/40 shadow-xl">
              <div className="flex-1 flex justify-center">
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[#8ab4f8]/50 hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/your-photo.png"
                    alt="Your Photo"
                    fill
                    priority
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <div><div className="text-base sm:text-lg font-semibold">5+</div><div className="text-xs text-slate-500 dark:text-slate-400">Month</div></div>
                <div><div className="text-base sm:text-lg font-semibold">5+</div><div className="text-xs text-slate-500 dark:text-slate-400">Projects</div></div>
                <div><div className="text-base sm:text-lg font-semibold"></div>50+<div className="text-xs text-slate-500 dark:text-slate-400">Clients</div></div>
              </div>
            </div>
          </aside>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects" className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold">Featured Projects</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">Browse projects showcasing UI design and backend architecture — click ‘View Project’ for details.</p>

          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featured.map((p) => (
              <article key={p.title} className="group rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#031421] border border-slate-200/8 dark:border-slate-800/40 shadow-sm hover:shadow-lg transform transition hover:-translate-y-2 min-h-[220px] sm:min-h-[240px]">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold break-words flex-1">{p.title}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Featured</div>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">{p.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200">{t}</span>
                  ))}
                </div>

                <div className="mt-6">
                  <a href={p.link} className="flex-1 text-center text-xs sm:text-sm px-3 py-2 rounded-md border border-slate-200/10 dark:border-slate-700">View Project →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold">Tech & Skills</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((s) => (
              <div
                key={s.name}
                className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
              >
                {/* Skill Icon - Larger */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl bg-slate-50 dark:bg-slate-700/30 flex items-center justify-center">
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full rounded-2xl"
                  />
                </div>

                {/* Skill Name */}
                <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 text-center">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-2 order-2 lg:order-none">
            <h2 className="text-xl sm:text-2xl font-bold">About Me</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              I build end-to-end products — from defining interfaces and component systems to designing APIs and selecting the right data models. I focus on clarity, performance, and developer experience so teams can scale effectively.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Frontend', 'React, Next.js, Tailwind, TypeScript, Accessibility'],
                ['Backend', 'Node.js, Express, NestJS, REST, GraphQL'],
                ['Databases', 'MongoDB, MySQL / PostgreSQL, Redis'],
                ['Deploy', 'Vercel, Docker, CI/CD, Observability'],
              ].map(([title, desc]) => (
                <div key={title} className="p-4 rounded-lg bg-slate-50 dark:bg-white/3 border border-slate-200/8 dark:border-slate-800/40">
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 break-words">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1 order-1 lg:order-none bg-white/60 dark:bg-[#041427]/60 rounded-2xl p-4 sm:p-6 border border-slate-200/8 dark:border-slate-800/40">
            <div className="text-sm font-semibold">Quick Facts</div>
            <ul className="mt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <li>📍 Based in India</li>
              <li>💼 Open to freelance & full-time</li>
              <li>⚡️ Remote-friendly</li>
            </ul>

            <div className="mt-6">
              <a href="#contact" className="block text-center rounded-md px-4 py-2.5 sm:py-3 text-sm bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-white font-semibold">Work with me</a>
            </div>
          </aside>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-12 sm:mt-16 mb-12 sm:mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Get in touch</h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">Have a project or want to say hi? Send a short message and I'll reply.</p>

            <form
              onSubmit={handleSubmit}
              className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4"
            >
              {/* 👤 Name */}
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                readOnly={!!session?.user?.name}
                className={`w-full p-2.5 sm:p-3 text-sm rounded-md ${session?.user ? "bg-gray-200 dark:bg-gray-800 cursor-not-allowed" : "bg-slate-50 dark:bg-white/5"
                  } border border-slate-200/8 dark:border-slate-800/40`}
              />

              {/* 📧 Email */}
              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                readOnly={!!session?.user?.email}
                className={`w-full p-2.5 sm:p-3 text-sm rounded-md ${session?.user ? "bg-gray-200 dark:bg-gray-800 cursor-not-allowed" : "bg-slate-50 dark:bg-white/5"
                  } border border-slate-200/8 dark:border-slate-800/40`}
              />

              {/* 💬 Message */}
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full p-2.5 sm:p-3 text-sm rounded-md bg-slate-50 dark:bg-white/5 border border-slate-200/8 dark:border-slate-800/40 h-32 sm:h-36 resize-none"
              />

              {/* 🔘 Button */}
              <button
                type="submit"
                className={`w-full rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-white font-semibold cursor-pointer
    ${submitted
                    ? success.toLowerCase().includes("error")
                      ? "bg-red-500"
                      : success.toLowerCase().includes("sign in")
                        ? "bg-yellow-500" // ⚠️ Warning for not logged in
                        : "bg-green-500"
                    : "bg-gradient-to-r from-[#06b6d4] to-[#7c3aed]"
                  }
    transition-all duration-500 flex items-center justify-center gap-2`}
                disabled={loading}
              >
                {submitted ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                          success.toLowerCase().includes("error")
                            ? "M6 18L18 6M6 6l12 12"
                            : "M5 13l4 4L19 7"
                        }
                      />
                    </svg>
                    {success}
                  </>
                ) : loading ? (
                  <span>Sending...</span>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </div>

          <aside className="bg-white/60 dark:bg-[#041427]/60 rounded-2xl p-4 sm:p-6 border border-slate-200/8 dark:border-slate-800/40">
            <div className="text-sm sm:text-base font-semibold">Other ways to reach</div>
            <div className="mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 break-words">
              <div>📧 kumarsaurabh09546@gmail.com</div>
              <div>💬 Telegram: @saurabhkumar</div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a className="flex-1 text-center text-sm rounded-md px-3 sm:px-4 py-2 border border-slate-200/8 dark:border-slate-800/40 cursor-pointer">Resume</a>
              <a className="flex-1 text-center text-sm rounded-md px-3 sm:px-4 py-2 border border-slate-200/8 dark:border-slate-800/40 cursor-pointer">Portfolio PDF</a>
            </div>
          </aside>
        </section>
      </main>

      <style jsx>{`
        @keyframes floatUp { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .animate-fade-in { animation: floatUp 600ms ease forwards }
        @media (max-width: 380px) { h1 { font-size: 1.25rem; } }
      `}</style>
    </div>
  );
}