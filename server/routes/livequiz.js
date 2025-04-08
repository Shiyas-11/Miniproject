// routes/livequiz.js
import express from "express";
import { createLiveQuiz } from "../controllers/livequizController.js";

const router = express.Router();

// Create new quiz
router.post("/create", createLiveQuiz);

export default router;
