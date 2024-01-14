"use client";

// imports
import Link from "next/link";
import { FormEvent } from "react";
import { AlertModal } from "@/components/AlertModal";
import SpinningCircle from "@/components/SpinningCircle";
import { SuccessModal } from "@/components/SuccessModal";

// component
export default function RegisterForm({
  handleSubmit,
  modalState,
  registerSuccess,
  isLoading,
  isUsernameError,
  isEmailError,
  isUsernameInvalid,
  isEmailInvalid,
  isPasswordInvalid,
  isNameInvalid,
  handleModal,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  modalState: boolean;
  registerSuccess: boolean;
  isLoading: boolean;
  isUsernameError: boolean;
  isEmailError: boolean;
  isUsernameInvalid: boolean;
  isEmailInvalid: boolean;
  isPasswordInvalid: boolean;
  isNameInvalid: boolean;
  handleModal: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center p-5 m-auto gap-4">
      <h2 className="text-4xl text-center font-medium p-3">
        Create your <span className="text-purplepink">account</span>
      </h2>
      <small className="py-1 sm:pe-custom-15rem text-sm">
        Fields marked with * are mandatory
      </small>
      <form
        className="p-8 rounded border border-slate-200 dark:border-slate-700/50 w-auto flex flex-col sm:grid sm:grid-cols-2 gap-2 gap-x-4"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="firstname" className="sr-only">
            First Name*
          </label>
          <input
            className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name*"
            required
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname" className="sr-only">
            Last Name*
          </label>
          <input
            className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name*"
            required
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="username" className="sr-only">
            Username*
          </label>
          <input
            className="bg-transparent rounded border-slate-200 dark:border-slate-700/50 border mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
            type="text"
            name="username"
            id="username"
            placeholder="Username*"
            required
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="email" className="sr-only">
            Email*
          </label>
          <input
            className="bg-transparent rounded border-slate-200 dark:border-slate-700/50 border mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
            type="text"
            name="email"
            id="email"
            placeholder="example@example.com*"
            required
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="password" className="sr-only">
            Password*
          </label>
          <input
            className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
            type="password"
            name="password"
            id="password"
            placeholder="Password*"
            required
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <div className="md:h-0.5 border-t border-slate-200 dark:border-slate-700/50 w-full col-span-2 py-1 mt-2"></div>

        <div className="flex flex-col">
          <label htmlFor="age" className="sr-only">
            Age
          </label>
          <input
            className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            min="0"
            max="120"
            name="age"
            placeholder="Age"
            id="age"
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="sr-only">
            Location
          </label>
          <input
            className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="occupation" className="sr-only">
            Occupation
          </label>
          <input
            className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
            type="text"
            name="occupation"
            id="occupation"
            placeholder="Occupation"
            disabled={(modalState || registerSuccess) && true}
          />
        </div>

        <button
          className={
            "mt-5 rounded px-4 py-3 font-semibold text-sm block mx-auto bg-purplepink w-full hover:bg-darkpurple text-white transition ease-in-out col-span-2" +
            (modalState || registerSuccess || isLoading
              ? "hover:bg-purplepink opacity-50 col-span-2"
              : "")
          }
          type="submit"
          disabled={(modalState || registerSuccess || isLoading) && true}
        >
          {isLoading ? (
            <SpinningCircle text="Creating Account..." />
          ) : (
            "Create Account"
          )}
        </button>
      </form>
      {modalState && (
        <AlertModal
          title="Woops!"
          text={
            isUsernameError
              ? "The chosen username is already in use"
              : isEmailError
              ? "The chosen email is already linked to an existing account"
              : isUsernameInvalid
              ? "The chosen username is not valid, username must not contain spaces"
              : isEmailInvalid
              ? "The chosen email is not valid, please insert a valid email"
              : isPasswordInvalid
              ? "The chosen password is not valid, please insert a password of at least 8 characters"
              : isNameInvalid
              ? "The chosen name is not valid, please insert your first and last name"
              : ""
          }
          handleModal={handleModal}
        />
      )}

      {registerSuccess && (
        <SuccessModal
          title="Successfully Registered!"
          text="You are about to be redirected to the login page"
        />
      )}
      <Link href="/login" className="p-3 text-purplepink hover:underline">
        Return to Login
      </Link>
    </main>
  );
}
