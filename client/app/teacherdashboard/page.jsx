"use client";

import { Card, CardContent, CardTitle } from "../components/card";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch classrooms from backend when connected
    // Example: fetch('/api/classrooms').then(res => res.json()).then(data => setClassrooms(data));

    // Dummy Data (Remove once API is connected)
    setClassrooms([
      { id: 1, title: "S6 IT", students: 25 },
      { id: 2, title: "S4 IT", students: 30 },
      { id: 3, title: "S2 IT", students: 20 },
    ]);
  }, []);

  const handleClassroomClick = (id) => {
    router.push(`/teacherdashboard/studp`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 shadow-lg z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold tracking-wide">
            <a href="/" className="hover:text-purple-700 transition duration-100">SAPT</a>
          </h1>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)}>
          <aside className="fixed top-16 left-0 w-64 bg-white p-6 shadow-xl h-full z-50 transition-transform">
            <nav className="space-y-4 text-gray-700 font-medium">
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">Profile</a>
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">My Classes</a>
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">Settings</a>
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">Logout</a>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="mt-20 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Your Classrooms</h1>
        <button className="mb-6 bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
          + Create Classroom
        </button>
        <div className="w-full max-w-4xl space-y-6">
          {classrooms.length > 0 ? (
            classrooms.map((classroom) => (
              <div
                key={classroom.id}
                className="bg-opacity-90 bg-white text-black p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform w-full"
                onClick={() => handleClassroomClick(classroom.id)}
              >
                <h2 className="text-xl font-semibold mb-2">{classroom.title}</h2>
                <p className="text-gray-800">Students: {classroom.students}</p>
              </div>
            ))
          ) : (
            <p className="text-lg">No classrooms available. Create one!</p>
          )}
        </div>
      </div>
    </div>
  );
}
