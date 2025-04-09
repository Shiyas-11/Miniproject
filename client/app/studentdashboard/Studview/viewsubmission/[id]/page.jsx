"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ViewSubmissionPage = ({ params }) => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ans, setAns] = useState([]);
  const testId = id;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, id);
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchSubmission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/student/submissions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching submission:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id, router]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!data)
    return <div className="text-center mt-10">Submission not found.</div>;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">{data.testTitle}</h1>
      <p className="mb-2">
        Submitted at: {new Date(data.submittedAt).toLocaleString()}
      </p>
      <p className="mb-2">Total Score: {data.totalScore}</p>
      <p className="mb-6">Time Taken: {data.timeTaken} minutes</p>

      <div className="space-y-6">
        {data.answers.map((ans, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
          >
            <CardHeader>
              <h2 className="text-lg font-semibold">
                Question {index + 1} ({ans.type})
              </h2>
            </CardHeader>
            <CardContent>
              <p className="mb-2 font-medium">
                {ans.type === "MCQ" || ans.type === "MSQ"
                  ? ans.questionText.question
                  : ans.questionText}
              </p>

              {ans.type === "MCQ" || ans.type === "MSQ" ? (
                <>
                  <p className="text-sm">
                    Selected: {ans.selectedOptions.join(", ")}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      ans.isCorrect ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {ans.isCorrect ? "Correct" : "Incorrect"} — Marks:{" "}
                    {ans.marksObtained}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm mb-2">Language: {ans.language}</p>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto mb-2">
                    <code>{ans.code}</code>
                  </pre>
                  <p className="text-sm">
                    Test Cases Passed: {ans.passedTestCases}/
                    {ans.totalTestCases}
                  </p>
                  <p
                    className={`text-sm ${
                      ans.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    Status: {ans.status}
                  </p>
                  <p className="text-sm font-semibold">
                    Marks: {ans.marksObtained}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewSubmissionPage;
