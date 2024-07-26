import express from "express";
import {
    addSubject,
    deleteSubject,
} from "../controllers/subject.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();
router.use(verifyJwt)

router.post("/add-subject", addSubject);
router.param("/delete-subject/:id", deleteSubject);

export default router;
