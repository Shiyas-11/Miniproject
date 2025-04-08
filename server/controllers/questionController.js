import MCQ from "../models/mcqquestion.js";
import MSQ from "../models/msqquestion.js";
import CodingQuestion from "../models/codingquestion.js";
export const addMCQ = async (req, res) => {
  try {
    const newMCQ = await MCQ.create(req.body);
    return res.status(201).json({ success: true, data: newMCQ });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMCQBulk = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of MCQ questions",
      });
    }

    const inserted = await MCQ.insertMany(questions);
    return res.status(201).json({
      success: true,
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMSQ = async (req, res) => {
  try {
    const newMCQ = await MSQ.create(req.body);
    return res.status(201).json({ success: true, data: newMCQ });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMSQBulk = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of MSQ questions",
      });
    }

    const inserted = await MSQ.insertMany(questions);
    return res.status(201).json({
      success: true,
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCodingQuestion = async (req, res) => {
  try {
    const newQuestion = await CodingQuestion.create(req.body);
    return res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const addCodingQuestionBulk = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res
        .status(400)
        .json({ success: false, message: "Expected an array of questions." });
    }

    const inserted = await CodingQuestion.insertMany(req.body, {
      ordered: false, // continues even if one fails
    });

    return res.status(201).json({
      success: true,
      insertedCount: inserted.length,
      data: inserted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
