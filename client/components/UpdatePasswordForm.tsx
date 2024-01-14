"use client";

// imports
import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
import { AlertModal } from "./AlertModal";
import { useRouter } from "next/navigation";
import { SuccessModal } from "./SuccessModal";
import SpinningCircle from "./SpinningCircle";

// component
export function UpdatePasswordForm({ closeForm }: { closeForm: () => void }) {
  // state to control loader
  const [isLoading, setIsLoading] = useState(false);
  // states to popup modal based on different errors
  const [modalState, setModalState] = useState(false);
  const [isNoMatch, setIsNoMatch] = useState(false);
  const [isNewPswInvalid, setisNewPswInvalid] = useState(false);
  const [isOldPswInvalid, setisOldPswInvalid] = useState(false);
  // state to control success modal
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // router
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // async function that handles logout
  async function handleLogout() {
    try {
      let res = await fetch(apiUrl + "auth/logout/", {
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

  // async function that handles the update password submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let newPassword = formData.get("new_password") as string;
    let repeatNewPassword = formData.get("repeat_new_password") as string;

    // frontend validation
    if (newPassword.trim().length < 8) {
      setIsLoading(false);
      setisNewPswInvalid(true);
      setModalState(true);
      return;
    }
    if (newPassword !== repeatNewPassword) {
      setIsLoading(false);
      setIsNoMatch(true);
      setModalState(true);
      return;
    }

    try {
      let res = await fetch(apiUrl + "users/profile/psw", {
        mode: "cors",
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: formData.get("old_password"),
          password: formData.get("new_password"),
        }),
      });
      // success or error check via backend
      if (res.status === 200) {
        setIsLoading(false);
        setUpdateSuccess(true);
        setTimeout(() => {
          handleLogout();
          setUpdateSuccess(false);
        }, 5000);
      } else if (res.status === 401) {
        setIsLoading(false);
        setisOldPswInvalid(true);
        setModalState(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log("An error occurred: \n" + e);
    }
  }

  return (
    <div className="fixed m-0 p-0 top-0 left-0 w-full h-full bg-slate-500/70 dark:bg-slate-900/70 z-40">
      <div className="absolute m-auto left-0 right-0 top-10 z-40 l-3 p-9 rounded bg-white dark:bg-slate-950 flex flex-col  items-center content-center gap-5 w-10/12 max-w-md">
        <button onClick={closeForm}>
          <IoClose />
        </button>
        <FaKey className="w-12 h-12" />
        <div className="flex flex-col  items-center content-center gap-3">
          <h2 className="font-bold text-3xl tracking-widest text-center">
            Safety is the priority
          </h2>
        </div>
        <form
          className="p-8 w-auto flex flex-col gap-2 md:p-1"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="old_password">Current Password</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="password"
              name="old_password"
              id="old_password"
              required
              disabled={modalState || updateSuccess}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="new_password">New Password</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="password"
              name="new_password"
              id="new_password"
              required
              disabled={modalState || updateSuccess}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="repeat_new_password">Repeat New Password</label>
            <input
              className="bg-transparent rounded border border-slate-200 dark:border-slate-700/50 mb-3 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink"
              type="password"
              name="repeat_new_password"
              id="repeat_new_password"
              required
              disabled={modalState || updateSuccess}
            />
          </div>

          <button
            className={
              "mt-5 rounded px-4 py-3 font-semibold text-sm block mx-auto bg-purplepink w-full hover:bg-darkpurple text-white transition ease-in-out col-span-2" +
              (modalState || updateSuccess || isLoading
                ? "hover:bg-purplepink opacity-50 col-span-2"
                : "")
            }
          >
            {isLoading ? (
              <SpinningCircle text="Updating Password..." />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
        {modalState && (
          <AlertModal
            title="Woops!"
            text={
              isNoMatch
                ? "New Password hasn't been repeted correctly"
                : isNewPswInvalid
                ? "The new password is invalid"
                : isOldPswInvalid
                ? "The old password isn't correct"
                : ""
            }
            handleModal={() => {
              setModalState(false);
              setIsNoMatch(false);
              setisNewPswInvalid(false);
              setisOldPswInvalid(false);
              setUpdateSuccess(false);
            }}
          />
        )}
        {updateSuccess && (
          <SuccessModal
            title="Password successfully updated!"
            text="You are about to be redirected to the login page, please login again"
          />
        )}
      </div>
    </div>
  );
}
