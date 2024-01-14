"use client";

// imports
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { Post } from "@/types";

// component
export default function HomeFeed() {
  // state that serves as a container for home posts
  const [posts, setPosts] = useState<Post[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    getAllPosts();
  }, []);

  // async function that gets posts to populate the home feed
  async function getAllPosts() {
    try {
      let res = await fetch(apiUrl + "posts/", {
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
    <ul className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </ul>
  );
}
