import mongoose from "mongoose";
import Test from "../models/test.js";
import MCQ from "../models/mcqquestion.js";
import MSQ from "../models/msqquestion.js";
import Coding from "../models/codingquestion.js";
import Teacher from "../models/teacher.js";

export const createTest = async (req, res) => {
  try {
    const { title, duration, classroom, questions } = req.body;
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
