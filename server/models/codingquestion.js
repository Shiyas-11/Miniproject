import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
});

const codingQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    inputFormat: { type: String },
    outputFormat: { type: String },
    constraints: { type: String },
    exampleInputOutput: {
      input: { type: String },
      output: { type: String },
      explanation: { type: String },
    },
    testCases: [testCaseSchema],

    expectedFunction: { type: String }, // e.g., "function add(a, b)"
    starterCode: { type: String },
    solutionCode: { type: String },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    companyTags: [{ type: String }],
    topicTags: [{ type: String }],
    language: { type: String, default: "javascript" }, // can be extended later
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true }
);

const CodingQuestion = mongoose.model("CodingQuestion", codingQuestionSchema);
export default CodingQuestion;
