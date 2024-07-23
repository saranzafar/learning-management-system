import mongoose, { Schema } from "mongoose";

const timeTableSchema = new Schema({
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
