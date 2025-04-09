"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const TeacherNavbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 shadow-md py-3 px-6 flex items-center justify-between">
      {/* Branding */}
      <div className="text-xl font-bold text-purple-700 dark:text-yellow-400">
        SAPT Teacher
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/teacherdashboard" className="hover:underline">
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
        >
          Logout
        </button>
        <ThemeToggle />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6 text-black dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full right-6 mt-2 w-40 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded shadow-md flex flex-col space-y-2 p-3 z-50">
          <Link href="/teacherdashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="text-left text-red-600 dark:text-red-400"
          >
            Logout
          </button>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default TeacherNavbar;
