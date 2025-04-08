import jwt from "jsonwebtoken";
import Student from "../models/student.js";
export const verifyStudentToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    req.user = student; // attach decoded student info
    // console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token.", details: err });
  }
};
