"use client";

// import
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BurgerNav from "./BurgerNav";
import PostForm from "./CreatePostForm";

// component
export default function Burger({
  isPostingFromProfileSection,
}: {
  isPostingFromProfileSection: boolean;
}) {
  // state to edit component if the burger is active
  const [isActive, setIsActive] = useState(false);
  // state to popup the form for create a new post
  const [isPosting, setIsPosting] = useState(false);
  // state for using data from local storage
  const [user, setUser] = useState("");
  // router
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      setUser(user.username);
    }
  }, []);

  // function that toggles the burger menu
  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  // function that logs out the current user
  async function handleLogout() {
    try {
      let res = await fetch(apiUrl + "auth/logout/", {
        credentials: "include",
        method: "POST",
      });

      res = await res.json();
      // clear local storage
      setUser("");
      localStorage.clear();
      // redirect to login
      router.push("/login");
    } catch (e) {
      console.log("An error occurred: \n" + e);
    }
  }

  return (
    <div>
      {isPosting && <PostForm closeForm={() => setIsPosting(false)} />}
      <div className="flex flex-col max-w-sm p-2 gap-3">
        <h2 className="text-xl font-bold mb-3 text-center sm:text-left">
          <span className="block">Hi there!</span>Welcome back{" "}
          <span className="text-purplepink">@{user}</span>
        </h2>
        <div className="block text-center sm:hidden">
          <button
            onClick={toggleMenu}
            className={
              (isActive ? "text-purplepink" : "") + " border rounded w-min"
            }
          >
            <FaBars className="w-12 h-12 p-2" />
          </button>
          {isActive && (
            <BurgerNav
              isPostingFromProfileSection={isPostingFromProfileSection}
              logout={handleLogout}
              setIsPosting={() => setIsPosting(true)}
            />
          )}
        </div>
        <div className="hidden sm:block">
          <BurgerNav
            isPostingFromProfileSection={isPostingFromProfileSection}
            logout={handleLogout}
            setIsPosting={() => setIsPosting(true)}
          />
        </div>
      </div>
    </div>
  );
}
