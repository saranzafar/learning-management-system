import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Subject } from "../models/subject.model.js";

const addSubject = asyncHandler(async (req, res) => {
    const { name, teacher, grade } = req.body;
    console.log(name, teacher, grade);
    if (!name || !teacher || !grade) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields"));
    }

    const existingSubject = await Subject.findOne({
        $and: [{ name }, { grade }]
    });

    if (existingSubject) {
        return res.status(409).json(new ApiResponse(409, "Subject for this grade already in use"));
    }

    const subject = new Subject({
        name,
        teacher,
        grade
    });

    await subject.save();

    return res.status(201).json(new ApiResponse(201, "Subject added successfully", { subject }));
});

const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({}).populate('teacher', '-password');
    if (!subjects || subjects.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No subjects found"));
    }
    return res.status(200).json(new ApiResponse(200, "Subjects retrieved successfully", { subjects }));
});

const deleteSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
        return res.status(404).json(new ApiResponse(404, "Subject not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Subject deleted successfully"));
});


export {
    addSubject,
    getAllSubjects,
    deleteSubject,
};
