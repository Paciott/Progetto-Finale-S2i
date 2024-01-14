"use client";

// imports
import { Comment, Post } from "@/types";
import { FormEvent, useState } from "react";
import { BiSolidUserRectangle } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { TbDotsVertical } from "react-icons/tb";
import { UpdateCommentForm } from "./UpdateCommentForm";

// component
export default function Comment({
  comment,
  post,
  loadComments,
  refresh,
}: {
  comment: Comment;
  post: Post;
  loadComments: () => void;
  refresh: () => Promise<void>;
}) {
  // state that toggles 'delete comment' and 'update comment' buttons
  const [options, setOptions] = useState(false);
  // state used to remove from screen the deleted comment (for UX, the comment is actually deleted from backend via api)
  const [isDeletedComment, setIsDeletedComment] = useState(false);
  // state that controls the popup of the 'update comment' form
  const [isEditing, setIsEditing] = useState(false);
  // state that tracks the comment content to let the user modify it
  const [commentContent, setCommentContent] = useState(comment.content);
  // state that pops up errors in the 'update comment' form
  const [isError, setIsError] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // date of comment creation, formatted
  let initialDate = new Date(comment.createdAt);
  let initialDateFormatted = initialDate.toLocaleDateString("it-IT");

  // date of comment update, formatted
  let date = new Date(comment.updatedAt);
  let formattedDate = date.toLocaleDateString("it-IT");

  // fetch user data from local storage
  let user = JSON.parse(localStorage.getItem("user") || "");

  // function that controls the popup of 'delete comment' and 'update comment' buttons
  function handleOptionsDisplay() {
    setOptions((prev) => !prev);
    setIsEditing(false);
  }

  // function that controls the popup of the 'update comment' form
  function handleIsEditing() {
    setIsEditing((prev) => !prev);
    setCommentContent(comment.content);
  }

  // function that controls the display of the error message of the 'update comment' form
  function handleisError() {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }

  // async function that deletes the comment on DB
  async function handleDeleteComment() {
    try {
      let res = await fetch(apiUrl + "comments/" + comment._id, {
        mode: "cors",
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          postId: post._id,
        }),
      });

      if (res.status === 200) {
        setIsDeletedComment(true);
        loadComments();
      } else {
        console.log("error!");
      }
    } catch (e) {
      console.log("An error occurred: \n" + e);
    }
  }

  // async function that updates the existing comment on DB
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let comment_content = formData.get("comment_content") as string;

    if (comment_content.trim().length === 0) {
      handleisError();
      return;
    }
    handleIsEditing();
    handleOptionsDisplay();
    try {
      let res = await fetch(apiUrl + "comments/" + comment._id, {
        mode: "cors",
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          postId: post._id,
          comment_content: formData.get("comment_content"),
        }),
      });
      if (res.status === 200) {
        refresh();
      } else {
        console.log("errore!");
      }
    } catch (error) {}
  }

  return (
    <li>
      <article
        className={
          isDeletedComment
            ? "hidden"
            : "block" +
              "bg-slate-200/30 dark:bg-slate-900/30 p-4 flex flex-row items-center justify-between " +
              (isEditing
                ? "border-b-2 border-b-slate-200 dark:border-b-slate-800"
                : "")
        }
      >
        <section className="flex flex-col gap-1">
          <div className="flex flex-row items-center content-center gap-1 text-slate-800 dark:text-slate-400">
            <BiSolidUserRectangle className="w-6 h-6" />
            <span className="text-sm">@{comment.creatorUsername}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <small className="text-xs text-slate-800 dark:text-slate-400 mt-1">
            {initialDate < date
              ? "modified - " + formattedDate
              : initialDateFormatted}
          </small>
        </section>
        {user._id === comment.userId ? (
          <div className="self-start">
            {!options ? (
              <button
                className="block rounded hover:bg-slate-300 hover:dark:bg-slate-800 p-1 transition ease-in-out"
                onClick={handleOptionsDisplay}
              >
                <TbDotsVertical className="w-5 h-5 text-slate-800 dark:text-slate-400 " />
              </button>
            ) : (
              <div className="flex flex-col-reverse gap-1 items-center justify-center">
                <button
                  className={
                    "rounded hover:bg-slate-300 hover:dark:bg-slate-800 p-1 transition ease-in-out " +
                    (isEditing ? " bg-slate-300 dark:bg-slate-800" : "")
                  }
                  onClick={handleIsEditing}
                >
                  <FiEdit3 className="w-4 h-4 text-slate-800 dark:text-slate-400" />
                </button>{" "}
                <button
                  className="rounded hover:bg-red-600/10 text-slate-800 dark:text-slate-400 p-1 transition ease-in-out"
                  onClick={handleDeleteComment}
                >
                  <MdDeleteForever className="w-5 h-5 hover:text-red-500" />
                </button>{" "}
                <button
                  className={
                    "self-start block rounded hover:bg-slate-300 hover:dark:bg-slate-800 p-1 " +
                    (options ? "bg-slate-300 dark:bg-slate-800" : "")
                  }
                  onClick={handleOptionsDisplay}
                >
                  <TbDotsVertical className="w-5 h-5 text-slate-800 dark:text-slate-400 " />
                </button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </article>
      {isEditing && (
        <UpdateCommentForm
          handleSubmit={(e: FormEvent<HTMLFormElement>) => {
            handleSubmit(e);
          }}
          isError={isError}
          commentContent={commentContent}
          setCommentContent={(e) => setCommentContent(e.target.value)}
        />
      )}
    </li>
  );
}
