"use client";

// imports
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

// component
export default function ThemeToggle() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  // function that handles theme
  function handleTheme() {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.theme = "light";
    } else {
      setTheme("dark");
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }
  // Whenever the user explicitly chooses to respect the OS preference
  // localStorage.removeItem("theme");

  return (
    <button
      className="p-3 rounded border border-1 border-slate-200 dark:border-slate-700/50 hover:text-purplepink transition ease-in-out"
      onClick={() => handleTheme()}
    >
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
