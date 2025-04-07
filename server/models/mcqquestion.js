import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, default: "" },
    companyTags: [{ type: String }], // e.g., ['Amazon', 'Infosys']
    topics: [{ type: String }], // e.g., ['Arrays', 'Sorting']
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

const MCQ = mongoose.model("MCQ", mcqSchema);
export default MCQ;
