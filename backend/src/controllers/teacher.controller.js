import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import jwt from "jsonwebtoken";

const registerTeacher = asyncHandler(async (req, res) => {
    const { name, email, gender, address, phoneNumber, password } = req.body;

    if (!name || !email || !gender || !address || !phoneNumber || !password) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields"));
    }
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
        return res.status(409).json(new ApiResponse(409, "Email already in use"));
    }

    const teacher = new Teacher({
        name,
        email,
        gender,
        address,
        phoneNumber,
        password
    });

    await teacher.save();

    return res.status(201).json(new ApiResponse(201, "Teacher added successfully", { teacher }));
});

const loginTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(new ApiResponse(400, "Please provide email and password"));
    }

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
        return res.status(401).json(new ApiResponse(401, "Invalid email or password"));
    }

    const isPasswordCorrect = await teacher.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(401).json(new ApiResponse(401, "Invalid email or password"));
    }

    const token = jwt.sign({ _id: teacher._id, email: teacher.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    });

    // Send response with token
    res.status(200).json(new ApiResponse(200, "Login successful", { token }));
});

const getAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find().select("-password");

    if (!teachers || teachers.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No teachers found", []));
    }

    return res.status(200).json(new ApiResponse(200, "Teachers retrieved successfully", { teachers }));
});

const deleteTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json(new ApiResponse(404, "Please provide teacher id"));
    }

    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
        return res.status(404).json(new ApiResponse(404, "Teacher not found"));
    }

    return res.status(200).json(new ApiResponse(200, "Teacher deleted successfully"));
});

export {
    registerTeacher,
    loginTeacher,
    getAllTeachers,
    deleteTeacher,
};
