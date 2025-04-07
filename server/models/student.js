import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, unique: true, required: true }, // e.g., Institution_Classroom_RollNo
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollno: Number,
    institutionName: String,
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    resume: { type: String, default: "" },
    xp: { type: Number, default: -1 },
    level: { type: Number, default: 1 },
    progress: {
      tasksCompleted: Number,
      overallScore: Number,
      rank: Number,
    },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" },
    submissions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Submission" }, // polymorphic
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
