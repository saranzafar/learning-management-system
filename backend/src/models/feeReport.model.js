import mongoose, { Schema } from "mongoose";

const feeSchema = new Schema({
    grade: {
        type: mongoose.Types.ObjectId,
        ref: "Grade",
        required: true
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        required: true
    }
}, { timestamps: true });

// Ensure unique fee record for each student for each month
feeSchema.index({ student: 1, month: 1 }, { unique: true });

export const Fee = mongoose.model('Fee', feeSchema);
