"use client";

// imports
import { IoCheckmarkDoneCircle } from "react-icons/io5";

// component
export function SuccessModal({ title, text }: { title: string; text: string }) {
  return (
    <div className="fixed m-0 p-0 top-0 left-0 w-full h-full bg-slate-500/70 dark:bg-slate-900/70 z-40">
      <div className="absolute m-auto left-0 right-0 top-20 py-5 px-8 rounded z-10 bg-white dark:bg-slate-950 flex flex-col  items-center content-center gap-5 w-10/12 h-auto max-w-md">
        <IoCheckmarkDoneCircle className="w-12 h-12" />
        <div className="flex flex-col items-center content-center gap-3">
          <h2 className="w-min font-bold text-center text-3xl xs:tracking-widest">
            {title}
          </h2>
          <p className="text-center py-2">{text}</p>
        </div>
      </div>
    </div>
  );
}
