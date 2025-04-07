// models/classroom/announcement.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const announcementSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  attachmentUrl: String, // optional: for PDF/image/link
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = model("Announcement", announcementSchema);
export default Announcement;
