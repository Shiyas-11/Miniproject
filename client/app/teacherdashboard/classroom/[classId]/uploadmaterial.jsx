import React, { useState } from "react";
import axios from "axios";

const UploadMaterial = ({ classroomId }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !type) {
      setMsg("Title, Type, and File are required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("type", type);
    formData.append("classroom", classroomId);

    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post("/api/material/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("Upload successful!");
      setFile(null);
      setTitle("");
      setDescription("");
      setTags("");
      setType("");
    } catch (err) {
      setMsg("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="text"
        placeholder="Type (e.g., PDF, Video)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
};

export default UploadMaterial;
