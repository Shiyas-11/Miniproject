import express from "express";
import {
  createClassroom,
  getClassroomDetails,
  getClassroomOverview,
  getClassroomStudents,
  addStudentToClassroom,
  getClassroomTests,
  getClassroomMaterials,
} from "../controllers/classroomController.js";
import { getTeacherClassrooms } from "../controllers/teacherController.js";
import { verifyTeacherToken } from "../middleware/verifyTeacheToken.js";
import {
  getAllTestSubmissions,
  getSingleStudentSubmission,
  getTestOverview,
} from "../controllers/testController.js";

const router = express.Router();

router.use(verifyTeacherToken);

// Create a classroom
router.post("/create", createClassroom);

// Get core classroom details
router.get("/:id/details", getClassroomDetails);

// Get announcements + 3 recent tests + stats
router.get("/:id/overview", getClassroomOverview);

// Get paginated student list
router.get("/:id/students", getClassroomStudents);

//add new student to classroom
router.post("/:classroomId/add-student", addStudentToClassroom);

//see assigned tests
router.get("/:classroomId/tests", getClassroomTests);

//see given materials
router.get("/:classroomId/materials", getClassroomMaterials);
//teacher retirve class list
router.get("/details", getTeacherClassrooms);
//get test submission
router.get("/submissions/:testId", getAllTestSubmissions);
router.get("/submissions/:testId/:studentId", getSingleStudentSubmission);

//get test overview
router.get("/overview/:testId", getTestOverview);
export default router;
