"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <User className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded shadow-lg py-2 text-sm text-black dark:text-white">
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
