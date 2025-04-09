"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// pages/studentdashboard/test-submitted.jsx
export default function Submitted() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/studentdashboard/Studview");
    }, 2000);
  }, []);

  return (
    <div className="p-8 text-center text-xl font-semibold">
      ✅ Your test has been submitted successfully!
    </div>
  );
}
