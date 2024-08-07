import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
    },
    name: {
        type: String,
        required: true,
        default: "teacher"
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: "teacher@123"
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
}, { timestamps: true });

teacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

teacherSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

export const Teacher = mongoose.model('Teacher', teacherSchema);
