import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
//routes
import teacherAuthRoutes from "./routes/teacherAuth.js";
import studentAuthRoutes from "./routes/studentAuth.js";
import classroomRoutes from "./routes/classroom.js";
import liveQuizRoutes from "./routes/livequiz.js";
import { quizSocketHandler } from "./sockets/quizSockets.js";
import questionUploadRoutes from "./routes/question.js";
import testRoutes from "./routes/test.js";
import studyMaterialroutes from "./routes/studyMaterial.js";
import studentRoutes from "./routes/student.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/teacher", teacherAuthRoutes);
app.use("/api/student", studentAuthRoutes);
app.use("/api/classroom", classroomRoutes);
app.use("/api/livequiz", liveQuizRoutes);
app.use("/api/questions", questionUploadRoutes);
app.use("/api/test/", testRoutes);
app.use("/api/classroom/resources", studyMaterialroutes);
app.use("/api/student", studentRoutes);

// DB Connection
await mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // update to frontend URL later
    methods: ["GET", "POST"],
  },
});

// Plug in socket logic
quizSocketHandler(io);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
