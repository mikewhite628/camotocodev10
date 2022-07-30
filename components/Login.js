import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BounceLoader } from "react-spinners";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default function Login({ creatingAccount, setCreatingAccount }) {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function logout() {
    signOut(auth);
    router.reload();
  }

  async function signInUser() {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      router.reload();
    } catch (error) {
      setIsLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      setIsError(true);
      console.log(`error code: ${errorCode}`);
      console.log(`error code: ${errorMessage}`);
    }
  }

  async function googleLogin() {
    signInWithRedirect(auth, provider);
    router.reload();
  }

  return (
    <div className="flex flex-col">
      {isError ? (
        <h6 className="text-center text-red-600">
          Please check your username and password and try again
        </h6>
      ) : null}
      <h3 className="font-ropa">LOG IN </h3>
      <BounceLoader color="#1d3bdb" loading={isLoading} />
      <div className="flex flex-col">
        <input
          type="text"
          className="border mb-6 p-3"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="border p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button
        className="btn mt-12 mb-6 w-full bg-blue-700 h-12 text-white"
        onClick={() => signInUser()}
      >
        Login
      </button>
      <button
        className="btn mb-6 w-full border border-blue-700 h-12"
        onClick={() => setCreatingAccount(true)}
      >
        Create An Account
      </button>
      <span className="border mb-6"></span>
      <button
        className="w-full  bg-blue-100 h-12 relative"
        onClick={() => googleLogin()}
      >
        <FontAwesomeIcon
          icon={faGoogle}
          className="h-6 w-6 cursor-pointer absolute left-32"
        />
        Sign In With Google
      </button>
    </div>
  );
}
