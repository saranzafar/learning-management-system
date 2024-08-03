import express from "express";
import {
    registerStudent,
    getAllStudents,
    deleteStudent,
} from "../controllers/student.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(verifyJwt)

router.post("/register-student", registerStudent);
router.get("/get-all-students", getAllStudents);
router.delete("/delete-student/:id", deleteStudent);

export default router;
