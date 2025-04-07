import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    classroomCode: {
      type: String,
      required: true,
      unique: true, // ← unique constraint here
    },
    year: { type: Number, required: true }, // passout year
    department: { type: String, required: true },
    institution: { type: String, required: true },
    description: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    teachers: [
      {
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
        isAdmin: { type: Boolean, default: false },
      },
    ],
    assignedTests: [
      {
        test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        deadline: Date,
        assignedAt: { type: Date, default: Date.now },
      },
    ],
    studyMaterials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
    announcements: [
      {
        title: String,
        message: String,
        createdAt: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
      },
    ],
  },
  { timestamps: true }
);
const Classroom = mongoose.model("Classroom", classroomSchema);
export default Classroom;
