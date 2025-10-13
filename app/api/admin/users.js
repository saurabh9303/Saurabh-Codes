import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET(req) {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    const users = await User.find().select("-__v -password");
    return new Response(JSON.stringify({ users }), { status: 200 });
}
