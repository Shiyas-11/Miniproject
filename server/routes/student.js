import express from "express";
import {
  getAllClassroomTestsWithStatus,
  getClassroomTestsSubmitted,
  getStudentClassroom,
  getStudentProfile,
  getTestByID,
  updateStudentProfile,
} from "../controllers/studentController.js";
import { verifyStudentToken } from "../middleware/verifyStudentToken.js";
import {
  getStudentSubmission,
  submitTest,
} from "../controllers/testController.js";

const router = express.Router();
router.use(verifyStudentToken);

router.patch("/profile/update", updateStudentProfile);
router.get("/profile", getStudentProfile);
router.get("/classroom", getStudentClassroom);
router.get("/classroom/tests/submissions", getClassroomTestsSubmitted);
router.get("/classroom/tests/", getAllClassroomTestsWithStatus);
router.get("/classroom/tests/:testId", getTestByID);
router.post("/classroom/tests/submit-test", submitTest);
router.get("/submissions/:testId", getStudentSubmission);

export default router;
