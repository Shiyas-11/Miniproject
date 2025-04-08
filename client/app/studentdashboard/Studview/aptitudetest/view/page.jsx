"use client";

import { useState } from "react";
import TimerBox from "./ui/TimerBox";

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
    {
      id: 4,
      text: "Honey : insect:: Milk:?",
      options: ["pet", "Cattle", "Cow", "Animal"],
      selected: null,
    },
    {
      id: 5,
      text: "China : Asia:: Canada:?",
      options: ["South America", "North America", "Antarctica", "Australia"],
      selected: null,
    },
  ]);

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
    <nav className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 shadow-lg z-50">
    <div className="flex items-center gap-4">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
        <link className="w-6 h-6" />
      </button>
      <h1 className="text-3xl font-bold tracking-wide"><a href="/" className="hover:text-purple-700 transition duration-100">SAPT</a></h1>
    </div>
  </nav>
      <div className="flex flex-grow mt-20 px-6 gap-6">
      <div className="w-1/5 flex flex-col gap-6 sticky top-24 self-start">
  <aside className="bg-white p-6 shadow-lg border border-gray-300 rounded-lg w-full">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Attempted</h2>
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90 bg-transparent rounded-full" viewBox="0 0 36 36">
        <path
          className="text-purple-300"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentcolour"
          strokeWidth="1.5"
        />
        <path
          className="transition-all duration-500 ease-out"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="10.5"
          strokeLinecap="round"
          strokeDasharray={`${(questions.filter((q) => q.selected !== null).length / questions.length) * 100}, 100`}
          style={{ filter: "drop-shadow(0 0 6px rgba(128, 0, 128, 0.4))" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b5de5" />
            <stop offset="50%" stopColor="#f15bb5" />
            <stop offset="100%" stopColor="#fee440" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-800 text-xl font-semibold">
          {questions.filter((q) => q.selected !== null).length} / {questions.length}
        </span>
      </div>
    </div>
  </aside>

  {/* Timer Box */}
  <div className="w-full">
    <TimerBox />
  </div>

  {/* Submit Button Box (Ensuring Proper Placement Below TimerBox) */}
    <button className="bg-purple-500 text-black py-4 px-8  rounded-lg text-lg font-semibold hover:bg-purple-700 text-black transition duration-300">
      Submit
    </button>
</div>


        <main className="w-4/5 bg-white p-8 shadow-md rounded-lg">
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
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          q.selected === index ? "bg-red-500 border-red-500" : "border-gray-400"
                        }`}
                      >
                        {q.selected === index && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                      </div>
                      <span className="text-gray-800 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentTestPage;




// "use client";

// import { useState } from "react";

// const StudentTestPage = () => {
//   const questions = [
//     {
//       id: 1,
//       question: "What is the capital of France?",
//       options: ["Berlin", "Madrid", "Paris", "Rome"],
//       correct: 2,
//     },
//     {
//       id: 2,
//       question: "Which planet is known as the Red Planet?",
//       options: ["Earth", "Mars", "Jupiter", "Venus"],
//       correct: 1,
//     },
//     {
//       id: 3,
//       question: "What is 2 + 2?",
//       options: ["3", "4", "5", "6"],
//       correct: 1,
//     },
//   ];

//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const completedQuestions = Object.keys(selectedAnswers).length;

//   const handleSelect = (questionId, optionIndex) => {
//     setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
//   };

//   return (
//     <div className="min-h-screen flex flex-row bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-white shadow-md p-6 h-screen">
//         <h2 className="text-lg font-semibold text-gray-800">Progress</h2>
//         <p className="mt-2 text-gray-600">Completed: {completedQuestions} / {questions.length}</p>
//       </aside>

//       {/* Test Section */}
//       <main className="flex-grow p-8 overflow-auto">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Test Questions</h1>
//         <div className="space-y-6">
//           {questions.map((q) => (
//             <div key={q.id} className="bg-white p-6 shadow-lg rounded-lg">
//               <h2 className="text-lg font-semibold text-gray-800">{q.question}</h2>
//               <div className="mt-4 grid grid-cols-2 gap-4">
//                 {q.options.map((option, index) => (
//                   <button
//                     key={index}
//                     className={`p-3 rounded-lg border ${
//                       selectedAnswers[q.id] === index
//                         ? "border-blue-500 bg-blue-100"
//                         : "border-gray-300"
//                     } hover:bg-gray-200 transition`}
//                     onClick={() => handleSelect(q.id, index)}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentTestPage;

