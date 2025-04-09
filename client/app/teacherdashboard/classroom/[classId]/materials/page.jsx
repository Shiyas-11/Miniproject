"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import TeacherNavbar from "@/components/nav/TeacherNavbar";

const UploadMaterialPage = () => {
  const { classid } = useParams();
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
    formData.append("classroom", classid);

    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post("/api/classroom/resources/add", formData, {
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
      console.error(err);
      setMsg("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TeacherNavbar />
      <div className="min-h-screen p-6 bg-gray-200 text-white dark:text-white dark:bg-black">
        <div className="mt-20 max-w-xl mx-auto bg-white dark:bg-gray-950 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
            Upload Study Material
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-200 text-black dark:bg-gray-900 dark:text-white"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-200 text-black dark:bg-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-200 text-black dark:bg-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Type (e.g., PDF, Video)"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-200 text-black dark:bg-gray-900 dark:text-white"
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full dark:bg-white dark:text-black justify-center align-middle flex"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-100 dark:bg-gray-700 dark:text-white dark:font-extrabold"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
            {msg && <p className="text-sm mt-2 text-white">{msg}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadMaterialPage;
