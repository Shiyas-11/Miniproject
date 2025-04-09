"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// Optional: Create an Auth Context for global authentication state
const StudentSignIn = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [error, setError] = useState("");
  useEffect;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (password !== cpassword) {
      setError("Passwords does not match");
      return;
    }
    axios.patch();

    router.push("/studentdashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 dark:bg-gradient-to-br dark:from-black dark:via-indigo-950 dark:to-black	 dark:text-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 dark:bg-black dark:text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Student Sign In</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white">
              New Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white">
              Confirm Your New Password
            </label>
            <input
              type="password"
              placeholder="Confirm your New Password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignIn;
