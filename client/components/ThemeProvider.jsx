// "use client";

// import { useEffect, useState } from "react";

// export default function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme") || "light";
//     document.documentElement.classList.toggle("dark", storedTheme === "dark");
//     setTheme(storedTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     localStorage.setItem("theme", newTheme);
//     setTheme(newTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// import { createContext } from "react";
// export const ThemeContext = createContext();
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
