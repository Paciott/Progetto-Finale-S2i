"use client";

// imports
import { GiCircleClaws } from "react-icons/gi";
import LoginForm from "@/components/LoginForm";
import { AlertModal } from "./AlertModal";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";

// component
export default function LoginContent() {
  // state to control the popup of the error modal
  const [modalState, setModalState] = useState(false);
  // state to change the submit button content to a loader
  const [isLoading, setIsLoading] = useState(false);
  // get user from local storage
  const [user, setUser] = useState<string | undefined>(undefined);
  // router
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    let userJson = localStorage.getItem("user");
    if (typeof userJson === "string") {
      let user: User = JSON.parse(userJson);
      setUser(user.email);
      router.push("/");
    }
  }, [router]);

  // async function that handles the user's login
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      let res = await fetch(apiUrl + "auth/login/", {
        mode: "cors",
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (res.status === 200) {
        setIsLoading(false);
        const data = (await res.json()) as { message: string; user: User };
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user.email);
        router.push("/");
      } else {
        setIsLoading(false);
        setModalState(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log("An error occurred: \n" + e);
    }
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center max-w-2xl m-auto my-10 p-3">
      <h1 className="text-4xl md:text-7xl max-w-md font-bold p-4 md:p-2">
        Enter your social <span className="text-purplepink">Circle</span>
      </h1>
      <LoginForm
        modalState={modalState}
        handleSubmit={(e) => handleSubmit(e)}
        isLoading={isLoading}
      />
      <GiCircleClaws className="hidden md:text-9xl md:block justify-self-start" />
      {modalState && (
        <AlertModal
          title="Woops!"
          text="Seems like the inserted credentials are invalid, please try to log in again!"
          handleModal={() => setModalState(false)}
        />
      )}
    </main>
  );
}
