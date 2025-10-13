import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
    {
        formType: {
            type: String,
            enum: ["portfolio", "services", "contact"],
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
            index: true,
        },

        service: {
            type: String,
            required: function () {
                return this.formType === "services";
            },
            trim: true,
            maxlength: [100, "Service field cannot exceed 100 characters"],
        },

        phone: {
            type: String,
            required: function () {
                return this.formType === "contact";
            },
            validate: {
                validator: function (v) {
                    return !v || /^[0-9]{10}$/.test(v);
                },
                message: "Phone number must be 10 digits",
            },
        },

        subject: {
            type: String,
            required: function () {
                return this.formType === "contact";
            },
            trim: true,
            maxlength: [100, "Subject cannot exceed 100 characters"],
        },

        message: {
            type: String,
            required: [true, "Message is required"],
            maxlength: [500, "Message cannot exceed 500 characters"],
        },

        // 👇 Added: info from logged-in user
        userName: {
            type: String,
            default: null,
        },
        userEmail: {
            type: String,
            default: null,
            lowercase: true,
        },

        // 👇 Added: time of submission
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt automatically
    }
);

// Index for faster search
formSchema.index({ email: 1, name: 1 });

const FormSubmission =
    mongoose.models.FormSubmission ||
    mongoose.model("FormSubmission", formSchema);

export default FormSubmission;
