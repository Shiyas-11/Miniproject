import mongoose from "mongoose";

const msqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswers: [{ type: String, required: true }],
    explanation: { type: String, default: "" },
    companyTags: [{ type: String }],
    topics: [{ type: String }],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

const MSQ = mongoose.model("MSQ", msqSchema);
export default MSQ;
