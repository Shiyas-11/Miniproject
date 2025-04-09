"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const StartTest = () => {
  const { id } = useParams();
  const router = useRouter();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/student/classroom/tests/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data.test);
        if (res.data.success) {
          setTest(res.data.test);
        }
      } catch (err) {
        console.error("Error fetching test:", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id, router]);
  const handleMCQChange = (qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  const handleMSQChange = (qIndex, value) => {
    const prevAnswers = answers[qIndex] || [];
    if (prevAnswers.includes(value)) {
      setAnswers((prev) => ({
        ...prev,
        [qIndex]: prevAnswers.filter((opt) => opt !== value),
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [qIndex]: [...prevAnswers, value],
      }));
    }
  };

  const handleCodingChange = (qIndex, code) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: code,
    }));
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!test) return;

    try {
      const finalAnswers = test.questions.map((q, index) => {
        const base = {
          question: q.question,
          type: q.type,
        };

        if (q.type === "Coding") {
          return {
            ...base,
            codingSubmission: {
              code: answers[index] || "",
              language: "javascript", // you can customize this later
              output: "", // set after judge later
              status: "Accepted",
              passedTestCases: 0,
              totalTestCases: q.questionData?.testCases?.length || 0,
              executionTime: null,
              memoryUsed: null,
            },
          };
        } else {
          return {
            ...base,
            selectedOptions: answers[index] || [],
          };
        }
      });

      const res = await axios.post(
        `http://localhost:5000/api/student/classroom/tests/submit-test`,
        {
          testId: test._id,
          answers: finalAnswers,
          timeTaken: 0, // ⏳ Optional: Replace with actual time if you track it
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        router.push("/studentdashboard/testsubmitted");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong during submission.");
    }
  };

  if (loading) return <p className="p-10 text-center">Loading test...</p>;

  if (!test) return <p className="p-10 text-center">Test not found.</p>;

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-neutral-900 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">{test.title}</h1>

      <div className="space-y-8">
        {test.questions.map((q, index) => (
          <div
            key={index}
            className="p-5 rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800"
          >
            <h2 className="font-semibold mb-2">
              Q{index + 1} - ({q.type})
            </h2>

            {q.type === "MCQ" && q.questionData && (
              <div>
                <p className="mb-2">{q.questionData.question}</p>
                {q.questionData.options.map((opt, i) => (
                  <div key={i} className="mb-1">
                    <input
                      type="radio"
                      name={`q${index}`}
                      id={`q${index}_${i}`}
                      value={opt}
                      checked={answers[index] === opt}
                      onChange={() => handleMCQChange(index, opt)}
                    />
                    <label htmlFor={`q${index}_${i}`} className="ml-2">
                      {opt}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {q.type === "MSQ" && q.questionData && (
              <div>
                <p className="mb-2">{q.questionData.question}</p>
                {q.questionData.options.map((opt, i) => (
                  <div key={i} className="mb-1">
                    <input
                      type="checkbox"
                      id={`q${index}_${i}`}
                      checked={answers[index]?.includes(opt)}
                      onChange={() => handleMSQChange(index, opt)}
                    />
                    <label htmlFor={`q${index}_${i}`} className="ml-2">
                      {opt}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {q.type === "Coding" && q.questionData && (
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {q.questionData.title}
                </h3>
                <p className="mb-4">{q.questionData.description}</p>
                <textarea
                  placeholder="Write your solution here..."
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-neutral-600 dark:bg-neutral-900"
                  rows={8}
                  value={answers[index] || ""}
                  onChange={(e) => handleCodingChange(index, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default StartTest;
