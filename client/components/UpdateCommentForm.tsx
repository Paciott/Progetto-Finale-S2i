"use client";

// imports
import { ChangeEventHandler, FormEvent } from "react";
import { TbSend } from "react-icons/tb";

// component
export function UpdateCommentForm({
  handleSubmit,
  isError,
  commentContent,
  setCommentContent,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isError: boolean;
  commentContent: string;
  setCommentContent: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}) {
  return (
    <section className="flex flex-col items-center justify-center border-b-2 border-b-slate-200 dark:border-b-slate-800 dark:bg-slate-900/30">
      {" "}
      <p className="text-sm pt-2">Edit your comment:</p>
      <form
        className="flex items-center justify-evenly"
        onSubmit={handleSubmit}
      >
        <label htmlFor="comment_content" className="sr-only">
          Write the modified comment
        </label>
        <textarea
          autoFocus
          className={
            "rounded bg-slate-300/30 dark:bg-slate-800/30 m-2 p-1 w-full outline-none outline-offset-0 focus:outline-purplepink max-h-20" +
            (isError ? " mb-0" : "")
          }
          name="comment_content"
          id="comment_content"
          placeholder={"Write the new content..."}
          required
          value={commentContent}
          onChange={setCommentContent}
        />
        <button
          type="submit"
          className="p-2 pb-1 rounded bg-slate-200/30 dark:bg-slate-900/30 h-fit text-center"
        >
          <TbSend className="w-4 h-4 hover:text-purplepink transition ease-out" />
        </button>
      </form>
      {isError && (
        <span className="flex text-red-500 ms-3 mb-4 text-sm">
          please write something before submitting
        </span>
      )}
    </section>
  );
}
