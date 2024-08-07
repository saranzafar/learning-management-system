import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Student } from "../models/student.model.js";


const registerStudent = asyncHandler(async (req, res) => {
    const { name, fatherName, rollNo, dateOfBirth, gender, address, phoneNumber, grade, user } = req.body;

    if (!name || !fatherName || !rollNo || !dateOfBirth || !gender || !address || !phoneNumber || !grade || !user) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields"));
    }

    // Check if student with the same rollNo, grade, and user already exists
    const existingStudent = await Student.findOne({ rollNo, grade, user });
    if (existingStudent) {
        return res.status(409).json(new ApiResponse(409, "Student with this roll number already exists"));
    }

    // Create a new student
    const student = new Student({
        name,
        fatherName,
        rollNo,
        password: "student@123",
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        grade,
        user
    });
    await student.save();

    return res.status(201).json(new ApiResponse(201, "Student registered successfully", {}));
});


const getAllStudents = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log("ID::", id);

    const students = await Student.find({ user: id });

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
