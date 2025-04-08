"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
        {open ? <X className="text-white" /> : <Menu className="text-white" />}
      </Button>
      {open && (
        <div className="absolute top-16 right-4 bg-white dark:bg-zinc-900 text-black dark:text-white p-4 rounded shadow-lg z-50 flex flex-col space-y-3">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      )}
    </>
  );
}
