import { ThemeProvider } from "@/components/ThemeProvider"; // Should exist
import "@/styles/globals.css";
import LandingNavbar from "@/components/nav/LandingNavbar";
export const metadata = {
  title: "SAPT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
