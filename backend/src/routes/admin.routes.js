import express from "express";
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin
} from "../controllers/admin.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"


const router = express.Router();
router.route('/register-admin').post(
    upload.single('logoImage'),
    registerAdmin
);

router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);
router.post("/logout-admin", verifyJwt, logoutAdmin);

export default router;
