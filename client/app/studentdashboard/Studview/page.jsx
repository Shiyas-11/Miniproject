"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import StudentNavbar from "@/components/nav/StudentNavbar";

const Studview = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/student/classroom/tests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data && Array.isArray(res.data.data)) {
          setTasks(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching tests:", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">
      {/* Navbar */}
      <StudentNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar backdrop (future ready) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="pt-20 px-6 pb-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Assigned Tests</h1>
        {loading ? (
          <p className="text-center">Loading tests...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tests assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((t) => (
              <div
                key={t._id}
                className="p-5 rounded-lg shadow-md bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700"
              >
                <h2 className="text-xl font-semibold mb-1">{t.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deadline:{" "}
                  {new Date(t.test.endTime).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    t.submitted
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {t.submitted ? "Submitted" : "Pending"}
                </p>
                {/* Optional action */}
                <button
                  onClick={() => {
                    if (!t.submitted) {
                      router.push(`/studentdashboard/starttest/${t.test._id}`);
                    }
                  }}
                  className={`mt-4 px-4 py-2 rounded-md text-sm font-semibold ${
                    t.submitted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } text-white transition`}
                  disabled={t.submitted}
                >
                  {t.submitted ? "Already Submitted" : "Start Test"}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (t.submitted) {
                      router.push(
                        `/studentdashboard/Studview/viewsubmission/${t.test._id}`
                        // console.log(t.test._id)
                      );
                    }
                  }}
                  className={`mt-4 ml-2 px-4 py-2 rounded-md text-sm font-semibold ${
                    !t.submitted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } text-white transition`}
                  disabled={!t.submitted}
                >
                  {t.submitted ? "View Result" : "Result not available"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Studview;
