"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddQuestionsPage() {
  const [questions, setQuestions] = useState([
    { id: 1, text: "", options: ["", "", "", ""] } // Default question with 4 options
  ]);
  const router = useRouter();

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: "", options: ["", "", "", ""] }]);
  };

  const deleteQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };
  
  const updateQuestionText = (id, newText) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, text: newText } : q)));
  };

  const updateOptionText = (qId, optIndex, newText) => {
    setQuestions(questions.map(q => (
      q.id === qId
        ? { ...q, options: q.options.map((opt, idx) => (idx === optIndex ? newText : opt)) }
        : q
    )));
  };

  const addOption = (qId) => {
    setQuestions(questions.map(q => (
      q.id === qId ? { ...q, options: [...q.options, ""] } : q
    )));
  };

  const deleteOption = (qId, optIndex) => {
    setQuestions(questions.map(q => (
      q.id === qId && q.options.length > 2
        ? { ...q, options: q.options.filter((_, idx) => idx !== optIndex) }
        : q
    )));
  };

  const handleSubmit = () => {
    console.log("Quiz Submitted:", questions);
    router.push("/teacherdashboard/quizallow");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-purple-600 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create Quiz Questions</h1>
      <div className="w-full max-w-4xl space-y-6">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="bg-white text-black p-6 rounded-lg shadow-lg w-full">
            <input
              type="text"
              value={q.text}
              onChange={(e) => updateQuestionText(q.id, e.target.value)}
              placeholder={`Question ${qIndex + 1}`}
              className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOptionText(q.id, optIndex, e.target.value)}
                  placeholder={`Option ${optIndex + 1}`}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-400"
                />
                {q.options.length > 2 && (
                  <button
                    onClick={() => deleteOption(q.id, optIndex)}
                    className="ml-2 text-red-600 text-xl font-bold"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addOption(q.id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Option
            </button>
            {questions.length > 1 && (
              <button
                onClick={() => deleteQuestion(q.id)}
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Question
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addQuestion}
          className="mt-6 bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          + Add Question
        </button>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
