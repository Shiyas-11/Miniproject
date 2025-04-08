"use client";
import { Card, CardContent, CardTitle } from "@/components/card";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import AddStudentModal from "../AddStudentModal/AddStudentModal";

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");
  const [students, setStudents] = useState(["Alice Johnson", "Bob Williams", "Charlie Brown","Shiyas","Sahith","Archa","Suhaina"]);
  
  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent.name]);
    setIsModalOpen(false);
  };

  const router = useRouter();
  
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
          <aside className={`fixed top-16 left-0 w-64 bg-white p-6 shadow-xl h-full z-50 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <nav className="space-y-4 text-gray-700 font-medium">
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">Profile</a>
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">My Classes</a>
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">Study Materials</a>
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">Settings</a>
              <a href="#" className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer">Logout</a>
            </nav>
          </aside>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-grow mt-20 px-8">
        {/* Managing Students Section */}
        <div className="w-1/2 p-6">
          <div className="bg-white text-purple-700 rounded-lg shadow-xl p-8 w-full text-center">
            <h1 className="text-3xl font-bold mb-4">Classroom {classId}</h1>
            <p className="text-lg mb-4">Student List</p>
            <div className="mb-6">
              {students.length > 0 ? (
                <ul className="space-y-2">
                  {students.map((student, index) => (
                    <li key={index} className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No students yet.</p>
              )}
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-md">
              ADD
            </button>
          </div>
        </div>
        
        {/* Manage Tests Section */}
        <div className="w-1/2 p-6">
          <div className="grid grid-cols-1 gap-10">
            <button className="cursor-pointer" onClick={() => router.push("/teacherdashboard/CreateTest")}> 
              <Card>
                <CardTitle>Create Test</CardTitle>
                <CardContent>Design and create new tests with ease.</CardContent>
              </Card>
            </button>
            <button className="cursor-pointer" onClick={() => router.push("/teacherdashboard/quiz")}> 
              <Card>
                <CardTitle>Create Live Quiz</CardTitle>
                <CardContent>Host and manage live tests in real-time.</CardContent>
              </Card>
            </button>
            <button className="cursor-pointer" onClick={() => router.push("/teacherdashboard/ViewTest")}> 
              <Card>
                <CardTitle>View Test</CardTitle>
                <CardContent>Browse and manage existing tests.</CardContent>
              </Card>
            </button>
            <button className="cursor-pointer" onClick={() => router.push("/teacherdashboard/CreateLiveTest")}> 
              <Card>
                <CardTitle>Study Materials</CardTitle>
                <CardContent>Include Study Materials</CardContent>
              </Card>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal Component */}
      {isModalOpen && <AddStudentModal onClose={() => setIsModalOpen(false)} onSave={handleAddStudent} />}
    </div>
  );
}