"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function StudentNavbar() {
  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">SkillSphere - Student</div>
        <div className="hidden md:flex space-x-6">
          <a href="#">Dashboard</a>
          <a href="#">To-Do</a>
          <a href="#">Materials</a>
          <a href="#">Progress</a>
        </div>
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="secondary">Profile</Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="text-white" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
