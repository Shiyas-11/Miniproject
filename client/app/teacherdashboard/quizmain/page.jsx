"use client";

import { useState } from "react";
//import TimerBox from "@/ui/TimerBox";

const StudentTestPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Given a Series 2, 5, 12.5, ?, 78.125, 195.3125. Find what number would come in place of the question mark(?)",
      options: ["31.25", "40.25", "30.15", "35"],
      selected: null,
    },
    {
      id: 2,
      text: "Joey : Kangaroo:: Calf:?",
      options: ["Dog", "Cattle", "Cat", "Mouse"],
      selected: null,
    },
    {
      id: 3,
      text: "Who wrote 'Hamlet'?",
      options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"],
      selected: null,
    },
  ]);

  const leaderboard = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 90 },
    { name: "Charlie", score: 85 },
    { name: "David", score: 80 },
  ];

  const handleOptionSelect = (questionId, optionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId
          ? { ...q, selected: q.selected === optionIndex ? null : optionIndex }
          : q
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-purple-600 text-white">
      <div className="flex flex-grow mt-20 px-6 gap-6">
        {/* Sidebar */}
        <div className="w-1/5 flex flex-col gap-6 sticky top-24 self-start">
          <aside className="bg-white p-6 shadow-lg border border-gray-300 rounded-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Attempted</h2>
            <p className="text-gray-800 text-center">
              {questions.filter((q) => q.selected !== null).length} / {questions.length}
            </p>
          </aside>

          {/* <div className="w-full">
            <TimerBox />
          </div> */}
        </div>

        {/* Main Content */}
        <main className="w-3/5 bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Test 1</h1>
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="bg-gray-100 p-6 shadow-md rounded-xl border">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{q.text}</h2>
                <div className="space-y-3">
                  {q.options.map((option, index) => (
                    <label
                      key={index}
                      onClick={() => handleOptionSelect(q.id, index)}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-100 transition duration-300 ${
                        q.selected === index ? "bg-blue-200" : ""
                      }`}
                    >
                      <span className="text-gray-800 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Leaderboard Section */}
        <aside className="w-1/5 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Leaderboard</h2>
          <ul className="space-y-2">
            {leaderboard.map((entry, index) => (
              <li key={index} className="flex justify-between p-2 bg-gray-200 rounded-lg">
                <span className="text-gray-800 font-medium">{entry.name}</span>
                <span className="text-gray-800 font-semibold">{entry.score}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default StudentTestPage;
