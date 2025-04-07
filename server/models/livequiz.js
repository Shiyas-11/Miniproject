// models/liveQuiz/liveQuiz.js

import mongoose from "mongoose";

const liveQuizSchema = new mongoose.Schema(
  {
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["single-question", "full-test"],
      default: "single-question",
    },
    questions: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "MCQ" }, // or MSQ
        timeLimit: { type: Number, default: 30 }, // in seconds (used only in single-question mode)
      },
    ],
    totalTime: {
      type: Number, // only used in full-test mode
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true }
);

const LiveQuiz = mongoose.model("LiveQuiz", liveQuizSchema);
export default LiveQuiz;
