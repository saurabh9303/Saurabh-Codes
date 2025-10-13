import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // 🔍 Debug: check what your token actually contains
    // console.log("Token Data:", token);

    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token || token.role !== "admin") {
            const url = new URL("/dashboard", req.url);
            return NextResponse.redirect(url); // redirect unauthorized users
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // apply middleware only for /admin routes
};
