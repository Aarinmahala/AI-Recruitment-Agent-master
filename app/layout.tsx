import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "AI Interview Preparation Assistant",
  description: "AI powered resume screening and interview preparation platform."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 px-4 pb-10 pt-4 sm:px-6 lg:px-10 lg:pt-8">
              <div className="mx-auto max-w-6xl">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

