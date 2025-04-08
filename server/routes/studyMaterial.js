import express from "express";
import { uploadMaterial } from "../controllers/studyMaterialController.js";
import { verifyTeacherToken } from "../middleware/verifyTeacheToken.js";
import { upload } from "../middleware/fileUpload.js";
const router = express.Router();
router.use(verifyTeacherToken);

router.post("/add", upload.single("file"), uploadMaterial);

export default router;
