import express from "express";
import {
  getAllClassroomTestsWithStatus,
  getClassroomTestsSubmitted,
  getStudentClassroom,
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentController.js";
import { verifyStudentToken } from "../middleware/verifyStudentToken.js";
import { submitTest } from "../controllers/testController.js";

const router = express.Router();
router.use(verifyStudentToken);

router.patch("/profile/update", updateStudentProfile);
router.get("/profile", getStudentProfile);
router.get("/classroom", getStudentClassroom);
router.get("/classroom/tests/completed", getClassroomTestsSubmitted);
router.get("/classroom/tests/", getAllClassroomTestsWithStatus);
router.post("/classroom/tests/submit-test", submitTest);

export default router;
