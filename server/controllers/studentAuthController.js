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
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (student.xp === -1) {
      student.xp = 0;
      await student.save();
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, student });
  } catch (err) {
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
};
