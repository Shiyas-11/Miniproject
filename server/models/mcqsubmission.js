import mongoose from "mongoose";

const mcqSubmissionSchema = new mongoose.Schema(
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
    score: Number,
    correctCount: Number,
    wrongCount: Number,
    topicBreakdown: {
      type: Map,
      of: {
        correct: Number,
        wrong: Number,
      },
      default: {},
    },
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        selectedOption: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const McqSubmission = mongoose.model("McqSubmission", mcqSubmissionSchema);
export default McqSubmission;
