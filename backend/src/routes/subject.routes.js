import express from "express";
import {
    addSubject,
    deleteSubject,
    getAllSubjects
} from "../controllers/subject.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(verifyJwt)

router.post("/add-subject", addSubject);
router.post("/get-all-subjects", getAllSubjects);
router.delete("/delete-subject/:id", deleteSubject);

export default router;
