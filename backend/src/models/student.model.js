import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "student"
    },
    rollNumber: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: "student@123"
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    grade: {
        type: mongoose.Types.ObjectId,
        ref: "Grade",
    },
}, { timestamps: true });

// Hash the password before saving the document
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const Student = mongoose.model('Student', studentSchema);
