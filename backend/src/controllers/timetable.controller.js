import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Timetable } from "../models/timetable.model.js"
import { Subject } from "../models/subject.model.js"
import jwt from "jsonwebtoken";

const getSubjectsByGrade = asyncHandler(async (req, res) => {
    const { grade } = req.body;
    if (!grade) {
        return res.status(400).json(new ApiResponse(400, "Grade name is required"));
    }

    const validGrades = ["Grade-1", "Grade-2", "Grade-3", "Grade-4", "Grade-5", "Grade-6", "Grade-7", "Grade-8"];
    if (!validGrades.includes(grade)) {
        return res.status(400).json(new ApiResponse(400, "Invalid grade name"));
    }

    const subjects = await Subject.find({ grade }).populate('teacher', '-password');
    if (!subjects || subjects.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No subjects found for the given grade"));
    }

    return res.status(200).json(new ApiResponse(200, "Subjects retrieved successfully", { subjects }));
});

const addTimetable = asyncHandler(async (req, res) => {
    const { grade, subject, startTime, endTime, teacher } = req.body.formData;

    if (!grade || !subject || !startTime || !endTime || !teacher) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields"));
    }

    // Check for existing timetable entry for the same grade and subject
    const existingTimetable = await Timetable.findOne({ grade, subject });
    if (existingTimetable) {
        return res.status(409).json(new ApiResponse(409, "Timetable entry for this grade and subject already exists"));
    }

    // Create new timetable entry
    const timetable = new Timetable({
        grade,
        subject,
        startTime,
        endTime,
        teacher
    });

    try {
        await timetable.save();
        return res.status(201).json(new ApiResponse(201, "Timetable added successfully", {}));
    } catch (error) {
        // Log the error for debugging
        console.error('Error saving timetable:', error);
        return res.status(500).json(new ApiResponse(500, "Error saving timetable"));
    }
});

const getAllTimetables = asyncHandler(async (req, res) => {
    const timetables = await Timetable.find().populate('teacher', '-password');

    if (!timetables || timetables.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No timetables found", []));
    }

    return res.status(200).json(new ApiResponse(200, "Timetables retrieved successfully", { timetables }));
});

const deleteTimetable = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json(new ApiResponse(404, "Please provide timetable id"));
    }
    const timetable = await Timetable.findByIdAndDelete(id);
    if (!timetable) {
        return res.status(404).json(new ApiResponse(404, "Timetable not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Timetable deleted successfully"));
});


export {
    getSubjectsByGrade,
    addTimetable,
    getAllTimetables,
    deleteTimetable,
};
