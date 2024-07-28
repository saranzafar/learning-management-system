import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
    },
    grade: {
        type: String,
        require: true,
        enum: ["Grade-1", "Grade-2", "Grade-3", "Grade-4", "Grade-5", "Grade-6", "Grade-7", "Grade-8"],
    }
}, { timestamps: true });

export const Subject = mongoose.model('Subject', subjectSchema);
