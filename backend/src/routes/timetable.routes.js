import express from "express";
import {
    getSubjectsByGrade,
    addTimetable,
    getAllTimetables,
    deleteTimetable,
} from "../controllers/timetable.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(verifyJwt)

router.post("/get-subject-by-grade", getSubjectsByGrade);
router.post("/add-timetable", addTimetable);
router.get("/get-all-timetables/:id", getAllTimetables);
router.delete("/delete-timetable/:id", deleteTimetable);

export default router;
