import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FormSubmission from "@/models/FormSubmission";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    await connectDB();

    try {
        // 🔹 1. Check user session
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: "You must be logged in to submit the form." },
                { status: 401 }
            );
        }

        // 🔹 2. Parse body
        const body = await req.json();
        const { formType, name, email, phone, subject, message, service } = body;

        // 🔹 3. Basic validations
        if (!formType || !["portfolio", "services", "contact"].includes(formType)) {
            return NextResponse.json(
                { success: false, error: "Invalid form type" },
                { status: 400 }
            );
        }

        if (!name || name.trim().length < 2) {
            return NextResponse.json(
                { success: false, error: "Name must be at least 2 characters" },
                { status: 400 }
            );
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { success: false, error: "Valid email is required" },
                { status: 400 }
            );
        }

        if (!message || message.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: "Message is required" },
                { status: 400 }
            );
        }

        // 🔹 4. Type-specific validations
        if (formType === "services" && !service) {
            return NextResponse.json(
                { success: false, error: "Service is required for services form" },
                { status: 400 }
            );
        }

        if (formType === "contact") {
            if (!phone || !/^[0-9]{10}$/.test(phone)) {
                return NextResponse.json(
                    { success: false, error: "Valid 10-digit phone number required" },
                    { status: 400 }
                );
            }
            if (!subject) {
                return NextResponse.json(
                    { success: false, error: "Subject is required" },
                    { status: 400 }
                );
            }
        }

        // 🔹 5. Create form with logged-in user info
        const newForm = await FormSubmission.create({
            ...body,
            submittedBy: session.user.name,
            submittedEmail: session.user.email,
        });

        return NextResponse.json(
            {
                success: true,
                data: newForm,
                message: "Form submitted successfully!",
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("❌ POST /forms error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to submit form" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const forms = await FormSubmission.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify({ forms }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ forms: [] }), { status: 500 });
    }
}


export async function DELETE(req) {
    await connectDB();

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: "You must be logged in to delete a form." },
                { status: 401 }
            );
        }

        // Get form ID from query params
        const url = new URL(req.url);
        const id = url.searchParams.get("id"); // ?id=<formId>

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Form ID is required" },
                { status: 400 }
            );
        }

        const deleted = await FormSubmission.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: "Form not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Form deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("❌ DELETE /forms error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to delete form" },
            { status: 500 }
        );
    }
}