"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TeacherNavbar from "@/components/nav/TeacherNavbar";

const TeacherDashboard = () => {
  const router = useRouter();
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      router.push("/login");
    } else {
      setToken(localToken);
      fetchClassrooms(localToken);
    }
  }, []);

  const fetchClassrooms = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/classroom/details",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClassrooms(res.data.classrooms);
    } catch (err) {
      console.error("Error fetching classrooms:", err);
    }
  };

  const handleClassroomSelect = async (classroomId) => {
    setSelectedClassroom(classroomId);
    try {
      router.push(`/teacherdashboard/classroom/${classroomId}`);
      // setStudents(res.data.students);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">
      <TeacherNavbar />

      <div className="pt-20 px-6 pb-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Classrooms</h1>

        {/* Classroom List */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {classrooms.map((cls) => (
            <button
              key={cls._id}
              onClick={() => handleClassroomSelect(cls._id)}
              className={`px-4 py-2 min-w-2xl min-h-20 rounded-md font-semibold border transition ${
                selectedClassroom === cls._id
                  ? "bg-purple-700 text-white"
                  : "bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700"
              }`}
            >
              {cls.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        {selectedClassroom && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Options */}
            <div className="col-span-1 space-y-4">
              <button
                onClick={() =>
                  router.push(
                    `/teacherdashboard/${selectedClassroom}/createtest`
                  )
                }
                className="w-full px-4 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Create Test
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/teacherdashboard/${selectedClassroom}/assignedtests`
                  )
                }
                className="w-full px-4 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                View Assigned Tests
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/teacherdashboard/${selectedClassroom}/materials`
                  )
                }
                className="w-full px-4 py-3 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
              >
                Provide Study Materials
              </button>
            </div>

            {/* Right: Student List */}
            <div className="col-span-1 lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">
                Students in {selectedClassroom}
              </h2>
              {students.length === 0 ? (
                <p className="text-gray-500">
                  No students in this classroom yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map((student) => (
                    <div
                      key={student._id}
                      className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-md border dark:border-neutral-700"
                    >
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
