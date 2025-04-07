// models/classroom/studyMaterial.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const studyMaterialSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["PDF", "Video", "Link", "Image", "Doc"],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  tags: [String], // topic/company/etc.
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const StudyMaterial = model("StudyMaterial", studyMaterialSchema);
export default StudyMaterial;
