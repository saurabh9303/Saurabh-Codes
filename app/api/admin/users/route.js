import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ---------------- GET Users ----------------
export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        // ✅ Ensure admin access
        if (!session || session.user.role !== "admin") {
            return new Response(
                JSON.stringify({ success: false, error: "Unauthorized" }),
                { status: 401 }
            );
        }

        await connectDB();

        // ✅ Include all fields explicitly (even hidden ones like provider)
        const users = await User.find({})
            .select("+provider +providerAccountId +emailVerified")
            .sort({ createdAt: -1 })
            .lean();

        // ✅ Convert ObjectIds & Dates safely
        const safeUsers = users.map((u) => ({
            ...u,
            _id: u._id.toString(),
            createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null,
            updatedAt: u.updatedAt ? new Date(u.updatedAt).toISOString() : null,
            lastLogin: u.lastLogin ? new Date(u.lastLogin).toISOString() : null,
        }));

        return new Response(
            JSON.stringify({ success: true, users: safeUsers }),
            { status: 200 }
        );
    } catch (err) {
        console.error("❌ [GET /api/admin/users] Error:", err);
        return new Response(
            JSON.stringify({ success: false, error: "Server Error" }),
            { status: 500 }
        );
    }
}

// ---------------- DELETE User ----------------
export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        await connectDB();

        // Get user ID from query params
        const url = new URL(req.url);
        const userId = url.searchParams.get("id");

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
        }

        // Prevent admin from deleting themselves
        if (session.user.email === (await User.findById(userId)).email) {
            return new Response(JSON.stringify({ error: "You cannot delete yourself" }), { status: 400 });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, message: "User deleted successfully" }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
    }
}

