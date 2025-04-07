import mongoose from "mongoose";

const codingSubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    startedAt: Date,
    submittedAt: Date,
    timeTaken: Number,
    code: String,
    language: String,
    testCasesPassed: Number,
    totalTestCases: Number,
    output: String,
    autoFeedback: String,
    manualFeedback: String,
  },
  { timestamps: true }
);

const CodingSubmission = mongoose.model(
  "CodingSubmission",
  codingSubmissionSchema
);
export default CodingSubmission;
