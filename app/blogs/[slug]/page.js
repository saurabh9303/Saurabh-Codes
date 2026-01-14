"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function BlogDetail() {
    // 🧠 All blogs with styled content
    const blogs = {
        "mastering-nextjs": {
            title: "Mastering Next.js for Production",
            sections: [
                {
                    title: "Introduction",
                    content: [
                        {
                            type: "paragraph",
                            text: "Next.js has rapidly become one of the most popular frameworks for building modern web applications. By combining the power of React with server-side rendering, static site generation, and API routes, Next.js offers developers an unparalleled toolkit for creating high-performance, scalable, and SEO-friendly applications."
                        },
                        {
                            type: "list",
                            items: ["Project setup", "Performance optimization", "Deployment strategies"]
                        }
                    ]
                },
                {
                    title: "Project Setup",
                    content: [
                        {
                            type: "paragraph", text: "Step:1 --> Initialize the Next.js"
                        },
                        {
                            type: "paragraph", text: "Project Start by creating a new Next.js application using the official CLI:"
                        },

                        { type: "code", language: "bash", text: "npx create-next-app@latest my-next-app\ncd my-next-app" },

                        {
                            type: "paragraph", text: "This will create a new folder my-nextjs-app with all the necessary files."
                        },

                        { type: "paragraph", text: "Step:2 --> Run the Development Server Start the app locally to check everything is working:" },
                        { type: "paragraph", text: "Server Start the app locally to check everything is working:" },
                        { type: "code", language: "bash", text: "npm run dev" },
                        { type: "paragraph", text: "Open your browser at http://localhost:3000 to see your Next.js app running." },

                        { type: "paragraph", text: "Step:3 --> Project Structure Overview A basic Next.js project has the following folders:" },
                        { type: "paragraph", text: "A basic Next.js project has the following folders:" },
                        { type: "code", language: "text", text: "/app\n  /components\n  /pages\n  /styles\n/public\n  /images" },

                        { type: "paragraph", text: "Step:4 --> Create Your First Page, You can add a new page by creating a file inside app/. For example, about.js:" },
                        { type: "code", language: "bash", text: "export default function About() {\n    return <h1>About Page</h1>;\n}" },
                        { type: "paragraph", text: "Visit http://localhost:3000/about to see your page." },
                    ]
                },
                {
                    "title": "Performance Optimization",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Optimizing performance is one of the most important aspects of building a production-ready Next.js application. A fast website improves user experience, increases engagement, and boosts SEO rankings. Next.js provides several built-in features and strategies to make your app faster and more efficient."
                        },
                        {
                            "type": "list",
                            "items": [
                                "Optimize images using `next/image`",
                                "Split code and use dynamic imports",
                                "Use Static Site Generation (SSG) and Incremental Static Regeneration (ISR)",
                                "Use Server-Side Rendering (SSR) for dynamic content",
                                "Enable caching and use a Content Delivery Network (CDN)",
                                "Analyze and reduce bundle size",
                                "Lazy load components for faster initial page load"
                            ]
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 1 --> Optimize Images: Large images can slow down your website. Next.js provides the `next/image` component, which automatically optimizes images by resizing them and serving modern formats like WebP. It also provides lazy loading out of the box."
                        },
                        {
                            "type": "code",
                            "language": "jsx",
                            "text": "import Image from 'next/image';\n\nexport default function Home() {\n    return (\n        <div>\n            <h1>Welcome to My Site</h1>\n            <Image\n                src=\"/logo.png\"\n                alt=\"Site Logo\"\n                width={200}\n                height={200}\n            />\n        </div>\n    );\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 2 --> Code Splitting and Dynamic Imports: Loading all components at once can make your site slow. Dynamic imports allow you to load heavy components only when needed, reducing the initial load time."
                        },
                        {
                            "type": "code",
                            "language": "jsx",
                            "text": "import dynamic from 'next/dynamic';\n\n// Dynamically load HeavyComponent only when needed\nconst HeavyComponent = dynamic(() => import('../components/HeavyComponent'));\n\nexport default function Page() {\n    return (\n        <div>\n            <h2>My Page</h2>\n            <HeavyComponent />\n        </div>\n    );\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 3 --> Use Static Generation and ISR: Pages that do not change frequently can be pre-rendered at build time using Static Site Generation (`getStaticProps`). You can also use Incremental Static Regeneration (ISR) to automatically update static pages after a set time interval without rebuilding the entire site."
                        },
                        {
                            "type": "code",
                            "language": "jsx",
                            "text": "export async function getStaticProps() {\n    const res = await fetch('https://api.example.com/posts');\n    const posts = await res.json();\n\n    return {\n        props: { posts },\n        revalidate: 60 // Rebuild the page every 60 seconds\n    };\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 4 --> Use Server-Side Rendering (SSR) for Dynamic Pages: For pages that change frequently, SSR (`getServerSideProps`) ensures users always see the most up-to-date content while keeping the page fast."
                        },
                        {
                            "type": "code",
                            "language": "jsx",
                            "text": "export async function getServerSideProps() {\n    const res = await fetch('https://api.example.com/latest');\n    const data = await res.json();\n\n    return {\n        props: { data }\n    };\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 5 --> Analyze Bundle Size: Large JavaScript bundles slow down your website. Next.js provides a bundle analyzer to help you find and reduce heavy packages."
                        },
                        {
                            "type": "code",
                            "language": "bash",
                            "text": "npm install @next/bundle-analyzer\n\n// next.config.js\nconst withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });\nmodule.exports = withBundleAnalyzer({});"
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 6 --> Enable Caching and Use CDN: Serve static assets like images, fonts, and scripts through a CDN. Use caching headers to reduce repeated downloads and improve load times for returning users."
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 7 --> Lazy Load Components: Lazy loading non-essential components ensures that the main content loads quickly while secondary content loads in the background."
                        },
                        {
                            "type": "paragraph",
                            "text": "By following these performance optimization steps, you can ensure your Next.js application runs smoothly, loads fast, and provides a great user experience on both desktop and mobile devices."
                        }
                    ]
                },

                {
                    "title": "Deployment Strategies",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Deploying your Next.js application is the final step to make it accessible to users. Next.js supports multiple deployment strategies, from simple hosting services to advanced cloud setups. Choosing the right deployment approach ensures your app is fast, scalable, and reliable in production."
                        },
                        {
                            "type": "list",
                            "items": [
                                "Vercel Deployment (Recommended)",
                                "Netlify Deployment",
                                "Custom Server Deployment (e.g., Node.js, AWS, DigitalOcean)",
                                "Docker Deployment",
                                "Environment Variables for Production",
                                "Optimizing Build for Production"
                            ]
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 1 --> Deploy on Vercel (Recommended): Vercel is the company behind Next.js, offering seamless deployment with automatic optimizations. Simply connect your GitHub repository to Vercel and deploy in one click. Vercel handles SSR, SSG, and ISR automatically."
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 2 --> Deploy on Netlify: Netlify is another popular hosting platform. Build your app locally with `next build` and deploy the `.next` folder using Netlify CLI or GitHub integration. Netlify also provides CDN and caching for better performance."
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 3 --> Custom Server Deployment: You can host your Next.js app on your own server using Node.js. Build the app and run it using `next start`."
                        },
                        {
                            "type": "code",
                            "language": "bash",
                            "text": "npm run build\nnpm run start"
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 4 --> Docker Deployment: For consistent environments, Docker can be used. Create a Dockerfile to containerize your Next.js app and deploy it anywhere Docker is supported."
                        },
                        {
                            "type": "code",
                            "language": "dockerfile",
                            "text": "FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]"
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 5 --> Use Environment Variables: Production environment variables are essential for APIs, authentication keys, or any sensitive configuration. Create a `.env.production` file or configure them in your hosting platform."
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 6 --> Optimize Build for Production: Always run `next build` before deploying. This command generates an optimized production build with minified JavaScript, pre-rendered pages, and optimized assets for faster load times."
                        },
                        {
                            "type": "paragraph",
                            "text": "Step 7 --> Monitor Performance: After deployment, monitor your application using tools like Google Lighthouse, Vercel Analytics, or other monitoring services to ensure it runs smoothly and efficiently."
                        },
                        {
                            "type": "paragraph",
                            "text": "By following these deployment strategies, your Next.js app will be production-ready, scalable, and accessible to users worldwide with minimal effort."
                        }
                    ]
                }

            ]
        },
        "tailwind-css-best-practices": {
            "title": "Tailwind CSS Best Practices",
            "sections": [
                {
                    "title": "Introduction",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Tailwind CSS is a utility-first CSS framework that allows developers to build modern, responsive, and scalable user interfaces quickly. Unlike traditional CSS, Tailwind provides single-purpose utility classes that can be combined to create any design without writing custom CSS."
                        },
                        {
                            "type": "paragraph",
                            "text": "Following best practices ensures that your Tailwind projects are maintainable, performant, and production-ready."
                        }
                    ]
                },
                {
                    "title": "Project Setup",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Start by creating a Tailwind project with a modular configuration. Ensure you specify all template paths so unused CSS can be purged in production, keeping your CSS file small."
                        },
                        {
                            "type": "code",
                            "language": "javascript",
                            "text": "module.exports = {\n  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {}\n  },\n  plugins: []\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "Include Tailwind in your CSS file:"
                        },
                        {
                            "type": "code",
                            "language": "css",
                            "text": "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
                        },
                        {
                            "type": "paragraph",
                            "text": "Start your development server to verify the setup:"
                        },
                        {
                            "type": "code",
                            "language": "bash",
                            "text": "npm run dev"
                        }
                    ]
                },
                {
                    "title": "Responsive Design",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Tailwind makes building responsive layouts easy. Prefix utility classes with breakpoints to apply styles conditionally based on screen size."
                        },
                        {
                            "type": "code",
                            "language": "jsx",
                            "text": "<div className='p-4 sm:p-6 md:p-8 lg:p-10'>Responsive padding example</div>"
                        },
                        {
                            "type": "paragraph",
                            "text": "This ensures your layouts look good on all devices."
                        }
                    ]
                },
                {
                    "title": "Dark Mode",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Tailwind supports dark mode natively. Use the `dark:` prefix to apply styles when dark mode is active."
                        },
                        {
                            "type": "code",
                            "language": "jsx",
                            "text": "<div className='bg-white dark:bg-gray-800 text-black dark:text-white'>Dark mode ready</div>"
                        },
                        {
                            "type": "paragraph",
                            "text": "This allows your app to adapt seamlessly to user preferences."
                        }
                    ]
                },
                {
                    "title": "Performance Optimization",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Optimize your Tailwind project for production by removing unused CSS and minifying the output."
                        },
                        {
                            "type": "paragraph",
                            "text": "1. Purge unused CSS by properly configuring the content paths in tailwind.config.js."
                        },
                        {
                            "type": "code",
                            "language": "javascript",
                            "text": "module.exports = {\n  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}']\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "2. Minify CSS using the Tailwind CLI:"
                        },
                        {
                            "type": "code",
                            "language": "bash",
                            "text": "npx tailwindcss -o build.css --minify"
                        },
                        {
                            "type": "paragraph",
                            "text": "3. Split large components and reuse utility classes to reduce bundle size and improve maintainability."
                        }
                    ]
                }
            ]
        },

        "backend-architecture-node": {
            "title": "Backend Architecture with Node.js",
            "sections": [
                {
                    "title": "Introduction",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Node.js is a powerful, event-driven JavaScript runtime built on Chrome's V8 engine. It's ideal for building scalable, high-performance backends, especially for I/O-intensive applications like APIs, real-time services, and microservices."
                        },
                        {
                            "type": "paragraph",
                            "text": "This guide covers best practices for structuring, securing, and scaling Node.js applications in 2025."
                        }
                    ]
                },
                {
                    "title": "Folder Structure",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Organizing your Node.js project with a modular architecture promotes maintainability and scalability. A common structure includes:"
                        },
                        {
                            "type": "code",
                            "language": "text",
                            "text": "/src\n  /controllers\n  /services\n  /repositories\n  /routes\n  /models\n  /middleware\n  /config\n  /utils\n  /jobs"
                        },
                        {
                            "type": "paragraph",
                            "text": "This structure separates concerns, making it easier to manage and scale your application."
                        }
                    ]
                },
                {
                    "title": "Security",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Securing your Node.js application is crucial. Implement the following practices:"
                        },
                        {
                            "type": "list",
                            "items": [
                                "Use `helmet` to set secure HTTP headers.",
                                "Implement `express-rate-limit` to prevent brute-force attacks.",
                                "Use `jsonwebtoken` for stateless authentication.",
                                "Hash passwords with `bcryptjs`.",
                                "Validate and sanitize inputs to prevent injection attacks.",
                                "Use environment variables for sensitive information."
                            ]
                        },
                        {
                            "type": "paragraph",
                            "text": "Install necessary packages:"
                        },
                        {
                            "type": "code",
                            "language": "bash",
                            "text": "npm install helmet express-rate-limit jsonwebtoken bcryptjs dotenv"
                        }
                    ]
                },
                {
                    "title": "Scaling",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Node.js's single-threaded nature can be a limitation for CPU-bound tasks. To scale effectively:"
                        },
                        {
                            "type": "list",
                            "items": [
                                "Use the `cluster` module to spawn multiple processes and utilize multi-core systems.",
                                "Implement load balancing with tools like Nginx or HAProxy.",
                                "Use process managers like PM2 for automatic clustering and monitoring.",
                                "Consider microservices architecture for large applications."
                            ]
                        },
                        {
                            "type": "paragraph",
                            "text": "Example of clustering with the `cluster` module:"
                        },
                        {
                            "type": "code",
                            "language": "javascript",
                            "text": "const cluster = require('cluster');\nconst http = require('http');\nconst os = require('os');\n\nif (cluster.isMaster) {\n  const numCPUs = os.cpus().length;\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n  cluster.on('exit', (worker, code, signal) => {\n    console.log(`Worker ${worker.process.pid} died`);\n  });\n} else {\n  http.createServer((req, res) => {\n    res.writeHead(200);\n    res.end('Hello, world!');\n  }).listen(8000);\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "For handling millions of requests efficiently, consider using worker threads and clustering. This approach allows Node.js to handle CPU-bound tasks without blocking the event loop."
                        }
                    ]
                }
            ]
        },

        "advanced-api-design": {
            "title": "Advanced API Design with Node.js & MongoDB",
            "sections": [
                {
                    "title": "Introduction",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "APIs (Application Programming Interfaces) are the backbone of modern software, enabling different applications and services to communicate seamlessly. An Advanced API focuses on designing robust, scalable, and secure endpoints that go beyond basic CRUD operations."
                        },
                        {
                            "type": "paragraph",
                            "text": "This section explores best practices for building APIs that are:"
                        },
                        {
                            "type": "list",
                            "items": [
                            "Efficient: Optimized for performance and minimal latency.",
                            "Scalable: Capable of handling increasing loads without compromising stability.",
                            "Secure: Protected against common vulnerabilities and unauthorized access. ",
                            "Maintainable: Designed with clear structure, documentation, and versioning.",
                            ]
                        },
                        {
                            "type": "paragraph",
                            "text": "Whether you are working with REST, GraphQL, or other architectures, mastering advanced API concepts ensures that your backend is reliable, flexible, and ready for enterprise - level applications."
                        }
                    ]
                },
                {
                    "title": "RESTful API Patterns",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Follow consistent REST patterns and naming conventions for clarity and maintainability."
                        },
                        {
                            "type": "code",
                            "language": "text",
                            "text": "GET /users       # Fetch all users\nPOST /users      # Create a new user\nGET /users/:id   # Fetch a user by ID\nPUT /users/:id   # Update a user by ID\nDELETE /users/:id # Delete a user by ID"
                        },
                        {
                            "type": "paragraph",
                            "text": "Use proper HTTP status codes to communicate the result of operations clearly."
                        },
                        {
                            "type": "list",
                            "items": [
                                "200 OK – Successful GET, PUT, DELETE",
                                "201 Created – Successful POST",
                                "400 Bad Request – Invalid input",
                                "401 Unauthorized – Authentication required",
                                "403 Forbidden – Access denied",
                                "404 Not Found – Resource does not exist",
                                "500 Internal Server Error – Server failure"
                            ]
                        }
                    ]
                },
                {
                    "title": "MongoDB Integration",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Use MongoDB for storing and querying data. Mongoose simplifies schema definition and CRUD operations."
                        },
                        {
                            "type": "code",
                            "language": "javascript",
                            "text": "// Connect to MongoDB\nconst mongoose = require('mongoose');\nmongoose.connect('mongodb://localhost:27017/mydb', {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n});\n\n// Define a User model\nconst userSchema = new mongoose.Schema({\n  name: String,\n  email: { type: String, unique: true },\n  password: String\n});\nconst User = mongoose.model('User', userSchema);\n\n// Example CRUD operation\nasync function getUsers() {\n  return await User.find();\n}"
                        },
                        {
                            "type": "paragraph",
                            "text": "Always validate input and handle errors gracefully to prevent injection attacks and server crashes."
                        }
                    ]
                },
                {
                    "title": "Security Best Practices",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Secure your REST API using authentication, authorization, and other safeguards."
                        },
                        {
                            "type": "list",
                            "items": [
                                "Use JWT for authentication",
                                "Hash passwords with bcryptjs",
                                "Use Helmet for HTTP headers",
                                "Rate-limit requests to prevent abuse",
                                "Sanitize inputs to prevent NoSQL injections"
                            ]
                        },
                        {
                            "type": "code",
                            "language": "bash",
                            "text": "npm install express mongoose jsonwebtoken bcryptjs helmet express-rate-limit"
                        }
                    ]
                },
                {
                    "title": "Versioning & Scaling",
                    "content": [
                        {
                            "type": "paragraph",
                            "text": "Version your APIs to maintain backward compatibility when deploying new features."
                        },
                        {
                            "type": "code",
                            "language": "text",
                            "text": "/api/v1/users  # Version 1\n/api/v2/users  # Version 2"
                        },
                        {
                            "type": "paragraph",
                            "text": "Scale your API effectively by:"
                        },
                        {
                            "type": "list",
                            "items": [
                                "Using clustering (`cluster` module) for multi-core utilization",
                                "Load balancing with Nginx or HAProxy",
                                "Caching frequent queries with Redis",
                                "Indexing MongoDB collections for faster queries",
                                "Monitoring APIs using logging and metrics tools"
                            ]
                        }
                    ]
                }
            ]
        }
    };

    const params = useParams();
    const slug = params?.slug || "";
    const blog = blogs[slug];
    const [active, setActive] = useState(0);

    if (!blog) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#1c1f2b] text-gray-300">
                <h1 className="text-2xl md:text-3xl font-bold text-[#f87171]">
                    ❌ Blog Not Found
                </h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden border m-1 border-slate-500 rounded-xl text-[#e5e7eb] px-4 py-10 sm:py-16 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#8ab4f8] mb-10 text-center">
                {blog.title}
            </h1>

            <div className="w-full max-w-7xl bg-[#252a39]/70 backdrop-blur-xl  border border-slate-500 rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden h-[80vh] md:h-[85vh] lg:h-[90vh]">
                {/* Sidebar */}
                <aside className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-slate-500 p-5 sm:p-6 overflow-y-auto max-h-60 md:max-h-full">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#8ab4f8] mb-4 sm:mb-6">Contents</h2>
                    <ul className="space-y-2 sm:space-y-3">
                        {blog.sections.map((sec, i) => (
                            <li
                                key={i}
                                onClick={() => setActive(i)}
                                className={`cursor-pointer rounded-lg px-3 py-2 text-sm sm:text-base transition-all duration-300 ${active === i ? "bg-[#8ab4f8] text-[#1c1f2b] font-semibold" : "hover:bg-[#3a4157]/40 text-gray-300"
                                    }`}
                            >
                                {sec.title}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Content */}
                <section className="flex-1 p-5 sm:p-8 overflow-y-auto max-h-[calc(100%-2rem)] md:max-h-full">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#a78bfa] mb-4 sm:mb-6">
                        {blog.sections[active].title}
                    </h1>

                    {blog.sections[active].content.map((block, index) => {
                        switch (block.type) {
                            case "paragraph":
                                return (
                                    <p key={index} className="mb-4 text-gray-300 leading-relaxed text-base sm:text-lg">
                                        {block.text}
                                    </p>
                                );
                            case "list":
                                return (
                                    <ul key={index} className="mb-4 list-disc list-inside text-gray-300 space-y-1">
                                        {block.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            case "code":
                                return (
                                    <pre key={index} className="mb-4 bg-[#1c1f2b] border border-[#3a4157] rounded-lg p-4 overflow-x-auto text-sm sm:text-base text-green-300">
                                        <code>{block.text}</code>
                                    </pre>
                                );
                            default:
                                return null;
                        }
                    })}
                </section>
            </div>
        </main>
    );
}
