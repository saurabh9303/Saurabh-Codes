import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        image: String,
        provider: String,
        providerAccountId: String,
        emailVerified: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        lastLogin: { type: Date, default: Date.now },
        role: { type: String, enum: ["user", "admin"], default: "user" }, // ✅ role support
        status: { type: String, default: "active" },
        loginCount: { type: Number, default: 0 },
        ipAddress: String,
        device: String,
        location: { type: String, default: "undefined" },
        plan: { type: String, default: "free" },
        referralCode: String,
        bio: String,
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
