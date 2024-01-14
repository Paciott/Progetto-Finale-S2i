"use client";

// imports
import { IoClose } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";
import { User } from "@/types";
import { FormEvent, useState } from "react";
import SpinningCircle from "./SpinningCircle";
import { useRouter } from "next/navigation";
import { AlertModal } from "./AlertModal";
import { SuccessModal } from "./SuccessModal";

// component
export function UpdateProfileForm({
  user,
  closeForm,
  passToPasswordForm,
}: {
  user: User;
  closeForm: () => void;
  passToPasswordForm: () => void;
}) {
  // serie of states used to track user data in the update from
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [age, setAge] = useState(user.age || "");
  const [location, setLocation] = useState(user.location || "");
  const [occupation, setOccupation] = useState(user.occupation || "");

  // serie of states used to popup a modal based on the type of error
  const [modalState, setModalState] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);

  // router
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // async function that handles logout
  async function handleLogout() {
    try {
      let res = await fetch(apiUrl + "uth/logout/", {
        credentials: "include",
        method: "POST",
      });
      res = await res.json();
      localStorage.clear();
      router.push("/login");
    } catch (e) {
      console.log("An error occurred: \n" + e);
    }
  }

  // async function that handles the update submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // frontend validation
    let username = formData.get("username") as string;
    let email = formData.get("email") as string;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let usernameRegex = /^\S+$/;

    if (!usernameRegex.test(username)) {
      setIsLoading(false);
      setIsUsernameInvalid(true);
      setModalState(true);
      return;
    }
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      setIsEmailInvalid(true);
      setModalState(true);
      return;
    }
    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      setIsLoading(false);
      setIsNameInvalid(true);
      setModalState(true);
      return;
    }

    try {
      let res = await fetch(apiUrl + "users/profile/", {
        mode: "cors",
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.get("firstname"),
          lastName: formData.get("lastname"),
          age: formData.get("age"),
          location: formData.get("location"),
          occupation: formData.get("occupation"),
          username: formData.get("username"),
          email: formData.get("email"),
        }),
      });

      // success or error check via backend
      if (res.status === 200) {
        setIsLoading(false);
        setUpdateSuccess(true);
        setTimeout(() => {
          handleLogout();
          setUpdateSuccess(false);
        }, 4000);
      } else if (res.status === 403) {
        setIsLoading(false);
        setIsUsernameError(true);
        setModalState(true);
      } else if (res.status === 409) {
        setIsLoading(false);
        setIsEmailError(true);
        setModalState(true);
      } else if (res.status === 400) {
        setIsLoading(false);
        setIsNameInvalid(true);
        setModalState(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log("An error occurred: \n" + e);
    }
  }

  return (
    <div className="fixed m-0 p-0 top-0 left-0 w-full h-full bg-slate-500/70 dark:bg-slate-900/70 z-40">
      <div className="absolute m-auto left-0 right-0 top-10 l-3 py-5 px-2 rounded z-10 bg-whiter dark:bg-slate-950 flex flex-col  items-center content-center gap-5 w-10/12 max-w-md max-h-custom-height overflow-y-auto">
        <button onClick={closeForm}>
          <IoClose />
        </button>

        <IoNewspaperSharp className="w-12 h-12" />
        <div className="flex flex-col  items-center content-center gap-3">
          <h2 className="font-bold text-3xl tracking-widest text-center">
            Feel like doing changes uh?{" "}
          </h2>
        </div>
        <form
          className="p-8 w-auto flex flex-col sm:grid sm:grid-cols-2 gap-2 gap-x-4"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="firstname">First Name*</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="text"
              name="firstname"
              id="firstname"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={modalState || updateSuccess}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name*</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="text"
              name="lastname"
              id="lastname"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={modalState || updateSuccess}
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="username">Username*</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="text"
              name="username"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={modalState || updateSuccess}
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="email">Email*</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="text"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={modalState || updateSuccess}
            />
          </div>

          <div className="md:h-0.5 border-t border-slate-200 dark:border-slate-700/50 w-full col-span-2 py-1 mt-2"></div>

          <div className="flex flex-col">
            <label htmlFor="age">Age</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none outline-offset-0 focus:outline-purplepink"
              type="number"
              min="0"
              max="120"
              name="age"
              id="age"
              value={age ? age : ""}
              onChange={(e) => setAge(e.target.valueAsNumber)}
              disabled={modalState || updateSuccess}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location">Location</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={modalState || updateSuccess}
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="occupation">Occupation</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="text"
              name="occupation"
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              disabled={modalState || updateSuccess}
            />
          </div>

          <button
            className={
              "text-purplepink hover:underline" +
              (modalState || updateSuccess || isLoading
                ? "text-purplepink opacity-50"
                : "")
            }
            onClick={(e) => {
              e.preventDefault();
              passToPasswordForm();
            }}
            disabled={modalState || updateSuccess || isLoading}
          >
            Update my password
          </button>
          <button
            className={
              "mt-5 rounded px-4 py-3 font-semibold text-sm block mx-auto bg-purplepink w-full hover:bg-darkpurple text-white transition ease-in-out col-span-2" +
              (modalState || updateSuccess || isLoading
                ? "hover:bg-purplepink opacity-50 col-span-2"
                : "")
            }
            type="submit"
            disabled={modalState || updateSuccess || isLoading}
          >
            {isLoading ? (
              <SpinningCircle text="Updating Profile..." />
            ) : (
              "Update Profile"
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
                : isNameInvalid
                ? "The chosen name is not valid, please insert your first and last name"
                : ""
            }
            handleModal={() => {
              setModalState(false);
              setIsUsernameError(false);
              setIsEmailError(false);
              setIsUsernameInvalid(false);
              setIsEmailInvalid(false);
              setIsNameInvalid(false);
            }}
          />
        )}
        {updateSuccess && (
          <SuccessModal
            title="Profile successfully updated!"
            text="You are about to be redirected to the login page, please login again"
          />
        )}
      </div>
    </div>
  );
}
