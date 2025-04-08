"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function TeacherSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Sign In", { email, password });

    // TODO: Add authentication logic here

    // Redirect to Teacher Dashboard after successful sign-in
    router.push("/teacherdashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6"> Teacher Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
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
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <p className="mt-6 text-gray-600">
          Are you a student?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
