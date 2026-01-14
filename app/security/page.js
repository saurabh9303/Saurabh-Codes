export default function SecurityPage() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6 border m-1 border-slate-500 rounded-xl text-gray-200">
            <h1 className="text-4xl font-bold text-[#8ab4f8] mb-6">Security & Data Protection</h1>
            <p className="text-gray-400 mb-6">
                At SaurabhCodes, we are committed to protecting your data and maintaining a secure environment. This page outlines the security practices implemented to protect user information and platform integrity.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">1. Secure Infrastructure</h2>
            <p className="text-gray-400 mb-5">
                Our platform is hosted on secure cloud infrastructure with regular updates, firewalls, and monitoring to prevent unauthorized access or vulnerabilities.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">2. Data Encryption</h2>
            <p className="text-gray-400 mb-5">
                All data transmitted between you and our platform is protected using HTTPS (SSL/TLS). Sensitive data such as authentication details are securely encrypted and never stored in plain text.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">3. Authentication & Access Control</h2>
            <p className="text-gray-400 mb-5">
                We use trusted authentication providers (Google/GitHub via NextAuth) to ensure secure login and prevent unauthorized access. Administrative access is restricted and monitored.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">4. Vulnerability Reporting</h2>
            <p className="text-gray-400 mb-5">
                If you discover a security vulnerability, please report it responsibly to:
                <br />📧 <span className="font-semibold">saurabhkumar930308@gmail.com</span>
                <br />We review and address all reports promptly to maintain the safety of our platform.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">5. Continuous Improvement</h2>
            <p className="text-gray-400 mb-5">
                We continuously monitor and improve our security measures through regular updates, system audits, and best practices.
            </p>
        </div>
    );
}
