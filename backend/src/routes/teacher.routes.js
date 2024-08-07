import express from "express";
import {
    registerTeacher,
    getAllTeachers,
    deleteTeacher,
} from "../controllers/teacher.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(verifyJwt)

router.post("/register-teacher", registerTeacher);
router.post("/get-all-teachers", getAllTeachers);
router.delete("/delete-teacher/:id", deleteTeacher);

export default router;
