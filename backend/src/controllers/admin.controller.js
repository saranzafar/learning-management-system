import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Admin } from "../models/admin.model.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, location } = req.body;
    console.log(name, email, password, location);

    if (!name || !email || !password || !location) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields", {}));
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(409).json(new ApiResponse(409, "Email already in use", {}));
    }

    // Check for primary image
    const logoImageLocalPath = req.file?.path;
    console.log("img: ", logoImageLocalPath);

    if (!logoImageLocalPath) {
        return res.status(400).json(new ApiResponse(400, "Primary Image is required", {}));
    }

    // Upload primary image to Cloudinary
    const logoImageUpload = await uploadOnCloudinary(logoImageLocalPath);
    if (!logoImageUpload) {
        return res.status(400).json(new ApiResponse(400, "Failed to upload primary image", {}));
    }

    // Prepare the image URL
    const logoImageUrl = logoImageUpload.url;

    // Create admin object and save to DB
    const admin = new Admin({
        name,
        email,
        password,
        location,
        logo: logoImageUrl
    });

    await admin.save();
    return res.status(201).json(new ApiResponse(201, "Admin registered successfully", { admin }));
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(new ApiResponse(400, "Please provide all required fields"));
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(401).json(new ApiResponse(401, "Invalid email"));
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(401).json(new ApiResponse(401, "Invalid password"));
    }

    const token = jwt.sign({ _id: admin._id, email: admin.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
    // Send the response with the token
    return res.status(200).json(new ApiResponse(200, "Login successful", { token, admin }));
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
