"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

const CreateTestPage = () => {
  const { classId } = useParams();
  const router = useRouter();

  const [testname, setTestname] = useState("Sample Test");
  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "MCQ",
      title: "",
      points: 1,
      options: [
        { id: 1, text: "", placeholder: "Option 1" },
        { id: 2, text: "", placeholder: "Option 2" },
        { id: 3, text: "", placeholder: "Option 3" },
        { id: 4, text: "", placeholder: "Option 4" },
      ],
      correctAnswers: [],
      description: "",
      exampleOutput: "",
      constraints: "",
      topics: ["DSA"],
      difficulty: "Easy",
    },
  ]);

  const buildFormattedQuestions = () => {
    return questions.map((q) => {
      let data = {
        question: q.title,
        topics: q.topics || ["DSA"],
        difficulty: q.difficulty || "Easy",
      };

      if (q.type === "MCQ" || q.type === "MSQ") {
        data.options = q.options.map((opt) => opt.text);

        if (q.type === "MCQ") {
          data.correctAnswer =
            q.correctAnswers.length > 0
              ? q.options.find((o) => o.id === q.correctAnswers[0])?.text
              : "";
        } else if (q.type === "MSQ") {
          data.correctAnswers = q.correctAnswers.map(
            (id) => q.options.find((o) => o.id === id)?.text
          );
        }
      }

      if (q.type === "Coding") {
        data = {
          ...data,
          description: q.description,
          exampleOutput: q.exampleOutput,
          constraints: q.constraints,
        };
      }

      return {
        type: q.type === "Code" ? "Coding" : q.type,
        data,
        marks: q.points,
      };
    });
  };

  const addTestToDB = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        classroom: classId,
        title: testname,
        duration: timer,
        startTime: "10-04-2025",
        endTime: "10-04-2025",
        questions: buildFormattedQuestions(),
      };

      console.log("Payload being sent:", payload);

      const response = await axios.post(
        "http://localhost:5000/api/test/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Test created successfully!");
      router.push(`/teacherdashboard/classroom/${classId}`);
    } catch (err) {
      console.error("Error creating test:", err);
      alert("Failed to create test. Please try again.");
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "MCQ",
      title: "",
      points: 1,
      options: [
        { id: 1, text: "", placeholder: "Option 1" },
        { id: 2, text: "", placeholder: "Option 2" },
        { id: 3, text: "", placeholder: "Option 3" },
        { id: 4, text: "", placeholder: "Option 4" },
      ],
      correctAnswers: [],
      description: "",
      exampleOutput: "",
      constraints: "",
      topics: ["DSA"],
      difficulty: "Easy",
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleChangeQuestionType = (id, type) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              type,
              options:
                type === "MCQ" || type === "MSQ"
                  ? [
                      { id: 1, text: "", placeholder: "Option 1" },
                      { id: 2, text: "", placeholder: "Option 2" },
                      { id: 3, text: "", placeholder: "Option 3" },
                      { id: 4, text: "", placeholder: "Option 4" },
                    ]
                  : [],
              correctAnswers: [],
              description: "",
              exampleOutput: "",
              constraints: "",
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (questionId, optionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== questionId) return q;

        if (q.type === "MCQ") {
          return { ...q, correctAnswers: [optionId] };
        } else if (q.type === "MSQ") {
          const exists = q.correctAnswers.includes(optionId);
          return {
            ...q,
            correctAnswers: exists
              ? q.correctAnswers.filter((id) => id !== optionId)
              : [...q.correctAnswers, optionId],
          };
        }

        return q;
      })
    );
  };

  const handleAddOption = (questionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                {
                  id: q.options.length + 1,
                  text: "",
                  placeholder: `Option ${q.options.length + 1}`,
                },
              ],
            }
          : q
      )
    );
  };

  const handleRemoveOption = (questionId, optionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== questionId) return q;

        const updatedOptions = q.options.filter((o) => o.id !== optionId);
        const updatedCorrectAnswers = q.correctAnswers
          .filter((id) => id !== optionId)
          .map((id) => (id > optionId ? id - 1 : id));

        return {
          ...q,
          options: updatedOptions.map((o, i) => ({
            ...o,
            id: i + 1,
            placeholder: `Option ${i + 1}`,
          })),
          correctAnswers: updatedCorrectAnswers,
        };
      })
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 min-h-screen text-black dark:text-white dark:from-black dark:via-black dark:to-blue-950">
      <h1 className="text-3xl font-bold mb-6">Create Test</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Test Name</label>
        <input
          type="text"
          value={testname}
          onChange={(e) => setTestname(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-8">
        <label className="block mb-1 font-medium">Set Timer (in minutes)</label>
        <input
          type="number"
          value={timer}
          min="1"
          onChange={(e) => setTimer(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      {questions.map((q, idx) => (
        <div
          key={q.id}
          className="mb-6 bg-white dark:bg-black rounded p-4 shadow"
        >
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">Question {idx + 1}</h2>
            <button
              onClick={() => handleDeleteQuestion(q.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>

          <label className="block mb-1">Question Type</label>
          <select
            value={q.type}
            onChange={(e) => handleChangeQuestionType(q.id, e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          >
            <option value="MCQ">MCQ</option>
            <option value="MSQ">MSQ</option>
            <option value="Short Answer">Short Answer</option>
            <option value="Code">Code</option>
          </select>

          <input
            type="text"
            placeholder="Enter question"
            value={q.title}
            onChange={(e) =>
              setQuestions(
                questions.map((ques) =>
                  ques.id === q.id ? { ...ques, title: e.target.value } : ques
                )
              )
            }
            className="w-full p-2 mb-3 border rounded"
          />

          {(q.type === "MCQ" || q.type === "MSQ") &&
            q.options.map((opt) => (
              <div key={opt.id} className="flex items-center mb-2">
                <input
                  type={q.type === "MCQ" ? "radio" : "checkbox"}
                  checked={q.correctAnswers.includes(opt.id)}
                  onChange={() => handleCorrectAnswerChange(q.id, opt.id)}
                  className="mr-2"
                />
                <input
                  type="text"
                  value={opt.text}
                  placeholder={opt.placeholder}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((ques) =>
                        ques.id === q.id
                          ? {
                              ...ques,
                              options: ques.options.map((o) =>
                                o.id === opt.id
                                  ? { ...o, text: e.target.value }
                                  : o
                              ),
                            }
                          : ques
                      )
                    )
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => handleRemoveOption(q.id, opt.id)}
                  className="ml-2 text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

          {(q.type === "MCQ" || q.type === "MSQ") && (
            <button
              onClick={() => handleAddOption(q.id)}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              <FaPlus className="inline-block mr-1" /> Add Option
            </button>
          )}

          {q.type === "Code" && (
            <>
              <textarea
                placeholder="Problem description"
                value={q.description}
                onChange={(e) =>
                  setQuestions(
                    questions.map((ques) =>
                      ques.id === q.id
                        ? { ...ques, description: e.target.value }
                        : ques
                    )
                  )
                }
                className="w-full p-2 border rounded my-2"
              />
              <textarea
                placeholder="Example output"
                value={q.exampleOutput}
                onChange={(e) =>
                  setQuestions(
                    questions.map((ques) =>
                      ques.id === q.id
                        ? { ...ques, exampleOutput: e.target.value }
                        : ques
                    )
                  )
                }
                className="w-full p-2 border rounded my-2"
              />
              <textarea
                placeholder="Constraints"
                value={q.constraints}
                onChange={(e) =>
                  setQuestions(
                    questions.map((ques) =>
                      ques.id === q.id
                        ? { ...ques, constraints: e.target.value }
                        : ques
                    )
                  )
                }
                className="w-full p-2 border rounded my-2"
              />
            </>
          )}
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={handleAddQuestion}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FaPlus className="inline-block mr-2" /> Add Question
        </button>
        <button
          onClick={addTestToDB}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default CreateTestPage;
