"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import axios from "axios";
import StudentNavbar from "@/components/nav/StudentNavbar";

const StudentDashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchStudentData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/student/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("student", res.data.data);

        if (res.status === 200) {
          setStudent(res.data.data);
        } else {
          throw new Error("Unauthorized");
        }

        const taskRes = await axios.get(
          "http://localhost:5000/api/student/classroom/tests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const sortedTasks = taskRes.data.data.sort(
          (a, b) => new Date(a.test.endTime) - new Date(b.test.endTime)
        );

        setTasks(sortedTasks);
      } catch (error) {
        console.error("Fetch error", error);
        localStorage.clear();
        router.push("/login");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white">
      {/* Navbar */}
      <StudentNavbar onToggleSidebar={setSidebarOpen} />

      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <aside className="fixed top-16 left-0 w-64 bg-white dark:bg-neutral-900 p-6 shadow-xl h-full z-50">
            <nav className="space-y-4 font-medium">
              <div
                onClick={() => router.push("/studentdashboard/Studview")}
                className="py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-white cursor-pointer"
              >
                Tests
              </div>
              <div className="py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-white cursor-pointer">
                Results
              </div>
              <div className="py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-white cursor-pointer">
                Performance Analysis
              </div>
              <div className="py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-white cursor-pointer">
                Study Materials
              </div>
              <div className="py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-white cursor-pointer">
                My Courses
              </div>
            </nav>
          </aside>
        </div>
      )}

      {/* Content */}
      <main className="pt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks */}
        <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-center border-b pb-2 text-purple-800 dark:text-purple-300">
            Pending Works
          </h2>
          <ul className="mt-4 space-y-3 max-h-[60vh] overflow-auto">
            {tasks.length === 0 ? (
              <li className="text-center text-sm text-gray-500">
                No tasks assigned
              </li>
            ) : (
              tasks.map((task, i) => (
                <li
                  key={task._id || i}
                  className="border p-3 rounded-lg bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 transition flex justify-between items-center"
                >
                  <span className="font-medium">{task.test.title}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {Date(task.test.endTime).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Profile */}
        <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-500 to-purple-600 text-white text-3xl flex items-center justify-center shadow">
            {student?.name?.[0] || "S"}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{student.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {student.classroom} • {student.institutionName}
          </p>
          <p className="text-sm mt-2">
            Rank: <strong>{student.rank || "N/A"}</strong>
          </p>
          <p className="text-sm">
            Level: <strong>{student.level || "N/A"}</strong>
          </p>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
