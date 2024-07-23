import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema({
    grade: {
        type: mongoose.Types.ObjectId,
        ref: "Grade",
        required: true,
    },
    subjects: [{
        type: mongoose.Types.ObjectId,
        ref: "Subject",
        required: true,
    }],
    students: [{
        student: {
            type: mongoose.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        attendance: {
            type: Number,
            required: true,
            default: 0
        }
    }]
}, { timestamps: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
