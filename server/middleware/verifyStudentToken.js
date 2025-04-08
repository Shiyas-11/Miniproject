import jwt from "jsonwebtoken";

export const verifyStudentToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded student info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
