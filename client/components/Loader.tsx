"use client";

// imports
import { GiCircleClaws } from "react-icons/gi";

// component
export default function Loader() {
  return (
    <main className="flex justify-center items-center my-32">
      <GiCircleClaws className="w-16 h-16 md:w-32 md:h-32 animate-spin-slow" />
    </main>
  );
}
