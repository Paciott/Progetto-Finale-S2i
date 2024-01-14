"use client";

// imports
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterContent() {
  // series of states used to create personalized modals in case of different errors
  const [modalState, setModalState] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  // state to control loader
  const [isLoading, setIsLoading] = useState(false);
  // state to control success modal
  const [registerSuccess, setRegisterSuccess] = useState(false);
  // router
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // async function that handles the creation of a user
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let firstName = formData.get("firstname") as string;
    let lastName = formData.get("lastname") as string;
    let username = formData.get("username") as string;
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let usernameRegex = /^\S+$/;

    // frontend validation
    if (!usernameRegex.test(username)) {
      setIsLoading(false);
      console.log("User was not created, invalid username!");
      setIsUsernameInvalid(true);
      setModalState(true);
      return;
    }
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      console.log("utente non creato, email non valida!");
      setIsEmailInvalid(true);
      setModalState(true);
      return;
    }
    if (password.trim().length < 8) {
      setIsLoading(false);
      console.log("utente non creato, password non sufficientemente lunga!");
      setIsPasswordInvalid(true);
      setModalState(true);
      return;
    }
    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      setIsLoading(false);
      console.log("utente non creato, per piacere inserisci il tuo nome!");
      setIsNameInvalid(true);
      setModalState(true);
      return;
    }
    try {
      let res = await fetch(apiUrl + "auth/register/", {
        mode: "cors",
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.get("firstname"),
          lastName: formData.get("lastname"),
          age: formData.get("age"),
          location: formData.get("location"),
          occupation: formData.get("occupation"),
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      // error check via backend
      if (res.status === 201) {
        setIsLoading(false);
        console.log("utente creato correttamente!");
        setRegisterSuccess(true);
        setTimeout(() => {
          router.push("/");
          setRegisterSuccess(false);
        }, 4000);
      } else if (res.status === 406) {
        setIsLoading(false);
        console.log("utente non creato, username già in uso!");
        setIsUsernameError(true);
        setModalState(true);
      } else if (res.status === 409) {
        setIsLoading(false);
        console.log("utente non creato, email già in uso!");
        setIsEmailError(true);
        setModalState(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log("An error occurred: \n" + e);
    }
  }
  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      modalState={modalState}
      registerSuccess={registerSuccess}
      isLoading={isLoading}
      isUsernameError={isUsernameError}
      isEmailError={isEmailError}
      isUsernameInvalid={isUsernameInvalid}
      isEmailInvalid={isEmailInvalid}
      isPasswordInvalid={isPasswordInvalid}
      isNameInvalid={isNameInvalid}
      handleModal={() => {
        setModalState(false);
        setIsUsernameError(false);
        setIsEmailError(false);
        setIsUsernameInvalid(false);
        setIsEmailInvalid(false);
        setIsNameInvalid(false);
        setIsPasswordInvalid(false);
      }}
    />
  );
}
