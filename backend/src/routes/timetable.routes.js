import express from "express";
import {
    getSubjectsByGrade,
} from "../controllers/timetable.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(verifyJwt)

router.post("/get-subject-by-grade", getSubjectsByGrade);

export default router;
