// app/api/userData/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

  const user = await User.findById(session.user.id);
  return new Response(JSON.stringify(user), { status: 200 });
}
