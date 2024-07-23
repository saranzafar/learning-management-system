import mongoose, { Schema } from "mongoose";

const gradeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subjects: [{
        type: mongoose.Types.ObjectId,
        ref: "Subject",
    }]
}, { timestamps: true });


export const Grade = mongoose.model('Grade', gradeSchema);