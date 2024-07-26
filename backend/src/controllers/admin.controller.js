import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Admin } from "../models/admin.model.js";  // Ensure you have the correct import path
import jwt from "jsonwebtoken";

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields", {}));
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        console.log("Existing");
        return res.status(409).json(new ApiResponse(409, "Email already in use", {}));
        // res.status(410).send({ error: "Email already in use" })

    }

    const admin = new Admin({
        name,
        email,
        password
    });

    await admin.save();
    console.log("SAVED");
    return res.status(201).json(new ApiResponse(201, "Admin registered successfully", { admin }));
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("LOGIN", email, password);
    if (!email || !password) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields"));
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(401).json(new ApiResponse(401, "Invalid email or password"));
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(401).json(new ApiResponse(401, "Invalid email or password"));
    }

    const token = jwt.sign({ _id: admin._id, email: admin.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    // Send the response with the token
    return res.status(200).json(new ApiResponse(200, "Login successful", { token }));
});

const logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken');
    return res.status(200).json(new ApiResponse(200, "Logout successful"));
});


export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
};
