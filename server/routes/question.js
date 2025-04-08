import express from "express";
import {
  addMCQ,
  addMCQBulk,
  addMSQ,
  addMSQBulk,
  addCodingQuestion,
  addCodingQuestionBulk,
} from "../controllers/questionController.js";
import { verifyTeacherToken } from "../middleware/verifyTeacheToken.js";

const router = express.Router();
router.use(verifyTeacherToken);
// Add new MCQ

router.post("/add-mcq", addMCQ);
router.post("/add-mcq-bulk", addMCQBulk);
router.post("/add-msq", addMSQ);
router.post("/add-msq-bulk", addMSQBulk);
router.post("/add-coding", addCodingQuestion);
router.post("/add-coding-bulk", addCodingQuestionBulk);
export default router;
