"use client";

// imports
import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { SiWechat } from "react-icons/si";
import SpinningCircle from "./SpinningCircle";
import { SuccessModal } from "./SuccessModal";
import { useRouter } from "next/navigation";

// component
export default function PostForm({ closeForm }: { closeForm: () => void }) {
  // state to change content of the submit button to a loader
  const [isLoading, setIsLoading] = useState(false);
  // states to track type of error for custom error message to user
  const [isTitleError, setIsTitleError] = useState(false);
  const [isContentError, setIsContentError] = useState(false);
  // state that tracks if the creation of a post went successfully, for UI
  const [isSuccess, setIsSuccess] = useState(false);
  // fetch user data from local storage
  let user = JSON.parse(localStorage.getItem("user") || "");
  // router
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // function that handles errors in the title field of the 'create post' form
  function handleisTitleError() {
    setIsLoading(false);
    setIsTitleError(true);
    setTimeout(() => {
      setIsTitleError(false);
    }, 3000);
  }

  // function that handles errors in the content field of the 'create post' form
  function handleisContentError() {
    setIsLoading(false);
    setIsContentError(true);
    setTimeout(() => {
      setIsContentError(false);
    }, 3000);
  }

  // function that handles the creation of the new post on the UI
  function handleIsSuccess() {
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/");
      setIsSuccess(false);
      closeForm();
      window.location.reload();
    }, 3000);
  }

  // async function that creates a new post on DB
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let post_title = formData.get("post_title") as string;
    let post_content = formData.get("post_content") as string;

    // frontend controls for errors
    if (post_title.trim().length === 0) {
      handleisTitleError();
      return;
    }
    if (post_content.trim().length === 0) {
      handleisContentError();
      return;
    }

    try {
      let res = await fetch(apiUrl + "posts/createPost", {
        mode: "cors",
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          title: formData.get("post_title"),
          content: formData.get("post_content"),
        }),
      });

      if (res.status === 201) {
        handleIsSuccess();
      } else {
        setIsLoading(false);
        console.log("errore!");
      }
    } catch (e) {
      setIsLoading(false);
      console.log("An error occurred: \n" + e);
    }
  }

  return (
    <div className="fixed m-0 p-0 top-0 left-0 w-full h-full bg-slate-500/70 dark:bg-slate-900/70 z-40">
      <div className="absolute m-auto left-0 right-0 bottom-36 l-3 py-6 px-5 rounded bg-whiter dark:bg-slate-950 flex flex-col  items-center content-center gap-7 w-10/12 max-w-5xl">
        <button onClick={closeForm}>
          <IoClose />
        </button>
        <SiWechat className="w-12 h-12" />
        <div className="flex flex-col  items-center content-center gap-3">
          <h2 className="font-bold text-3xl tracking-widest text-start p-2">
            Let the world know what you are thinking about.
          </h2>
        </div>
        <form
          className="flex flex-col items-start justify-center gap-2 p-4 w-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="post_title" className="sr-only">
            {" "}
            Post title
          </label>
          <input
            className={
              "rounded-lg bg-inherit dark:bg-inherit border border-slate-200 dark:border-slate-700/50 p-2 my-4 w-full h-14 font-bold text-xl outline-none outline-offset-0 focus:outline-purplepink" +
              (isTitleError ? " mb-0" : "")
            }
            type="text"
            name="post_title"
            id="post_title"
            placeholder={"Title..."}
            required
          />
          {isTitleError && (
            <span className="flex text-red-500 ms-3 mb-4 text-sm">
              You can&apos;t create a post without a title!
            </span>
          )}

          <label htmlFor="post_content" className="sr-only">
            {" "}
            Post Content
          </label>
          <textarea
            className={
              "rounded-lg bg-inherit dark:bg-inherit border border-slate-200 dark:border-slate-700/50 p-2 my-4 w-full outline-none outline-offset-0 focus:outline-purplepink h-20 max-h-40" +
              (isContentError ? " mb-0" : "")
            }
            name="post_content"
            id="post_content"
            placeholder={"Content..."}
            required
          />
          {isContentError && (
            <span className="flex text-red-500 ms-3 mb-4 text-sm">
              You can&apos;t create a post without content!
            </span>
          )}
          <button
            className={
              "mt-5 rounded px-3 py-2 font-semibold text-sm block mx-auto bg-purplepink w-fit hover:bg-darkpurple text-white transition ease-in-out"
            }
            type="submit"
          >
            {isLoading ? (
              <SpinningCircle text="Posting..." />
            ) : (
              "Send on the Circle"
            )}
          </button>
        </form>
      </div>
      {isSuccess && <SuccessModal title="Post created!" text="" />}
    </div>
  );
}
