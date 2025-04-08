import StudyMaterial from "../models/studymaterial.js";
import cloudinary from "../utils/cloudinary.js";

export const uploadMaterial = async (req, res) => {
  try {
    const { title, description, tags, classroom, type } = req.body;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const uploaded = await cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "study_materials" },
      async (error, result) => {
        if (error)
          return res
            .status(500)
            .json({ success: false, message: error.message });

        const material = await StudyMaterial.create({
          title,
          description,
          tags,
          classroom,
          type,
          fileUrl: result.secure_url,
          uploadedBy: req.teacherId, // or req.user.id
        });

        res.status(201).json({ success: true, data: material });
      }
    );

    // Trigger upload
    uploaded.end(file.buffer);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
