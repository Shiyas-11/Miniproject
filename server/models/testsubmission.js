// models/test/testSubmission.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const answerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "answers.type", // Dynamically reference based on question type
  },
  type: {
    type: String,
    enum: ["MCQ", "MSQ", "Coding"],
    required: true,
  },
  selectedOptions: [String], // for MCQ/MSQ
  codingSubmission: {
    type: Schema.Types.ObjectId,
    ref: "CodingSubmission", // only for Coding type
  },
  marksObtained: {
    type: Number,
    default: 0,
  },
});

const testSubmissionSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  answers: [answerSchema],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  timeTaken: Number, // in seconds
});

const TestSubmission = model("TestSubmission", testSubmissionSchema);
export default TestSubmission;
