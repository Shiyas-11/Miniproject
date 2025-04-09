import Student from "../models/student.js";
import Classroom from "../models/classroom.js";
import Teacher from "../models/teacher.js";
import Test from "../models/test.js";
import TestSubmission from "../models/testsubmission.js";
import MCQ from "../models/mcqquestion.js";
import MSQ from "../models/msqquestion.js";
import CodingQuestion from "../models/codingquestion.js";

export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Only allow specific fields to be updated
    const allowedUpdates = {};
    const { profilePic, resume } = req.body;

    if (profilePic) allowedUpdates.profilePic = profilePic;
    if (resume) allowedUpdates.resume = resume;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      allowedUpdates,
      { new: true }
    ).select("-password");

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, data: updatedStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getStudentClassroom = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Fetch the student first to get their classroom
    const student = await Student.findById(studentId).populate("classroom");
    if (!student || !student.classroom) {
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });
    }
    // Optionally populate the teacher details too
    const classroom = await Classroom.findById(student.classroom._id)
      .populate("teachers", "name email expertise") // select only relevant fields
      .select("-students"); // remove student list if not needed here

    res.json({ success: true, data: classroom });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getClassroomTestsSubmitted = async (req, res) => {
  try {
    const student = req.user; // assume user is added by auth middleware
    const classroomId = student.classroom;

    const tests = await Test.find({ classroom: classroomId });

    const submissions = await TestSubmission.find({ student: student._id });
    const submittedTestIds = submissions.map((sub) => sub.test.toString());

    const result = tests.map((test) => ({
      _id: test._id,
      title: test.title,
      description: test.description,
      duration: test.duration,
      startTime: test.startTime,
      endTime: test.endTime,
      submitted: submittedTestIds.includes(test._id.toString()),
    }));

    return res.status(200).json({ success: true, tests: result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch tests", details: err });
  }
};
export const getAllClassroomTestsWithStatus = async (req, res) => {
  try {
    const classroomId = req.user.classroom;
    const studentId = req.user._id;
    // 1. Get all tests for this classroom
    const tests = await Test.find({ classroom: classroomId });
    // 2. For each test, check if a submission exists by the student
    const results = await Promise.all(
      tests.map(async (test) => {
        const submission = await TestSubmission.findOne({
          test: test._id,
          student: studentId,
        });
        return {
          test,
          submitted: !!submission,
        };
      })
    );

    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user._id;

    const student = await Student.findById(studentId).populate({
      path: "classroom",
      select: "name institutionName",
    });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        rollNumber: student.rollno,
        xp: student.xp,
        level: student.level,
        profilePicture: student.profilePicture,
        classroom: student.classroom?.name,
        institution: student.classroom?.institutionName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
export const getTestByID = async (req, res) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId).lean();

    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    // For each question entry, fetch actual question content
    const populatedQuestions = await Promise.all(
      test.questions.map(async (q) => {
        let questionData;
       
        switch (q.type) {
          case "MCQ":
            questionData = await MCQ.findById(q.question).lean();
            break;
          case "MSQ":
            questionData = await MSQ.findById(q.question).lean();
            break;
          case "Coding":
            questionData = await CodingQuestion.findById(q.question).lean();
            break;
        }

        return {
          ...q,
          questionData,
        };
      })
    );

    test.questions = populatedQuestions;

    return res.status(200).json({ success: true, test });
  } catch (error) {
    console.error("Error fetching test:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
