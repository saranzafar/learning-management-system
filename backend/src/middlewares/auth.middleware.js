import jwt from "jsonwebtoken";
import {Admin} from "../models/admin.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized access", "No token provided"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Admin.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json(new ApiResponse(401, "Unauthorized access", "Invalid Access Token"));
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json(new ApiResponse(401, "Unauthorized access", "Token has expired"));
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json(new ApiResponse(401, "Unauthorized access", "Invalid Token"));
        }
        res.status(500).json(new ApiResponse(500, "Internal Server Error", error.message));
    }
});
