"use client";

import { useState } from "react";

const AddStudentModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const randomPass = Math.random().toString(36).slice(-8);
    setPassword(randomPass);
  };

  const handleSubmit = () => {
    if (name && email && password) {
      onSave({ name, email, password });
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Student</h2>

        {/* Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-purple-500 outline-none"
        />

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Student Email"
          className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-purple-500 outline-none"
        />

        {/* Password Input with Generate Button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-purple-500 outline-none"
          />
          <button
            onClick={generatePassword}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            🔄
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
