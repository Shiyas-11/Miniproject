import mongoose from "mongoose";

const studentResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  score: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  timeTaken: Number, // in seconds
  rank: Number,
  sectionBreakdown: {
    mcqScore: Number,
    msqScore: Number,
    codingScore: Number,
  },
  attempted: Number,
  correct: Number,
  wrong: Number,
});

const testResultSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
    unique: true,
  },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" },
  generatedAt: { type: Date, default: Date.now },
  averageScore: Number,
  highestScore: Number,
  lowestScore: Number,
  totalStudents: Number,
  results: [studentResultSchema], // Array of results
});

const TestResult = mongoose.model("TestResult", testResultSchema);
export default TestResult;
