"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const StudentViewTests = () => {
  const router = useRouter();

  const [tests, setTests] = useState([
    { id: 1, title: "Test1", date: "2025-03-01", questions: 10, status: "Pending" },
    { id: 2, title: "Test2", date: "2025-03-02", questions: 15, status: "Completed" },
    { id: 3, title: "Test3", date: "2025-03-03", questions: 8, status: "Pending" },
    { id: 4, title: "Test4", date: "2025-03-04", questions: 12, status: "Completed" },
    { id: 5, title: "Test5", date: "2025-03-05", questions: 14, status: "Pending" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center p-8">
       <nav className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 shadow-lg z-50">
    <div className="flex items-center gap-4">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
        <link className="w-6 h-6" />
      </button>
      <h1 className="text-3xl font-bold tracking-wide"><a href="/" className="hover:text-purple-700 transition duration-100">SAPT</a></h1>
    </div>
  </nav>
      <div><h1 className="text-4xl font-extrabold text-gray-100 mb-8">.</h1></div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Available Tests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white p-6 shadow-xl rounded-2xl flex flex-col items-center hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-300"
          >
            <div className={`w-48 h-36 rounded-lg flex items-center justify-center text-gray-900 font-semibold text-2xl shadow-md ${test.id % 5 === 1 ? 'bg-red-300' : test.id % 5 === 2 ? 'bg-green-300' : test.id % 5 === 3 ? 'bg-yellow-300' : test.id % 5 === 4 ? 'bg-blue-300' : 'bg-purple-300'}`}>
              {test.title}
            </div>
            <p className="text-sm text-gray-600 mt-3 font-medium">Created on: {test.date}</p>
            <span className="text-sm text-gray-700 font-medium">{test.questions} Questions</span>
            <span className={`text-sm font-medium mt-1 ${test.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {test.status}
            </span>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition "onClick={() => router.push("/studentdashboard/Studview/aptitudetest/view")}>
              {test.status === "Completed" ? "Review" : "Attempt Test"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentViewTests;
