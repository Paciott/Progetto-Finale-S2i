"use client";

// imports
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { FaUserLarge } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";

// component
export default function BurgerNav({
  logout,
  setIsPosting,
  isPostingFromProfileSection,
}: {
  logout: () => void;
  setIsPosting: () => void;
  isPostingFromProfileSection: boolean;
}) {
  return (
    <div>
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            href="/"
            className="hover:text-purplepink text-start font-semibold text-md flex items-center justify-start gap-3 transition ease-in-out"
          >
            <GoHomeFill className="w-5 h-5" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/user"
            className="hover:text-purplepink text-start font-semibold text-md flex items-center justify-start gap-3 transition ease-in-out"
          >
            <FaUserLarge className="w-5 h-5" />
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={() => logout()}
            className="hover:text-purplepink text-start font-semibold text-md flex items-center justify-start gap-3 transition ease-in-out"
          >
            <RiLogoutBoxLine className="w-5 h-5" />
            Log Out
          </button>
        </li>
      </ul>
      <button
        className={
          "mt-5 rounded px-3 py-2 font-semibold block bg-purplepink w-content hover:bg-darkpurple text-white transition ease-in-out col-span-2 text-md" +
          (isPostingFromProfileSection ? " opacity-50" : "")
        }
        disabled={isPostingFromProfileSection}
        type="submit"
        onClick={setIsPosting}
      >
        Post Your Thoughts
      </button>
    </div>
  );
}
