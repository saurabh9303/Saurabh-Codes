export default function StatusPage() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6 border m-1 border-slate-500 rounded-xl text-gray-200">
            <h1 className="text-4xl font-bold text-[#8ab4f8] mb-6">System Status – SaurabhCodes</h1>
            <p className="text-gray-400 mb-6">
                Monitor the health and uptime of <span className="font-semibold">SaurabhCodes</span> services in real time. Stay informed about website, blogs, authentication, and API status.
            </p>

            <div className="p-5 rounded-lg bg-[#1a1e2c] border border-[#2f3547]">
                <h2 className="text-2xl font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-400"></span>
                    All Systems Operational
                </h2>
                <p className="text-gray-400">All services including Website, Blogs, Auth System, and APIs are running smoothly with no reported incidents in the past 30 days.</p>
            </div>

            <h3 className="text-xl font-semibold text-[#a78bfa] mt-10 mb-3">Services Status</h3>
            <ul className="text-gray-400 list-disc pl-5 space-y-1">
                <li>🌐 Website – ✅ Operational</li>
                <li>📝 Blogs – ✅ Operational</li>
                <li>🔐 Auth System – ✅ Operational</li>
                <li>⚙️ APIs – ✅ Operational</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#a78bfa] mt-10 mb-3">Recent Incidents</h3>
            <ul className="text-gray-400 list-disc pl-5 space-y-1">
                <li>Oct 10, 2025 — API downtime (resolved within 12 min)</li>
                <li>Oct 10, 2025 — Scheduled maintenance completed successfully</li>
            </ul>
        </div>
    );
}
