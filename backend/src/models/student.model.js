import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    rollNo: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
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
        type: String,
        required: true,
        unique: false,
        enum: ["Grade-1", "Grade-2", "Grade-3", "Grade-4", "Grade-5", "Grade-6", "Grade-7", "Grade-8"],
    },
}, { timestamps: true });

// Hash the password before saving the document
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const Student = mongoose.model('Student', studentSchema);
