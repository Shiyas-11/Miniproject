import mongoose from "mongoose";

const codingSubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    codingQuestion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodingQuestion",
      required: true,
    },

    code: { type: String, required: true },
    language: {
      type: String,
      enum: ["javascript", "python", "java", "c", "cpp"],
      required: true,
      default: "javascript",
    },

    passedTestCases: { type: Number, default: 0 },
    totalTestCases: { type: Number, default: 0 },

    executionTime: { type: Number }, // in ms
    memoryUsed: { type: Number }, // in KB or MB depending on backend
    output: { type: String },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Failed",
        "Runtime Error",
        "Compilation Error",
      ],
      default: "Pending",
    },

    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CodingSubmission = mongoose.model(
  "CodingSubmission",
  codingSubmissionSchema
);
export default CodingSubmission;
