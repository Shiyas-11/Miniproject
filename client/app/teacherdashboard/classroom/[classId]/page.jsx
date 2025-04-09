"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import TeacherNavbar from "@/components/nav/TeacherNavbar";

const AddStudentForm = ({ classroomId }) => {
  const [form, setForm] = useState({
    studentName: "",
    email: "",
    rollno: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/classroom/${classroomId}/add-student`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setForm({ studentName: "", email: "", rollno: "", password: "" });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-neutral-800 p-6 rounded-md border dark:border-neutral-700"
    >
      <h2 className="text-xl font-semibold mb-2">Add Student</h2>

      <input
        type="text"
        name="studentName"
        placeholder="Student Name"
        className="w-full p-2 border rounded-md"
        value={form.studentName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded-md"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="rollno"
        placeholder="Roll No"
        className="w-full p-2 border rounded-md"
        value={form.rollno}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 border rounded-md"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        {loading ? "Adding..." : "Add Student"}
      </button>

      {message && (
        <p className="mt-2 text-sm text-center text-purple-600">{message}</p>
      )}
    </form>
  );
};

const ClassroomDetailsPage = () => {
  const { classId } = useParams();
  const [details, setDetails] = useState(null);
  const [overview, setOverview] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log(classId);
    const fetchData = async () => {
      try {
        const [detailsRes, overviewRes, studentsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/classroom/${classId}/details`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/classroom/${classId}/overview`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/classroom/${classId}/students`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log(detailsRes, overviewRes, studentsRes);
        setDetails(detailsRes.data);
        setOverview(overviewRes.data);
        setStudents(studentsRes.data.students || []);
      } catch (err) {
        console.error("Error fetching classroom data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  if (loading)
    return <div className="p-10 text-center">Loading classroom data...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-6  bg-white dark:bg-neutral-900 text-black dark:text-white gap-6">
      {/* Left Section */}
      <TeacherNavbar />
      <div className="w-full md:w-2/3 space-y-6 mt-20 ">
        {/* Details */}
        <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-5 shadow">
          <h2 className="text-xl font-semibold mb-2">Classroom Details</h2>
          <p>
            <strong>Name:</strong> {details?.name}
          </p>
          <p>
            <strong>Institution:</strong> {details?.institutionName}
          </p>
          <p>
            <strong>Total Students:</strong> {details?.studentCount}
          </p>
        </div>

        {/* Overview */}
        <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-5 shadow">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>

          <div>
            <h3 className="font-semibold">Announcements</h3>
            <ul className="list-disc list-inside mb-4">
              {overview?.announcements?.length > 0 ? (
                overview.announcements.map((a, idx) => <li key={idx}>{a}</li>)
              ) : (
                <li>No announcements</li>
              )}
            </ul>

            <h3 className="font-semibold">Recent Tests</h3>
            <ul className="mb-4">
              {overview?.recentTests?.length > 0 ? (
                overview.recentTests.map((t) => (
                  <li key={t._id}>
                    {t.title} –{" "}
                    {new Date(t.createdAt).toLocaleDateString("en-IN")}
                  </li>
                ))
              ) : (
                <li>No recent tests</li>
              )}
            </ul>

            <h3 className="font-semibold">Stats</h3>
            <p>Total Tests: {overview?.stats?.totalTests}</p>
            <p>Avg Score: {overview?.stats?.averageScore}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`./${classId}/CreateTest`)}
            className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Create Test
          </button>
          <button
            onClick={() => router.push(`./${classId}/viewtest`)}
            className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            View Assigned Tests
          </button>
          <button
            onClick={() => router.push(`./${classId}/materials`)}
            className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Provide Study Materials
          </button>
        </div>
      </div>

      {/* Right Section - Students */}
      <div className="w-full md:w-1/3 bg-gray-100 dark:bg-neutral-800 p-5 mt-20 rounded-lg shadow overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Students</h2>
        <ul className="space-y-2">
          {students.length > 0 ? (
            students.map((s) => (
              <li key={s._id} className="border-b pb-2">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {s.email}
                </p>
              </li>
            ))
          ) : (
            <p>No students in this classroom.</p>
          )}
        </ul>
        <div className="p-6">
          {/* Add Student Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleForm}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              {showForm ? "Hide Add Student Form" : "Add Student"}
            </button>
          </div>
          {showForm && <AddStudentForm classroomId={classId} />}
        </div>
      </div>
    </div>
  );
};

export default ClassroomDetailsPage;
