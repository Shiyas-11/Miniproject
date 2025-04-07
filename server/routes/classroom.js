import express from "express";
import {
  createClassroom,
  getClassroomDetails,
  getClassroomOverview,
  getClassroomStudents,
  addStudentToClassroom,
} from "../controllers/classroomController.js";

import { verifyTeacherToken } from "../middleware/verifyTeacheToken.js";

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

export default router;
