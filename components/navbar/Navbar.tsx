"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme/ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload Resume" },
  { href: "/analysis", label: "Analysis" },
  { href: "/interview", label: "Interview" },
  { href: "/feedback", label: "Feedback" }
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/60 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
          <div className="primary-gradient flex h-9 w-9 items-center justify-center rounded-2xl shadow-lg shadow-sky-500/40">
            <span className="text-lg font-semibold text-white">AI</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Interview Assistant
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Resume & interview intelligence
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/60 px-2 py-1 text-xs shadow-sm backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-900/60 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1 font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          className="group relative inline-flex h-9 w-16 items-center rounded-full border border-slate-200 bg-white/70 px-1 shadow-sm backdrop-blur-md transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-slate-600"
        >
          <span
            className={`absolute inset-y-1 w-7 rounded-full bg-slate-900 shadow-md transition-all duration-300 group-hover:w-8 dark:bg-slate-100 ${
              theme === "dark"
                ? "right-1 translate-x-0"
                : "left-1 translate-x-0"
            }`}
          />
          <span className="relative flex w-full justify-between px-1 text-[10px] font-semibold uppercase tracking-wide">
            <span
              className={
                theme === "light"
                  ? "text-white"
                  : "text-slate-400 dark:text-slate-500"
              }
            >
              L
            </span>
            <span
              className={
                theme === "dark"
                  ? "text-slate-900"
                  : "text-slate-400 dark:text-slate-500"
              }
            >
              D
            </span>
          </span>
        </button>
      </nav>
    </header>
  );
}

