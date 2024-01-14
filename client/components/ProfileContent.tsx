"use client";

// imports
import { BiSolidUserRectangle } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { MdDateRange, MdOutlineWork } from "react-icons/md";
import Burger from "@/components/Burger";
import { useEffect, useState } from "react";
import { User } from "@/types";
import UserPosts from "@/components/UserPosts";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import PostForm from "./CreatePostForm";

export default function ProfileContent() {
  // state to take user from local storage
  const [user, setUser] = useState({} as User);
  // state to control the update profile form
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  // state to control the update password form
  const [isOpenPasswordForm, setIsOpenPasswordForm] = useState(false);
  // state to disable the 'post your toughts' button in the burger if user is posting from profile section, to prevent double form popup
  const [isPostingFromProfileSection, setIsPostingFromProfileSection] =
    useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      setUser(user);
    }
  }, []);

  // function that handles the update profile form
  const handleClick = () => {
    setIsOpenUpdate(true);
  };

  // function that handles the update password form
  const handleOpenPasswordForm = () => {
    setIsOpenUpdate(false);
    setIsOpenPasswordForm(true);
  };

  return (
    <main>
      {isPostingFromProfileSection && (
        <PostForm closeForm={() => setIsPostingFromProfileSection(false)} />
      )}
      {isOpenUpdate && (
        <UpdateProfileForm
          user={user}
          closeForm={() => setIsOpenUpdate(false)}
          passToPasswordForm={() => handleOpenPasswordForm()}
        />
      )}
      {isOpenPasswordForm && (
        <UpdatePasswordForm closeForm={() => setIsOpenPasswordForm(false)} />
      )}
      <section className="grid grid-cols-1 md:grid-cols-3 items-start p-6">
        <div className="col-span-1 flex flex-col items-center justify-center p-3 sm:block">
          <Burger isPostingFromProfileSection={isPostingFromProfileSection} />
        </div>

        <div className="m-3 flex flex-col items-center justify-center md:col-span-2">
          <BiSolidUserRectangle className="z-10 w-14 h-14 top-5 sm:w-24 sm:h-24 relative sm:top-7" />
          <div className="rounded border border-slate-200 dark:border-slate-700/50 p-5 flex flex-col items-start justify-center gap-3 pt-10 m-2 sm:gap-6 sm:items-start w-9/12 sm:w-full sm:max-w-md">
            <section className="flex flex-col gap-1">
              <h2 className="flex flex-wrap text-2xl font-bold">
                {user.firstName + " " + user.lastName}
              </h2>
              <span className="text-slate-800 dark:text-slate-400">
                {"@" + user.username}
              </span>
            </section>

            <section className="flex flex-col gap-2 sm:flex-row justify-evenly sm:gap-7">
              <div className="flex flex-row justify-start items-center gap-1">
                <ImLocation className="text-slate-800 dark:text-slate-400" />{" "}
                {user.location ? user.location : "No Location"}
              </div>
              <div className="flex flex-row justify-start items-center gap-1">
                <MdDateRange className="text-slate-800 dark:text-slate-400" />{" "}
                {user.age ? user.age : "-"}
              </div>
              <div className="flex flex-row justify-start items-center gap-1">
                <MdOutlineWork className="text-slate-800 dark:text-slate-400" />{" "}
                {user.occupation ? user.occupation : "No job"}
              </div>
            </section>
            <button
              className={
                "mt-5 rounded px-3 py-2 font-semibold text-sm block mx-auto bg-purplepink w-full hover:bg-darkpurple text-white transition ease-in-out" +
                (isOpenPasswordForm
                  ? "hover:bg-purplepink opacity-50 col-span-2"
                  : "")
              }
              onClick={handleClick}
              disabled={isOpenPasswordForm}
            >
              Update profile
            </button>
          </div>
        </div>
      </section>

      <div className="md:h-0.5 border-t border-slate-200 dark:border-slate-700/50 w-full py-3 mt-5"></div>

      <section className="p-5 flex flex-col items-center justify-center gap-3 pt-5 m-2 sm:gap-10 col-span-3">
        <h3 className="font-semibold text-purplepink text-lg">
          Your Circle Posts
        </h3>
        <UserPosts
          user_id={user._id}
          setIsPostingFromComments={() => setIsPostingFromProfileSection(true)}
        />
      </section>
    </main>
  );
}
