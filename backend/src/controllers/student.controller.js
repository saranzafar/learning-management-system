import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Student } from "../models/student.model.js";


const registerStudent = asyncHandler(async (req, res) => {
    const { name, fatherName, rollNo, dateOfBirth, gender, address, phoneNumber, grade } = req.body;

    if (!name || !fatherName || !rollNo || !dateOfBirth || !gender || !address || !phoneNumber || !grade) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields"));
    }
    const student = new Student({
        name,
        fatherName,
        rollNo,
        password: "student@123",
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        grade
    });
    await student.save();

    return res.status(201).json(new ApiResponse(201, "Student registered successfully", {}));
});

const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();

    if (!students || students.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No Student found", []));
    }

    return res.status(200).json(new ApiResponse(200, "Student retrieved", { students }));
});

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("ID:: ", id);


    if (!id) {
        return res.status(404).json(new ApiResponse(404, "Please provide student id"));
    }
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
        return res.status(404).json(new ApiResponse(404, "Student not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Student deleted successfully"));
});


export {
    registerStudent,
    getAllStudents,
    deleteStudent,
};
