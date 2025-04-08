"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const TeacherViewTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTest, setSelectedTest] = useState(null); // State for the selected test

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getquestionsfromdb");
        setTests(response.data.data || []);
      } catch (err) {
        setError("Failed to load tests");
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8 pt-20">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 shadow-lg z-50">
        <h1 className="text-3xl font-bold tracking-wide">
          <a href="/" className="hover:text-purple-300 transition duration-200">SAPT</a>
        </h1>
      </nav>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Available Tests</h1>

      {/* Loading & Error Messages */}
      {loading ? (
        <p className="text-lg text-gray-600">Loading tests...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : tests.length === 0 ? (
        <p className="text-lg text-gray-600">No tests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {tests.map((test, index) => (
            <div
              key={test._id || index}
              className="bg-white p-6 shadow-xl rounded-2xl flex flex-col items-center hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-300"
            >
              {/* Test Card */}
              <div
                className={`w-48 h-36 rounded-lg flex items-center justify-center text-gray-900 font-semibold text-2xl shadow-md ${
                  index % 5 === 0 ? "bg-red-300" :
                  index % 5 === 1 ? "bg-green-300" :
                  index % 5 === 2 ? "bg-yellow-300" :
                  index % 5 === 3 ? "bg-blue-300" : "bg-purple-300"
                }`}
              >
                {test.testName || "Untitled Test"}
              </div>

              <p className="text-sm text-gray-600 mt-3 font-medium">
                {test.questions.length} Questions
              </p>

              {/* View Test Button */}
              <button
                onClick={() => setSelectedTest(test)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                View Test
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Viewing Test */}
      {selectedTest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedTest(null)}
              className="absolute top-3 right-4 text-gray-700 hover:text-gray-900 text-xl"
            >
              ✖
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedTest.testName}</h1>

            <h2 className="text-xl font-semibold text-gray-800 mb-3">Questions:</h2>
            <ul className="space-y-4">
              {selectedTest.questions.map((q, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="text-lg font-medium">{index + 1}. {q.title}</p>
                  {q.options && q.options.length > 0 && (
                    <ul className="list-disc ml-6 mt-2">
                      {q.options.map((opt, i) => (
                        <li key={i} className="text-gray-700">{opt.text}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherViewTests;
