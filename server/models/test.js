import mongoose from "mongoose";

const questionEntrySchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type", // dynamically refers to MCQ / MSQ / Coding
    },
    type: {
      type: String,
      required: true,
      enum: ["MCQ", "MSQ", "Coding"],
    },
    marks: {
      type: Number,
      required: true,
    },
    negativeMarks: {
      type: Number,
      default: 0,
    },
    customTimeLimit: {
      type: Number, // in minutes
    },
  },
  { _id: false }
);

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["MCQ", "MSQ", "Coding", "Mixed"],
      default: "Mixed",
    },
    duration: { type: Number, required: true }, // in minutes
    totalMarks: { type: Number }, // optional, can be calculated
    startTime: { type: Date },
    endTime: { type: Date },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    questions: [questionEntrySchema],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);
export default Test;
