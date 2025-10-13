import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { UAParser } from "ua-parser-js";

// ✅ Whitelisted admin emails
const ADMIN_EMAILS = [process.env.ADMIN_EMAILS];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // 🔹 Runs once at sign-in
    async signIn({ user, account, profile, request }) {
      await connectDB();

      const userAgent = request?.headers?.get("user-agent") || "";
      const parser = new UAParser(userAgent);
      const deviceInfo = `${parser.getBrowser().name || "Unknown"} ${parser.getBrowser().version || ""} on ${parser.getOS().name || "Unknown"} ${parser.getOS().version || ""}`;

      const ip = request?.headers?.get("x-forwarded-for")?.split(",")[0]
        || request?.headers?.get("x-real-ip")
        || "Unknown";

      let location = user?.location || profile?.location || "undefined";

      // ✅ Find existing user
      const existing = await User.findOne({ email: user.email });

      if (existing) {
        existing.lastLogin = new Date();
        existing.loginCount += 1;
        existing.provider = account.provider;
        existing.providerAccountId = account.providerAccountId;
        existing.ipAddress = ip;
        existing.device = deviceInfo;
        existing.location = location;

        // ✅ Upgrade to admin if email matches whitelist
        if (ADMIN_EMAILS.includes(user.email)) existing.role = "admin";

        await existing.save();
      } else {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          emailVerified: true,
          ipAddress: ip,
          device: deviceInfo,
          location,
          role: ADMIN_EMAILS.includes(user.email) ? "admin" : "user",
        });
      }

      return true;
    },

    // 🔹 Add `role` and other info to the JWT
    async jwt({ token, user }) {
      await connectDB();

      // When user logs in for the first time
      if (user?.email) {
        const dbUser = await User.findOne({ email: user.email });

        token.id = dbUser?._id?.toString();
        token.role = dbUser?.role || "user";
        token.plan = dbUser?.plan || "free";
        token.status = dbUser?.status || "active";
        token.ipAddress = dbUser?.ipAddress || "Unknown";
        token.device = dbUser?.device || "Unknown";
        token.location = dbUser?.location || "undefined";
      }

      return token;
    },

    // 🔹 Add the same data into session for client-side access
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.plan = token.plan;
      session.user.status = token.status;
      session.user.ipAddress = token.ipAddress;
      session.user.device = token.device;
      session.user.location = token.location;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/signin" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
