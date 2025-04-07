import Classroom from "../models/classroom.js";
import Student from "../models/student.js";
import Test from "../models/test.js";
import Material from "../models/material.js";

// Create a new classroom
export const createClassroom = async (req, res) => {
  try {
    const { year, department, description, name } = req.body;
    const teacherId = req.user.id;
    const institutionName = req.user.institutionName;

    const finalName = name || `sapt-${department}-${year}`;

    const newClassroom = new Classroom({
      name: finalName,
      classroomID: { year, department },
      description: description || "",
      createdBy: teacherId,
      teachers: [{ teacher: teacherId, isAdmin: true }],
    });

    await newClassroom.save();
    res
      .status(201)
      .json({
        message: "Classroom created successfully",
        classroom: newClassroom,
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating classroom", details: err.message });
  }
};

// Get classroom details (top priority API)
export const getClassroomDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await Classroom.findById(id)
      .populate("createdBy", "name email")
      .populate("teachers.teacher", "name email");

    if (!classroom)
      return res.status(404).json({ error: "Classroom not found" });

    const details = {
      name: classroom.name,
      classroomID: classroom.classroomID,
      description: classroom.description,
      institutionName: req.user.institutionName,
      teachers: classroom.teachers.map((t) => ({
        _id: t.teacher._id,
        name: t.teacher.name,
        email: t.teacher.email,
        isAdmin: t.isAdmin,
      })),
      createdBy: classroom.createdBy,
    };

    res.json(details);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Error fetching classroom details",
        details: err.message,
      });
  }
};

// Get announcements + 3 most recent assigned tests (for dashboard)
export const getClassroomOverview = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await Classroom.findById(id)
      .populate("announcements.postedBy", "name")
      .populate("assignedTests.test", "title type");

    if (!classroom)
      return res.status(404).json({ error: "Classroom not found" });

    const announcements = classroom.announcements
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
      .map((a) => ({
        title: a.title,
        message: a.message,
        postedBy: a.postedBy.name,
        createdAt: a.createdAt,
      }));

    const tests = classroom.assignedTests
      .sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt))
      .slice(0, 3)
      .map((t) => ({
        title: t.test.title,
        type: t.test.type,
        deadline: t.deadline,
        assignedAt: t.assignedAt,
      }));

    const totalTests = classroom.assignedTests.length;
    const totalMaterials = classroom.studyMaterials.length;

    res.json({ announcements, recentTests: tests, totalTests, totalMaterials });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Error fetching classroom overview",
        details: err.message,
      });
  }
};

// Get paginated student list (for right panel)
export const getClassroomStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const classroom = await Classroom.findById(id);
    if (!classroom)
      return res.status(404).json({ error: "Classroom not found" });

    const total = classroom.students.length;

    const students = await Student.find({ _id: { $in: classroom.students } })
      .sort({ studentId: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("name studentId profilePic xp level");

    res.json({ students, total, page });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching students", details: err.message });
  }
};
