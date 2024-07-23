import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import {
    registerStudent,
    getAllStudents
} from "../controllers/student.controller.js";

const router = Router();

router.route('/register-student').post(
    upload.fields([
        { name: 'primaryImage', maxCount: 1 },
    ]),
    registerStudent
);
router.route('/get-all-students').get(getAllStudents);

export default router;
