import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import teacherAuthRoutes from "./routes/teacherAuth.js";
import studentAuthRoutes from "./routes/studentAuth.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/teacher", teacherAuthRoutes);
app.use("/api/student", studentAuthRoutes);

// DB Connection
await mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
