import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "teacher"
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
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

// Hash the password before saving the document
teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const Teacher = mongoose.model('Teacher', teacherSchema);
