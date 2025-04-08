"use client";
import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateTest = () => {
  const router=useRouter();


  const [timer, setTimer] = useState(30);
  const [testname,setTestname] =useState("SAMPLETEST")
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
    },
  ]);
  const addquestionstodb = async () => {
    try {
      const response = await axios.post("http://localhost:8080/addquestionstodb", {
        testName:testname,
        questions, // Sending the state directly
      }, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response:", response.data);
      alert("Questions added successfully!");
      router.push("/teacherdashboard");
    } catch (error) {
      console.error("Error adding questions:", error);
      alert("Failed to add questions.");
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
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleChangeQuestionType = (id, type) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== id) return q;
       
        if ((type === "MCQ" || type === "MSQ") &&
            (q.type === "Code" || q.type === "Short Answer")) {
          return {
            ...q,
            type,
            options: [
              { id: 1, text: "", placeholder: "Option 1" },
              { id: 2, text: "", placeholder: "Option 2" },
              { id: 3, text: "", placeholder: "Option 3" },
              { id: 4, text: "", placeholder: "Option 4" },
            ],
            correctAnswers: [],
            description: q.description,
            exampleOutput: q.exampleOutput,
            constraints: q.constraints
          };
        }
       
        return {
          ...q,
          type,
          options: type === "Short Answer" || type === "Code" ? [] : q.options,
          correctAnswers: type === "Code" ? [] : q.correctAnswers,
          description: q.description,
          exampleOutput: q.exampleOutput,
          constraints: q.constraints
        };
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
                  placeholder: `Option ${q.options.length + 1}`
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
       
        const updatedOptions = q.options.filter((opt) => opt.id !== optionId);
        const updatedCorrectAnswers = q.correctAnswers.filter(
          (id) => id !== optionId
        );
       
        const renumberedOptions = updatedOptions.map((opt, index) => ({
          ...opt,
          id: index + 1,
          placeholder: `Option ${index + 1}`
        }));
       
        return {
          ...q,
          options: renumberedOptions,
          correctAnswers: updatedCorrectAnswers.map((id) =>
            id > optionId ? id - 1 : id
          ),
        };
      })
    );
  };

  const handleCorrectAnswerChange = (questionId, optionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== questionId) return q;
       
        if (q.type === "MCQ") {
          return {
            ...q,
            correctAnswers: q.correctAnswers[0] === optionId ? [] : [optionId]
          };
        } else if (q.type === "MSQ") {
          const isSelected = q.correctAnswers.includes(optionId);
          return {
            ...q,
            correctAnswers: isSelected
              ? q.correctAnswers.filter(id => id !== optionId)
              : [...q.correctAnswers, optionId]
          };
        }
        return q;
      })
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200 py-8 px-4 sm:px-8 lg:px-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Test</h1>

      <div className="bg-white p-4 mb-6 w-full max-w-4xl rounded-lg shadow">
        <label className="block font-medium text-lg mb-2">Set Timer (in minutes)</label>
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          min="1"
        />
      </div>

      {questions.map((q, index) => (
        <div
          key={q.id}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6 relative"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Question {index + 1}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium">Points:</label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((question) =>
                        question.id === q.id
                          ? { ...question, points: parseInt(e.target.value) || 0 }
                          : question
                      )
                    )
                  }
                  className="w-12 p-1 text-sm border border-gray-300 rounded"
                  min="1"
                />
              </div>
              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete Question"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <label className="block font-medium">Select Question Type</label>
          <select
            value={q.type}
            onChange={(e) => handleChangeQuestionType(q.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          >
            <option value="MCQ">MCQ</option>
            <option value="MSQ">MSQ</option>
            <option value="Short Answer">Short Answer</option>
            <option value="Code">Code</option>
          </select>

          <input
            type="text"
            placeholder="Enter question title"
            value={q.title}
            onChange={(e) =>
              setQuestions(
                questions.map((question) =>
                  question.id === q.id ? { ...question, title: e.target.value } : question
                )
              )
            }
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          {q.type === "Code" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium">Problem Description</label>
                <textarea
                  placeholder="Enter detailed problem description"
                  value={q.description}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((question) =>
                        question.id === q.id
                          ? { ...question, description: e.target.value }
                          : question
                      )
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded h-32"
                />
              </div>

              <div>
                <label className="block font-medium">Example Output</label>
                <textarea
                  placeholder="Enter example output"
                  value={q.exampleOutput}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((question) =>
                        question.id === q.id
                          ? { ...question, exampleOutput: e.target.value }
                          : question
                      )
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded h-20 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium">Constraints</label>
                <textarea
                  placeholder="Enter constraints (if any)"
                  value={q.constraints}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((question) =>
                        question.id === q.id
                          ? { ...question, constraints: e.target.value }
                          : question
                      )
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded h-20"
                />
              </div>
            </motion.div>
          )}

          {(q.type === "MCQ" || q.type === "MSQ") && (
            <>
              {q.options.map((option) => (
                <div key={option.id} className="flex items-center mb-3">
                  <input
                    type={q.type === "MCQ" ? "radio" : "checkbox"}
                    name={`question-${q.id}`}
                    className="mr-2"
                    checked={q.correctAnswers.includes(option.id)}
                    onChange={() => handleCorrectAnswerChange(q.id, option.id)}
                  />
                  <input
                    type="text"
                    placeholder={option.placeholder}
                    value={option.text}
                    onChange={(e) => {
                      setQuestions(
                        questions.map((question) =>
                          question.id === q.id
                            ? {
                                ...question,
                                options: question.options.map((opt) =>
                                  opt.id === option.id ? { ...opt, text: e.target.value } : opt
                                ),
                              }
                            : question
                        )
                      );
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleRemoveOption(q.id, option.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <button
                onClick={() => handleAddOption(q.id)}
                className="flex items-center justify-center w-full bg-black text-white p-2 rounded my-3 hover:bg-gray-800 transition-colors"
              >
                <FaPlus className="mr-2" /> Add Option
              </button>
            </>
          )}

          {q.type === "Short Answer" && (
            <motion.input
              key={`short-${q.id}`}
              type="text"
              placeholder="Enter short answer"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              disabled
            />
          )}
        </div>
      ))}

      <div className="flex justify-between w-full max-w-4xl">
        <button
          onClick={handleAddQuestion}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Add Questions
        </button>
        {questions.length > 0 && (
          <button onClick={addquestionstodb} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Submit
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CreateTest;