import Student from "../models/student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, classroom, institutionName, rollno } =
      req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent)
      return res.status(400).json({ msg: "Student already exists" });

    const studentId = `${institutionName}_${classroom}_${rollno}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      classroom,
      institutionName,
      rollno,
      studentId,
      xp: -1,
    });

    await newStudent.save();
    res.status(201).json({ msg: "Student registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error registering student", error: err.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    let firstLogin = false;
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (student.xp === -1) {
      firstLogin = true;
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, student, firstLogin });
  } catch (err) {
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
};

export const setNewPassword = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const student = await Student.findById(studentId);
    if (!student)
      return res.status(404).json({ message: "Student not found." });

    if (student.xp !== -1) {
      return res.status(400).json({ message: "Password already set..." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    student.xp = 0;

    await student.save();
    res.status(200).json({ message: "Password set successfully." });
  } catch (error) {
    console.error("Set password error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
