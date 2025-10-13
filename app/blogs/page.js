"use client";
import Image from "next/image";
// import Link from "next/link";
import SmartLink from "@/components/SmartLink";

export default function Blogs() {
  const posts = [
    {
      id: 1,
      title: "Mastering Next.js for Production",
      desc: "A complete guide to deploying scalable and high-performance web applications using Next.js.",
      
      slug: "mastering-nextjs",
    },
    {
      id: 2,
      title: "Tailwind CSS Best Practices",
      desc: "Write cleaner, faster, and more responsive UI with Tailwind CSS tips used by professionals.",
      
      slug: "tailwind-css-best-practices",
    },
    {
      id: 3,
      title: "Backend Architecture with Node.js",
      desc: "Learn how to design robust, secure, and scalable backend systems with Node.js and Express.",
     
      slug: "backend-architecture-node",
    },
    {
      id: 4,
      title: "Advanced API Design",
      desc: "Best practices for structuring and scaling RESTful and GraphQL APIs for modern applications.",
      
      slug: "advanced-api-design",
    },
  ];

  return (
    <main className="min-h-screen bg-[#1c1f2b] text-[#e5e7eb] px-4 py-20 flex flex-col items-center">
      {/* ===== Header ===== */}
      <div className="text-center max-w-3xl mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-[#a78bfa]">Blogs</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Insights, tutorials, and tips on full-stack development, UI/UX, and modern web technologies.
        </p>
      </div>

      {/* ===== Blog Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[95vw] max-w-7xl">
        {posts.map((post) => (
          <SmartLink key={post.id} href={`/blogs/${post.slug}`} className="group">
            <div className="bg-[#252a39]/70 backdrop-blur-xl border border-[#3a4157] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[#3a4157]/40 flex flex-col h-full">
              {/* 🖼 Blog Image */}
              <div className="relative w-full h-56">
                <Image
                  src='/images/blog-placeholder.webp'
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* 📄 Blog Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-[#8ab4f8] mb-3">{post.title}</h2>
                <p className="text-gray-400 text-sm flex-grow">{post.desc}</p>

                <span className="mt-5 inline-block text-center bg-[#8ab4f8] text-[#1c1f2b] px-5 py-2 rounded-xl font-semibold hover:bg-[#6b9ff5] transition-all duration-300">
                  Read More →
                </span>
              </div>
            </div>
          </SmartLink>
        ))}
      </div>
    </main>
  );
}


