import express from "express";
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin
} from "../controllers/admin.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);
router.post("/logout-admin", verifyJwt, logoutAdmin);

export default router;
