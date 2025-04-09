import mongoose from "mongoose";
import Test from "../models/test.js";
import MCQ from "../models/mcqquestion.js";
import MSQ from "../models/msqquestion.js";
import Coding from "../models/codingquestion.js";
import Teacher from "../models/teacher.js";
import CodingSubmission from "../models/codingsubmission.js";
import MCQSubmission from "../models/mcqsubmission.js";
import CodingQuestion from "../models/codingquestion.js";
import TestSubmission from "../models/testsubmission.js";

export const createTest = async (req, res) => {
  try {
    const { title, duration, classroom, questions ,startTime,endTime} = req.body;
    // const teacher = await Teacher.findOne(req.teacher.id);

    // Validate classroom ID
    if (!mongoose.Types.ObjectId.isValid(classroom)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid classroom ID" });
    }

    const finalQuestions = [];

    for (const q of questions) {
      const { type, data, marks, negativeMarks, customTimeLimit } = q;
      let savedQuestion;

      // Save based on type
      if (type === "MCQ") {
        savedQuestion = await MCQ.create(data);
      } else if (type === "MSQ") {
        savedQuestion = await MSQ.create(data);
      } else if (type === "Coding") {
        savedQuestion = await Coding.create({
          ...data,
          author: req.teacher?._id, // optional, only if using teacherVerify
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: `Invalid question type: ${type}` });
      }

      finalQuestions.push({
        question: savedQuestion._id,
        type,
        marks,
        negativeMarks: negativeMarks || 0,
        customTimeLimit,
        startTime:new Date(startTime).toDateString||0,
        endTime:new Date(endTime).toDateString()||0
      });
    }

    const newTest = await Test.create({
      title,
      duration,
      classroom,
      questions: finalQuestions,
    });

    res.status(201).json({ success: true, data: newTest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const validateMcqOrMsq = async (questionId, selectedOptions, type) => {
  if (!questionId || !Array.isArray(selectedOptions)) return false;

  let question;
  if (type === "MCQ") {
    question = await MCQ.findById(questionId);

    if (!question) return false;

    const correctOption = question.correctAnswer;
    return correctOption === selectedOptions[0];
  } else if (type === "MSQ") {
    question = await MSQ.findById(questionId);

    if (!question) return false;

    const correctOptions = question.correctAnswers.sort();
    const selected = selectedOptions.sort(); // Check if the arrays match
    return (
      correctOptions.length === selected.length &&
      correctOptions.every((val, idx) => val === selected[idx])
    );
  }
};
export const submitTest = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { testId, answers, timeTaken } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers format." });
    }
    
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found." });

    let totalScore = 0;
    const processedAnswers = [];

    for (const ans of answers) {
      const { question, type, selectedOptions, codingSubmission } = ans;

      let marksObtained = 0;
      let codingSubmissionId = null;

      const questionEntry = test.questions.find(
        (q) => q.question.toString() === question && q.type === type
      );
      const fullMarks = questionEntry?.marks || 0;
      const negativeMarks = questionEntry?.negativeMarks || 0;

      if (type === "MCQ") {
        const mcq = await MCQ.findById(question);
        if (!mcq) continue;
        const isCorrect = await validateMcqOrMsq(
          ans.question,
          ans.selectedOptions,
          ans.type
        );

        ans.marksObtained = isCorrect ? fullMarks : -negativeMarks;
        totalScore += ans.marksObtained;
      } else if (type === "MSQ") {
        const msq = await MSQ.findById(question);
        if (!msq) continue;
        const isCorrect = await validateMcqOrMsq(
          ans.question,
          ans.selectedOptions,
          ans.type
        );

        ans.marksObtained = isCorrect ? fullMarks : -negativeMarks;
        totalScore += ans.marksObtained;
      } else if (type === "Coding") {
        const {
          code,
          language,
          output,
          status,
          passedTestCases,
          totalTestCases,
          executionTime,
          memoryUsed,
        } = codingSubmission;

        const codingSub = await CodingSubmission.create({
          student: studentId,
          codingQuestion: question,
          code,
          language,
          output,
          status,
          passedTestCases,
          totalTestCases,
          executionTime,
          memoryUsed,
        });

        codingSubmissionId = codingSub._id;
        ans.marksObtained = 0; // assume 0, to be updated after judge
      }

      totalScore += marksObtained;

      processedAnswers.push({
        question,
        type,
        selectedOptions,
        codingSubmission: codingSubmissionId,
        marksObtained: ans.marksObtained,
      });
    }

    const newSubmission = await TestSubmission.create({
      student: studentId,
      test: testId,
      answers: processedAnswers,
      totalScore,
      timeTaken,
    });

    res.status(200).json({
      success: true,
      message: "Test submitted successfully.",
      submission: newSubmission,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export const getStudentSubmission = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { testId } = req.params;
    const submission = await TestSubmission.findOne({
      student: studentId,
      test: testId,
    }).populate("answers.codingSubmission");
    
    if (!submission) {
      return res.status(404).json({ message: "Submission not found." });
    }

    const test = await Test.findById(testId);
    const formattedAnswers = await Promise.all(
      submission.answers.map(async (ans) => {
        if (ans.type === "MCQ" || ans.type === "MSQ") {
          const question = await MCQ.findById(ans.question);
          return {
            type: ans.type,
            questionText: question || "question",
            selectedOptions: ans.selectedOptions,
            isCorrect: ans.marksObtained > 0,
            marksObtained: ans.marksObtained,
          };
        } else if (ans.type === "Coding") {
          const question = await CodingQuestion.findById(ans.question);
          const codingData = ans.codingSubmission;
          return {
            type: "Coding",
            questionText: question.title || "Coding Question",
            code: codingData.code,
            language: codingData.language,
            passedTestCases: codingData.passedTestCases,
            totalTestCases: codingData.totalTestCases,
            status: codingData.status,
            marksObtained: ans.marksObtained,
          };
        }
      })
    );
    
    res.json({
      testTitle: test.title,
      submittedAt: submission.submittedAt,
      totalScore: submission.totalScore,
      timeTaken: submission.timeTaken,
      answers: formattedAnswers,
    });
  } catch (err) {
    console.error("Error fetching submission:", err);
    res.status(500).json({ message: "Server error." });
  }
};

export const getAllTestSubmissions = async (req, res) => {
  try {
    const { testId } = req.params;

    const submissions = await TestSubmission.find({ test: testId }).populate(
      "student",
      "name email"
    );

    const formatted = submissions.map((sub) => ({
      studentId: sub.student._id,
      name: sub.student.name,
      email: sub.student.email,
      totalScore: sub.totalScore,
      timeTaken: sub.timeTaken,
      submittedAt: sub.submittedAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ message: "Server error." });
  }
};
export const getSingleStudentSubmission = async (req, res) => {
  try {
    const { testId, studentId } = req.params;

    const submission = await TestSubmission.findOne({
      test: testId,
      student: studentId,
    }).populate("answers.codingSubmission");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found." });
    }

    const test = await Test.findById(testId);

    const formattedAnswers = await Promise.all(
      submission.answers.map(async (ans) => {
        if (ans.type === "MCQ" || ans.type === "MSQ") {
          const question = await MCQ.findById(ans.question);
          return {
            type: ans.type,
            questionText: question.question,
            selectedOptions: ans.selectedOptions,
            isCorrect: ans.marksObtained > 0,
            marksObtained: ans.marksObtained,
          };
        } else if (ans.type === "Coding") {
          const question = await CodingQuestion.findById(ans.question);
          const codingData = ans.codingSubmission;
          return {
            type: "Coding",
            questionText: question.title || "Coding Question",
            code: codingData.code,
            language: codingData.language,
            passedTestCases: codingData.passedTestCases,
            totalTestCases: codingData.totalTestCases,
            status: codingData.status,
            marksObtained: ans.marksObtained,
          };
        }
      })
    );

    res.json({
      testTitle: test.title,
      submittedAt: submission.submittedAt,
      totalScore: submission.totalScore,
      timeTaken: submission.timeTaken,
      answers: formattedAnswers,
    });
  } catch (err) {
    console.error("Error fetching student submission:", err);
    res.status(500).json({ message: "Server error." });
  }
};

export const getTestOverview = async (req, res) => {
  const { testId } = req.params;

  try {
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const submissions = await TestSubmission.find({ test: testId }).populate(
      "student"
    );

    if (submissions.length === 0) {
      return res.status(200).json({
        testId,
        title: test.title,
        totalSubmissions: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        topPerformers: [],
      });
    }

    const scores = submissions.map((s) => s.totalScore);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);

    const topPerformers = submissions
      .filter((s) => s.totalScore === maxScore)
      .map((s) => ({
        name: s.student.name,
        score: s.totalScore,
        studentId: s.student._id,
      }));

    res.status(200).json({
      testId,
      title: test.title,
      totalSubmissions: submissions.length,
      averageScore: parseFloat(avgScore.toFixed(2)),
      highestScore: maxScore,
      lowestScore: minScore,
      topPerformers,
    });
  } catch (err) {
    console.error("Error getting test overview:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
