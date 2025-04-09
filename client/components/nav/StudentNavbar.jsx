"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle";
import ProfileDropdown from "../ui/ProfileDropdown";

export default function StudentNavbar({ user, onToggleSidebar }) {
  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-md fixed top-0 w-full z-50">
      <div className="w-full px-4 py-3 flex justify-between items-center bg-gradient-to-br from-yellow-500 to-purple-600 text-white dark:from-purple-900 dark:to-black">
        {/* Left - Logo */}
        <button
          onClick={onToggleSidebar}
          className="focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/studentdashboard" className="text-xl font-bold ">
          SAPT
        </Link>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ProfileDropdown user={user} />
        </div>
      </div>
    </nav>
  );
}
