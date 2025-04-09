import Classroom from "../models/classroom.js";

export const getTeacherClassrooms = async (req, res) => {
  try {
    const teacherId = req.user.id; // assuming you're using a teacherVerify middleware
    const classrooms = await Classroom.find({ "teachers.teacher": teacherId });
    res.status(200).json({ success: true, classrooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

