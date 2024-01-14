"use client";

// imports
import { BiSolidUserRectangle } from "react-icons/bi";
import { TiHeartOutline } from "react-icons/ti";
import { GoCommentDiscussion } from "react-icons/go";
import { Post } from "@/types";
import Comment from "@/components/CommentCard";
import { FormEvent, useEffect, useState } from "react";
import { TbDotsVertical, TbSend } from "react-icons/tb";
import SpinningCircle from "./SpinningCircle";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { UpdatePostForm } from "./UpdatePostForm";

export default function PostCard({ post }: { post: Post }) {
  // state to toggle the comment section
  const [showComments, setShowComments] = useState(false);
  // state that tracks the comment written in the comment input located in the comment section
  const [commentContent, setCommentContent] = useState("");
  // state that changes the button content to a loader
  const [isLoading, setIsLoading] = useState(false);
  // state to track if there is a error while submitting an invalid comment under a post
  const [isError, setIsError] = useState(false);
  // state to track if there is a error while submitting an invalid title or comment while updating a post
  const [isErrorOnPostUpdate, setIsErrorOnPostUpdate] = useState(false);
  // state that is used to display a post's comments
  const [comments, setComments] = useState<any[]>(post.comments);
  // state that tracks if a comment is liked by the logged in user
  const [isLiked, setIsLiked] = useState(false);
  // state used for update the number of likes of a post
  const [likesNum, setLikesNum] = useState(Object.keys(post.likes).length);
  // state used to toggle the 'delete comment' and 'update comment' buttons
  const [options, setOptions] = useState(false);
  // state used to popup the 'update post' form
  const [isEditing, setIsEditing] = useState(false);
  // state used to delete a post from the UI
  const [isDeletedPost, setIsDeletedPost] = useState(false);
  // states used to track title and content of a post for post updates
  const [postTitle, setPostTitle] = useState(post.title);
  const [postContent, setPostContent] = useState(post.content);

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // date of post from last update, formatted
  let date = new Date(post.updatedAt);
  let formattedDate = date.toLocaleDateString("it-IT");
  // date of post creation, formatted
  let initialDate = new Date(post.createdAt);
  let initialFormattedDate = initialDate.toLocaleDateString("it-IT");
  // user data from local storage
  let user = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
    for (let id in post.likes) {
      if (id === user._id) {
        setIsLiked(true);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  // function to open the comment section
  function toggleComments() {
    setShowComments((prev) => !prev);
  }

  // function to leave o remove like on a post UI
  function handleIsLiked() {
    setIsLiked((prev) => !prev);
  }

  // function to handle errors occurring while writing a comment in the comment section of a post
  function handleisError() {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  }

  // function to handle errors occurring while updating a post
  function handlesetisErrorOnPostUpdate() {
    setIsErrorOnPostUpdate(true);
    setTimeout(() => {
      setIsErrorOnPostUpdate(false);
    }, 3000);
  }

  // function to handle the popup of the 'delete post' and the 'update post' buttons
  function handleClick() {
    setOptions((prev) => !prev);
    setIsEditing(false);
  }

  // function that opens the editing dots
  function handleIsEditing() {
    setIsEditing((prev) => !prev);
  }

  // async function that fetches a post's comments from DB
  async function loadComments() {
    try {
      let res = await fetch(apiUrl + "posts/comments/" + post._id, {
        mode: "cors",
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200 || res.status === 404) {
        let comments = await res.json();
        setComments(comments);
      } else {
        console.log("error!");
      }
    } catch (e) {
      console.log("An error occurred: \n" + e);
    }
  }

  // async function that handles the liking of a post
  async function toggleLike(counter: number) {
    try {
      let res = await fetch(apiUrl + "posts/" + post._id, {
        mode: "cors",
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      if (res.status === 200) {
        handleIsLiked();
        isLiked ? setLikesNum(counter - 1) : setLikesNum(counter + 1);
      } else {
        console.log("errore!");
      }
    } catch (e) {
      console.log("An error occurred: \n" + e);
    }
  }

  // async function that handles the delete of a post
  async function handleDeletePost() {
    try {
      let res = await fetch(apiUrl + "posts/" + post._id, {
        mode: "cors",
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      if (res.status === 200) {
        setIsDeletedPost(true);
      } else {
        console.log("error!");
      }
    } catch (e) {
      console.log("An error occurred: \n" + e);
    }
  }

  // function that handles the submit of the comment written under a post
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const commentContent = formData.get("comment_content") as string;

    if (commentContent.trim().length === 0) {
      setIsLoading(false);
      setCommentContent("");
      handleisError();
      return;
    }

    try {
      let res = await fetch(apiUrl + "posts/comments/" + post._id, {
        mode: "cors",
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          content: formData.get("comment_content"),
        }),
      });
      if (res.status === 200) {
        setIsLoading(false);
        setCommentContent("");
        await loadComments();
      }
      if (res.status === 400) {
        setIsLoading(false);
        setCommentContent("");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } catch (e) {
      setIsLoading(false);
      console.log("An error occurred: \n" + e);
    }
  }

  // async function that handles the post update submit
  async function handlePostUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let content = formData.get("post_content") as string;
    let title = formData.get("post_title") as string;

    if (title.trim().length === 0) {
      setIsLoading(false);
      setPostTitle("");
      handlesetisErrorOnPostUpdate();
      return;
    }

    if (content.trim().length === 0) {
      setIsLoading(false);
      setPostContent("");
      handlesetisErrorOnPostUpdate();
      return;
    }

    try {
      let res = await fetch(apiUrl + "posts/update/" + post._id, {
        mode: "cors",
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          content: formData.get("post_content"),
          title: formData.get("post_title"),
        }),
      });
      if (res.status === 200) {
        console.log("success");
        window.location.reload();
      } else {
        console.log("errore!");
      }
    } catch (error) {}
  }

  return (
    <li
      className={
        "rounded border p-5 flex flex-col gap-3 hover:cursor-pointer border-slate-200 dark:border-slate-700/50 hover:shadow " +
        (isDeletedPost ? " hidden" : "")
      }
    >
      <div className="flex flex-row justify-between">
        <div>
          <div className="flex flex-row items-center content-center gap-1 text-slate-800 dark:text-slate-400">
            <BiSolidUserRectangle className="w-6 h-6" />
            <span className="text-sm">@{post.username}</span>
          </div>

          <section className="flex flex-col w-full max-w-xl gap-2">
            <h3 className="text-md font-bold">{post.title}</h3>
            <p>{post.content}</p>
            <small className="text-slate-800 dark:text-slate-400 mt-1">
              {date > initialDate
                ? "modified - " + formattedDate
                : initialFormattedDate}
            </small>
          </section>
        </div>

        {user._id === post.userId ? (
          <div className="self-start">
            {!options ? (
              <button
                className="block rounded hover:bg-slate-300 hover:dark:bg-slate-800 p-1 transition ease-in-out"
                onClick={handleClick}
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
                  onClick={handleDeletePost}
                >
                  <MdDeleteForever className="w-5 h-5 hover:text-red-500" />
                </button>{" "}
                <button
                  className={
                    "self-start block rounded hover:bg-slate-300 hover:dark:bg-slate-800 p-1 " +
                    (options ? "bg-slate-300 dark:bg-slate-800" : "")
                  }
                  onClick={handleClick}
                >
                  <TbDotsVertical className="w-5 h-5 text-slate-800 dark:text-slate-400 " />
                </button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      {isEditing && (
        <UpdatePostForm
          handleSubmit={(e: FormEvent<HTMLFormElement>) => {
            handlePostUpdate(e);
          }}
          isErrorOnPostUpdate={isErrorOnPostUpdate}
          titleContent={postTitle}
          setTitleContent={(e) => setPostTitle(e.target.value)}
          postContent={postContent}
          setPostContent={(e) => setPostContent(e.target.value)}
        />
      )}

      <div className="md:h-0.5 border-t w-full max-w-2xl py-1 mt-2 border-slate-200 dark:border-slate-700/50"></div>

      <section className="flex text-center items-center justify-evenly gap-1">
        <button
          className={
            (isLiked ? "text-red-500 " : "") +
            " flex text-center items-center gap-1 hover:text-red-500 p-2 rounded-full hover:bg-red-600/10 transition ease-in-out"
          }
          onClick={(e) => {
            e.preventDefault();
            toggleLike(likesNum);
          }}
        >
          <TiHeartOutline />
          <span>{likesNum}</span>
        </button>
        <button
          onClick={toggleComments}
          className={
            (showComments ? "bg-slate-600/10 " : "") +
            "flex text-center items-center gap-1 p-2 rounded-full hover:bg-slate-600/10 transition ease-in-out"
          }
        >
          <span>
            <GoCommentDiscussion />
          </span>
          <span>{comments.length || 0}</span>
        </button>
      </section>
      {showComments && (
        <section>
          <form
            className="flex flex-row items-center justify-center gap-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label htmlFor="comment_content" className="sr-only">
              {" "}
              Comment
            </label>
            <input
              className={
                "rounded-lg bg-slate-200/30 dark:bg-slate-900/30 p-2 my-4 w-full" +
                (isError ? " mb-0" : "")
              }
              type="text"
              name="comment_content"
              id="comment_content"
              placeholder={"Leave a comment for @" + post.username + "..."}
              required
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 pb-1 rounded bg-slate-200/30 dark:bg-slate-900/30 text-slate-800 dark:text-slate-400 h-fit text-center"
            >
              {isLoading ? (
                <SpinningCircle text="" />
              ) : (
                <TbSend className="w-5 h-5 hover:text-purplepink transition ease-in-out" />
              )}
            </button>
          </form>
          {isError && (
            <p className="flex text-red-500 ms-3 mb-4">
              please write something before submitting
            </p>
          )}
          <ul className="rounded bg-slate-200/30 dark:bg-slate-900/30">
            {" "}
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  post={post}
                  loadComments={loadComments}
                  refresh={() => loadComments()}
                />
              ))
            ) : (
              <li className="flex items-center justify-center py-4 text-slate-800 dark:text-slate-400">
                No one commented yet.
              </li>
            )}
          </ul>
        </section>
      )}
    </li>
  );
}
