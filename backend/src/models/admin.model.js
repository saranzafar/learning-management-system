import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true // for searching purposes
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensure email is unique
        match: [/\S+@\S+\.\S+/, 'is invalid'] // Email validation
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    location: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: true
    },
}, { timestamps: true });

// Hash the password before saving the document
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10); // Await bcrypt hash
    next();
});

// Method to compare password for authentication
adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);
