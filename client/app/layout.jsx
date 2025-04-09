// import "@styles/globals.css";
// import ThemeProvider from "@/components/ThemeProvider";
// import Navbar from "@/components/nav/LandingNavbar";

// export const metadata = {
//   title: "Placement Training App",
//   description: "Prepare smart with us!",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="dark" suppressHydrationWarning>
//       <body>
//         <ThemeProvider>{children}</ThemeProvider>
//       </body>
//     </html>
//   );
// }
import { ThemeProvider } from "@/components/ThemeProvider";
import "../styles/globals.css";

export const metadata = {
  title: "SAPT",
  description: "Placement Training",
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
