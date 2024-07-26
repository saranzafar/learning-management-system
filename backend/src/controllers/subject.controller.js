import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Subject } from "../models/subject.model.js";

const addSubject = asyncHandler(async (req, res) => {
    const { name, teacher, grade } = req.body;
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
    deleteSubject,
};
