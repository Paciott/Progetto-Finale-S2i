"use client";

// imports
import { FormEvent } from "react";
import Link from "next/link";
import SpinningCircle from "./SpinningCircle";

declare global {
  interface Response {
    username?: string;
  }
}

// component
export default function LoginForm({
  modalState,
  handleSubmit,
  isLoading,
}: {
  modalState: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}) {
  return (
    <section className="col-span-1 row-span-2">
      <form
        className="flex flex-col gap-5 p-6 rounded border w-auto border-slate-200 dark:border-slate-700/50"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl text-center p-2 font-semibold">Welcome</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            className="bg-transparent rounded border outline-none outline-offset-0 focus:outline-purplepink mb-3 p-1 w-full border-slate-200 dark:border-slate-700/50"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
            disabled={modalState}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            className="bg-transparent rounded border outline-none outline-offset-0 focus:outline-purplepink mb-3 p-1 w-full border-slate-200 dark:border-slate-700/50"
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            required
            disabled={modalState}
          />
        </div>
        <button
          className={
            "mt-5 rounded px-3 py-2 font-semibold text-sm block mx-auto bg-purplepink w-full hover:bg-darkpurple text-white transition ease-in-out" +
            (modalState ? "hover:bg-purplepink opacity-50 col-span-2" : "")
          }
          type="submit"
          disabled={modalState}
        >
          {isLoading ? <SpinningCircle text="Logging in..." /> : "Login"}
        </button>
      </form>
      <section className="p-3 text-start flex flex-col sm:flex-row sm:gap-2">
        <span>Not a member?</span>
        <Link
          href="/register"
          className="text-purplepink text-start hover:underline"
        >
          Sign up now
        </Link>
      </section>
    </section>
  );
}
