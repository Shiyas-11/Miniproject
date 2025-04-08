// controllers/livequizcon.js
import LiveQuiz from "../models/livequiz.js";

export const createLiveQuiz = async (req, res) => {
  try {
    const {
      classroom,
      host,
      title,
      mode,
      questions,
      totalTime, // optional if mode is single-question
    } = req.body;

    if (!classroom || !host || !title || !mode || !questions?.length) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newQuiz = new LiveQuiz({
      classroom,
      host,
      title,
      mode,
      questions,
      totalTime: mode === "full-test" ? totalTime : undefined,
    });

    await newQuiz.save();

    res.status(201).json({ message: "Live Quiz created", quiz: newQuiz });
  } catch (err) {
    console.error("Error creating live quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
};
