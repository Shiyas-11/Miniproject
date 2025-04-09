"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import TeacherNavbar from "@/components/nav/TeacherNavbar";

const ViewAllTestsPage = () => {
  const [tests, setTests] = useState([]);
  const router = useRouter();
  const { classId } = useParams();
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/classroom/${classId}/tests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTests(response.data.tests);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        // alert("Failed to fetch tests. Please try again.");
      }
    };

    fetchTests();
  }, []);

  const handleViewTest = (testId) => {
    router.push(`/teacherdashboard/tests/${testId}`);
  };

  const handleEditTest = (testId) => {
    router.push(`/teacherdashboard/tests/edit/${testId}`);
  };

  const handleDeleteTest = async (testId) => {
    if (confirm("Are you sure you want to delete this test?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/tests/${testId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTests(tests.filter((test) => test.id !== testId));
        alert("Test deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete test. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 min-h-screen text-black dark:text-white dark:from-indigo-950 dark:via-black dark:to-blue-950">
      <TeacherNavbar />
      <h1 className="text-3xl font-bold mb-6">All Tests</h1>
      {tests.length === 0 ? (
        <p>No tests found.</p>
      ) : (
        <div className="space-y-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-black rounded p-4 shadow"
            >
              <h2 className="text-2xl font-semibold">{test.title}</h2>
              <p>Duration: {test.duration} minutes</p>
              <p>Start Time: {test.startTime}</p>
              <p>End Time: {test.endTime}</p>
              <p>Number of Questions: {test.questions.length}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleViewTest(test.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditTest(test.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTest(test.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllTestsPage;
