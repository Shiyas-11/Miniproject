"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useState } from "react";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState();
  return (
    <>
      <nav
        className="w-full z-50 backdrop-blur border-b border-white/10 bg-gradient-to-r
       dark:from-black dark:via-indigo-800 dark:to-black dark:text-white shadow-md from-white via-yellow-100  to-orange-300 text-black"
      >
        <div className="w-full flex items-center justify-between px-4 py-3">
          {/* Far Left: Logo */}
          <div className="text-3xl font-extrabold tracking-tight">SAPT</div>

          {/* Far Right: Nav links and buttons */}
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white/90">
              Home
            </a>
            <a href="#" className="hover:text-white/90">
              Features
            </a>
            <a href="#" className="hover:text-white/90">
              About
            </a>
            <a href="#" className="hover:text-white/90">
              Contact
            </a>
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100 text-sm font-semibold"
              onClick={() => setIsOpen(true)}
            >
              Sign In
            </Button>

            <ThemeToggle />
            <div className="">
              <Button variant="ghost" size="icon">
                <Menu className="text-white dark:text-black " />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
