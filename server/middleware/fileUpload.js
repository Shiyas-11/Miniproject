import multer from "multer";

const storage = multer.memoryStorage(); // We'll pass buffer to Cloudinary
export const upload = multer({ storage });
