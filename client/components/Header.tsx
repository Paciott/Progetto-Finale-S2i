"use client";

// imports
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { GiCircleClaws } from "react-icons/gi";

// component
export default function Header() {
  return (
    <header className="p-6 flex gap-4 flex-row md:gap-0 items-center justify-between border-b border-slate-200 dark:border-slate-700/50">
      <Link href="/" className="text-5xl flex flex-row gap-2">
        <GiCircleClaws />
        <h1 className="font-semibold">Circles</h1>
      </Link>
      <ThemeToggle />
    </header>
  );
}
