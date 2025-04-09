"use client";
import LandingNavbar from "@/components/nav/LandingNavbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-white via-orange-200  to-yellow-400 text-black
    dark:from-blue-950 dark:via-indigo-950 dark:to-black dark:text-white "
    >
      <LandingNavbar />

      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 ">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Streamline Placement Training
          <br />
          with{" "}
          <span className="dark:text-yellow-400 text-blue-950  dark:hover:text-yellow-300 hover:text-blue-900">
            SAPT
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          A centralized platform to assess, guide, and elevate student readiness
          for placements — built for educators, tailored for learners.
        </p>
        <Button
          onClick={() => router.push("/login")}
          className="dark:bg-yellow-400 bg-blue-950 dark:text-black text-white text-lg px-6 py-4 dark:hover:bg-yellow-300 hover:bg-blue-700"
        >
          Get Started
        </Button>
      </section>
      {/* Features Section */}
      <section className="px-6 py-20 bg-black/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Virtual Classrooms</h3>
            <p className="text-sm text-white/80">
              Manage and broadcast tests, share resources, and track students
              under one roof.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">
              Performance Insights
            </h3>
            <p className="text-sm text-white/80">
              Visualize student growth with live metrics, levels, and detailed
              performance charts.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">All-in-One Content</h3>
            <p className="text-sm text-white/80">
              Access company-specific questions, mock tests, interview prep, and
              resume tools.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <footer className="text-center py-10 text-sm text-white/60">
        <p>
          &copy; {new Date().getFullYear()} SAPT — Skill Assessment and
          Placement Training
        </p>
      </footer>
    </div>
  );
}
