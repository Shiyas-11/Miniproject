"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// Optional: Create an Auth Context for global authentication state
const StudentSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/student/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000,
        }
      );

      const token = response.data.token;

      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("token", token); // Save JWT token in local storage

      if (response.data.firstLogin)
        router.push("/newpass"); //for first time login
      else router.push("/studentdashboard"); // Redirect after login
    } catch (error) {
      if (error.response) {
        setError(
          `Login failed: ${
            error.response.data.message || "Invalid credentials"
          }`
        );
      } else {
        setError("Network error. Please try again");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 dark:bg-gradient-to-br dark:from-black dark:via-indigo-950 dark:to-black	 dark:text-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 dark:bg-black dark:text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Student Sign In</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-gray-600 dark:text-white">
          Are you a teacher?{" "}
          <button
            onClick={() => router.push("/teacherlogin")}
            className="text-orange-300 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default StudentSignIn;
