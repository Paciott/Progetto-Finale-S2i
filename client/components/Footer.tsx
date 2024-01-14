"use client";

// imports
import { TbBrandNextjs } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";

// component
export default function Footer() {
  return (
    <footer className="p-6 flex flex-col items-center justify-center border-t border-slate-200 dark:border-slate-700/50">
      <p className="text-lg mb-1">
        Developed by{" "}
        <a
          href="https://github.com/Paciott"
          className="text-purplepink font-medium hover:underline transition ease-in-out"
        >
          Paciott
        </a>
      </p>
      <p className="italic text-center text-sm">
        {" "}
        Made with
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="px-2 hover:text-brightYellow transition ease-in-out"
        >
          NextJs <TbBrandNextjs className="inline w-7 h-7" />
        </a>
        and
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          className="px-2 hover:text-blue transition ease-in-out"
        >
          TailwindCSS <SiTailwindcss className="inline w-7 h-7" />
        </a>
      </p>
    </footer>
  );
}
