import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
    }
}, { timestamps: true });

export const Subject = mongoose.model('Subject', subjectSchema);
