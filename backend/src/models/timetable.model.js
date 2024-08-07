import mongoose, { Schema } from "mongoose";

const timeTableSchema = new Schema({
    grade: {
        type: String,
        required: true,
        unique: false,
        enum: ["Grade-1", "Grade-2", "Grade-3", "Grade-4", "Grade-5", "Grade-6", "Grade-7", "Grade-8"],
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
    },
    subject: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
    },
}, { timestamps: true });

timeTableSchema.index({ grade: 1, subject: 1 }, { unique: false });

export const Timetable = mongoose.model('Timetable', timeTableSchema);
