import express from "express";

import { verifyTeacherToken } from "../middleware/verifyTeacheToken.js";
import { createTest } from "../controllers/testController.js";

const router = express.Router();

router.use(verifyTeacherToken);

router.post("/create", createTest);
export default router;
