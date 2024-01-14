"use client";

// imports
import { ChangeEventHandler, FormEvent } from "react";

// component
export function UpdatePostForm({
  handleSubmit,
  isErrorOnPostUpdate,
  titleContent,
  setTitleContent,
  postContent,
  setPostContent,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isErrorOnPostUpdate: boolean;
  titleContent: string;
  setTitleContent: ChangeEventHandler<HTMLInputElement> | undefined;
  postContent: string;
  setPostContent: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}) {
  return (
    <section className="flex flex-col items-center justify-center border-b-2 border-b-slate-200 dark:border-b-slate-800 dark:bg-slate-900/30">
      {" "}
      <p className="text-sm py-2">Edit your post:</p>
      <form
        className="flex flex-col items-center justify-evenly"
        onSubmit={handleSubmit}
      >
        <label htmlFor="post_title" className="font-bold">
          Title
        </label>
        <input
          autoFocus
          type="text"
          className={
            "rounded bg-slate-300/30 dark:bg-slate-800/30 m-2 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink max-h-20" +
            (isErrorOnPostUpdate ? " mb-0" : "")
          }
          name="post_title"
          id="post_title"
          placeholder={"Write the new title..."}
          required
          value={titleContent}
          onChange={setTitleContent}
        />

        <label htmlFor="post_content" className="font-bold">
          Comment
        </label>
        <textarea
          className={
            "rounded bg-slate-300/30 dark:bg-slate-800/30 m-2 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink max-h-20" +
            (isErrorOnPostUpdate ? " mb-0" : "")
          }
          name="post_content"
          id="post_content"
          placeholder={"Write the new content..."}
          required
          value={postContent}
          onChange={setPostContent}
        />

        <button
          type="submit"
          className="p-2 pb-1 mb-1 rounded bg-purplepink w-full hover:bg-darkpurple h-fit text-center"
        >
          Edit
        </button>
      </form>
      {isErrorOnPostUpdate && (
        <span className="flex text-red-500 ms-3 mb-4 text-sm">
          please write the new title and content before submitting
        </span>
      )}
    </section>
  );
}
