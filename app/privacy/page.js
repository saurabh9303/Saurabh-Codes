export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6 border m-1 border-slate-500 rounded-xl text-gray-200">
            <h1 className="text-4xl font-bold text-[#8ab4f8] mb-6">Privacy Policy</h1>
            <p className="text-gray-400 mb-6">
                At SaurabhCodes, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy explains what data we collect, how we use it, and the measures we take to protect it.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">1. Information We Collect</h2>
            <p className="text-gray-400 mb-5">
                We collect the following types of data:
                <br />• <span className="font-semibold">Account Data:</span> Name, email, and profile photo when you sign in via Google or GitHub.
                <br />• <span className="font-semibold">Form Submissions:</span> Name, email, phone number, subject, and message when you contact or apply for services.
                <br />• <span className="font-semibold">Technical Data:</span> IP address, login activity, device information, and analytics through Google Analytics.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-400 mb-5">
                We use your data to:
                <br />• Provide account access and personalized features.
                <br />• Respond to inquiries and process service requests.
                <br />• Monitor website performance, improve user experience, and ensure security.
                <br />We do not sell or trade your personal data under any circumstances.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">3. Data Security</h2>
            <p className="text-gray-400 mb-5">
                We implement security practices such as encrypted authentication (NextAuth) and restricted database access to protect your data from unauthorized use or breaches.
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">4. Your Rights</h2>
            <p className="text-gray-400 mb-5">
                You have the right to access, update, or request deletion of your personal data. To exercise these rights, please contact us at:
                <br />📧 <span className="font-semibold">saurabhkumar930308@gmail.com</span>
            </p>

            <h2 className="text-2xl font-semibold text-[#a78bfa] mb-3">5. Updates to This Policy</h2>
            <p className="text-gray-400 mb-5">
                This Privacy Policy may be updated periodically. Continued use of the website after changes signifies your acceptance of the revised policy.
            </p>
        </div>
    );
}
