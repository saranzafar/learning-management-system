import express from "express";
import {
getStudentsByGrade
} from "../controllers/feeReport.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(verifyJwt)

router.post("/get-students-by-grade",getStudentsByGrade );

export default router;
