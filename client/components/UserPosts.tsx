"use client";

// imports
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { Post } from "@/types";

// component
export default function UserPosts({
  user_id,
  setIsPostingFromComments,
}: {
  user_id: string;
  setIsPostingFromComments: () => void;
}) {
  // state used to fetch user data from local storage
  const [posts, setPosts] = useState<Post[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    getUserPosts(user_id);
  }, [user_id]);

  // function that fetches the logged user's posts from DB
  async function getUserPosts(user_id: string) {
    try {
      let res = await fetch(apiUrl + "posts/" + user_id, {
        mode: "cors",
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        let posts = await res.json();
        setPosts(posts);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ul className="flex flex-col w-full max-w-lg gap-3">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p>
          You haven&apos;t posted on Circle yet, let&apos;s go,{" "}
          <button
            className="text-purplepink hover:cursor-pointer hover:underline"
            onClick={setIsPostingFromComments}
          >
            post your toughts
          </button>
        </p>
      )}
    </ul>
  );
}
