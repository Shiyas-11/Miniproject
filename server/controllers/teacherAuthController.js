import Teacher from "../models/teacher.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerTeacher = async (req, res) => {
  try {
    const { name, email, password, institutionName } = req.body;
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher)
      return res.status(400).json({ msg: "Teacher already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      institutionName,
    });
    await newTeacher.save();

    res.status(201).json({ msg: "Teacher registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error registering teacher", error: err.message });
  }
};

export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, teacher });
  } catch (err) {
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
};
