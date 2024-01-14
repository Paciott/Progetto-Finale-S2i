"use client";

// imports
import { TbAlertTriangleFilled } from "react-icons/tb";

// component
export function AlertModal({
  title,
  text,
  handleModal,
}: {
  title: string;
  text: string;
  handleModal: () => void;
}) {
  return (
    <div className="fixed m-0 p-0 top-0 left-0 w-full h-full bg-slate-500/70 dark:bg-slate-900/70 z-40">
      <div className="absolute m-auto left-0 right-0 top-20 py-5 px-8 rounded z-10 bg-white dark:bg-slate-950 flex flex-col  items-center content-center gap-5 w-10/12 max-w-md">
        <TbAlertTriangleFilled className="w-12 h-12" />
        <div className="flex flex-col  items-center content-center gap-3">
          <h2 className="font-bold text-3xl tracking-widest">{title}</h2>
          <p className="text-center">{text}</p>
        </div>
        <button
          className="mt-5 rounded px-3 py-2 font-semibold text-sm block mx-auto bg-purplepink w-full hover:bg-darkpurple text-white transition ease-in-out"
          onClick={handleModal}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
