import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Timetable } from "../models/timetable.model.js"
import { Student } from "../models/student.model.js"
import jwt from "jsonwebtoken";

const getStudentsByGrade = asyncHandler(async (req, res) => {
    const { grade } = req.body;
    if (!grade) {
        return res.status(400).json(new ApiResponse(400, "Grade name is required"));
    }

    const validGrades = ["Grade-1", "Grade-2", "Grade-3", "Grade-4", "Grade-5", "Grade-6", "Grade-7", "Grade-8"];
    if (!validGrades.includes(grade)) {
        return res.status(400).json(new ApiResponse(400, "Invalid grade name"));
    }

    const students = await Student.find({ grade })
    if (!students || students.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No student found for the given grade"));
    }

    return res.status(200).json(new ApiResponse(200, "Subjects retrieved successfully", { students }));
});


export {
    getStudentsByGrade,
};
