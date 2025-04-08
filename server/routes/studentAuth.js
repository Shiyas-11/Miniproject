import express from "express";
import {
  registerStudent,
  loginStudent,
  setNewPassword,
} from "../controllers/studentAuthController.js";
import { verifyStudentToken } from "../middleware/verifyStudentToken.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.patch("/set-password", verifyStudentToken, setNewPassword);
export default router;
