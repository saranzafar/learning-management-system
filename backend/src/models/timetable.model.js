import mongoose, { Schema } from "mongoose";

const timeTableSchema = new Schema({
    //here we will give grade name and search in Subject Schema
    grade: {
        type: String,
        require: true,
        enum: ["Grade-1", "Grade-2", "Grade-3", "Grade-4", "Grade-5", "Grade-6", "Grade-7", "Grade-8"],
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    time: [{
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    }]
}, { timestamps: true });

// Create a compound index to ensure no duplicate subject entries for a given grade
timeTableSchema.index({ grade: 1, "subjects": 1 }, { unique: true });

// Add validation for time fields
timeTableSchema.path('time').validate(function (value) {
    value.forEach(timeSlot => {
        if (timeSlot.startTime >= timeSlot.endTime) {
            throw new Error('Start time must be before end time');
        }
    });
}, 'Invalid time slot');

export const Timetable = mongoose.model('Timetable', timeTableSchema);
