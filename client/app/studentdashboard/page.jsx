"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { data } from "autoprefixer";

const StudentDashboard = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  let student = {};
  try {
    student = {
      name: localStorage.getItem("name") || "errorfetchingname",
      className: "S6 IT",
      completedTasks: 14,
      totalTasks: 20,
      rank: 5,
      level: "Topper",
    };
  } catch (error) {
    student = {
      name: "name1",
      className: "S6 IT",
      completedTasks: 14,
      totalTasks: 20,
      rank: 5,
      level: "Topper",
    };
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login page if no token
    }
    const user = fetchdata(token).then(async (response) => {
      if (response.status === 401) {
        localStorage.clear();
        router.push("/login");
      }
      await setData(response.data);
    });
  }, []);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Aptitude Test 1",
      deadline: "2025-03-08",
      color: "border-red-500",
    },
    {
      id: 2,
      title: "Aptitude Test 2",
      deadline: "2025-03-07",
      color: "border-green-500",
    },
    {
      id: 3,
      title: "Aptitude Test 3",
      deadline: "2025-03-06",
      color: "border-orange-500",
    },
    {
      id: 4,
      title: "Aptitude Test 4",
      deadline: "2025-03-09",
      color: "border-blue-500",
    },
    {
      id: 5,
      title: "Aptitude Test 5",
      deadline: "2025-03-10",
      color: "border-black",
    },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const student = {
  //   name: "name",
  //   className: "S6 IT",
  //   completedTasks: 14,
  //   totalTasks: 20,
  //   rank: 5,
  //   level: "Topper",
  // };

  useEffect(() => {
    setTasks((prevTasks) =>
      [...prevTasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-purple-600 text-black">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 shadow-lg z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold tracking-wide">
            <a
              href="/"
              className="hover:text-purple-700 transition duration-100"
            >
              SAPT
            </a>
          </h1>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-20 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className={`fixed top-16 left-0 w-64 bg-white p-6 shadow-xl h-full z-50 transition-transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <nav className="space-y-4 text-gray-700 font-medium">
              <a
                onClick={() => router.push("/studentdashboard/Studview")}
                className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer"
              >
                Tests
              </a>
              <a
                href="#"
                className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer"
              >
                Result
              </a>
              <a
                href="#"
                className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer"
              >
                Performance analysis
              </a>
              <a
                href="#"
                className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer"
              >
                Study Materials
              </a>
              <a
                href="#"
                className="block py-3 px-5 rounded-lg hover:bg-gradient-to-br hover:from-yellow-500 hover:to-purple-600 hover:text-white transition duration-300 cursor-pointer"
              >
                My Courses
              </a>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="relative flex flex-row mt-16 h-[calc(100vh-4rem)]">
        <main className="flex-grow p-6 grid grid-cols-2 gap-4 h-full">
          {/* To-Do List */}
          <section className="bg-white p-6 shadow-xl rounded-xl h-full flex flex-col">
            <h2 className="text-lg font-semibold text-center border-b pb-2 text-purple-800">
              Pending Works
            </h2>
            <ul className="mt-4 space-y-2 flex-grow overflow-auto">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`border p-4 rounded-lg bg-gray-100 flex justify-between items-center shadow-sm hover:bg-gray-200 transition ${task.color}`}
                >
                  <span className="font-medium">{task.title}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Profile Section */}
          <section className="bg-white p-6 shadow-xl rounded-xl flex flex-col items-center h-full">
            <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-purple-600 text-white text-3xl font-semibold rounded-full flex items-center justify-center shadow-md">
              {student.name}
            </div>
            <h2 className="mt-3 font-semibold text-lg text-gray-800">
              {student.name}
            </h2>
            <p className="text-sm text-gray-600">{student.className} Student</p>
            <p className="text-sm text-gray-600 mt-1">
              Rank: <span className="font-medium">{student.rank}</span>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
