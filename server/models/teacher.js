import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    institutionName: { type: String, required: true },
    expertise: { type: String, default: "" },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    classrooms: [
      {
        classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" },
        isAdmin: { type: Boolean, default: false },
      },
    ],
    notifications: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
