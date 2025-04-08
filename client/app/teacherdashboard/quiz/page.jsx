"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizSetupPage() {
  const [duration, setDuration] = useState(10); // Default duration in minutes
  const [questionCount, setQuestionCount] = useState(5);
  const [allowBackNavigation, setAllowBackNavigation] = useState(false);
  const [randomizeQuestions, setRandomizeQuestions] = useState(true);
  const router = useRouter();

  const handleNext = () => {
    // Redirect to live quiz page
    router.push("/teacherdashboard/livequiz");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
        <h className="text-black">
space
        </h>
        <h className="text-black">
            bbbbbbbb
            </h>
            <h className="text-black">
            bbbbbbbb
            </h> <h className="text-black">
            bbbbbbbb
            </h>
            <h className="text-black">
            bbbbbbbb
            </h>
      <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <label className="block">
          <span className="text-lg font-semibold">Quiz Duration (minutes):</span>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            min="1"
          />
        </label>
        
        <label className="block">
          <span className="text-lg font-semibold">Number of Questions:</span>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            min="1"
          />
        </label>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={allowBackNavigation}
            onChange={() => setAllowBackNavigation(!allowBackNavigation)}
            className="w-5 h-5"
          />
          <span className="text-lg">Allow students to go back to previous questions</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={randomizeQuestions}
            onChange={() => setRandomizeQuestions(!randomizeQuestions)}
            className="w-5 h-5"
          />
          <span className="text-lg">Randomize question order</span>
        </div>
        
        <button
          onClick={handleNext}
          className="w-full mt-4 bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
