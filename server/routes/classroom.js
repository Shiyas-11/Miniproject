import express from "express";
import {
  createClassroom,
  getClassroomDetails,
  getClassroomOverview,
  getClassroomStudents,
} from "../controllers/classroomcon.js";

import teacherVerifyToken from "../middleware/teacherVerifyToken.js";

const router = express.Router();

router.use(teacherVerifyToken);

// Create a classroom
router.post("/create", createClassroom);

// Get core classroom details
router.get("/:id/details", getClassroomDetails);

// Get announcements + 3 recent tests + stats
router.get("/:id/overview", getClassroomOverview);

// Get paginated student list
router.get("/:id/students", getClassroomStudents);

export default router;
