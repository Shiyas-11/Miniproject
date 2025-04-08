"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LiveQuizWaitingRoom() {
  const router = useRouter();
  const [waitingStudents, setWaitingStudents] = useState([
    "Alice", "Bob", "Charlie", "David"
  ]);
  const [joinedStudents, setJoinedStudents] = useState([]);

  const allowStudent = (name) => {
    setWaitingStudents(waitingStudents.filter(student => student !== name));
    setJoinedStudents([...joinedStudents, name]);
  };

  const allowAll = () => {
    setJoinedStudents([...joinedStudents, ...waitingStudents]);
    setWaitingStudents([]);
  };

  const startQuiz = () => {
    console.log("pressed")
    router.push("/teacherdashboard/quizmain");

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-purple-600 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Live Quiz </h1>
      
      <div className="w-full max-w-2xl bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Waiting Students</h2>
        <ul>
          {waitingStudents.length > 0 ? (
            waitingStudents.map((student, index) => (
              <li key={index} className="flex justify-between mb-2">
                {student}
                <button
                  onClick={() => allowStudent(student)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
                >
                  Allow
                </button>
              </li>
            ))
          ) : (
            <p>No students waiting.</p>
          )}
        </ul>
        {waitingStudents.length > 0 && (
          <button
            onClick={allowAll}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition w-full"
          >
            Allow All
          </button>
        )}
      </div>
      
      <div className="w-full max-w-2xl bg-white text-black p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Joined Students</h2>
        <ul>
          {joinedStudents.length > 0 ? (
            joinedStudents.map((student, index) => (
              <li key={index} className="mb-2">{student}</li>
            ))
          ) : (
            <p>No students have joined yet.</p>
          )}
        </ul>
      </div>
      
      {joinedStudents.length > 0 && (
        <button
          onClick={startQuiz}
          className="mt-6 bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Start Quiz
        </button>
      )}
    </div>
  );
}
