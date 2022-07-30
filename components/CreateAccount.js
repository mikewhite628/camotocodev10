import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BounceLoader } from "react-spinners";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

export default function Login({ setCreatingAccount }) {
  const auth = getAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState();
  const [createSuccess, setCreateSuccess] = useState(false);
  const provider = new GoogleAuthProvider();

  async function createUser() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsError(false);
      setCreateSuccess(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setIsError(true);
      setErrorCode(error.message);
      console.log(`error code: ${errorCode}`);
      console.log(`error code: ${errorMessage}`);
      // ..
    }
  }

  async function googleLogin() {
    signInWithRedirect(auth, provider);
    router.reload();
  }

  return (
    <div className="flex flex-col">
      {isError ? (
        <h6 className="text-center text-red-600">{errorCode}</h6>
      ) : null}
      {createSuccess ? (
        <div className="flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="h-12 w-12 mb-12 text-blue-700"
          />
          <h3 className="text-center font-ropa">Welcome To Camo To Code!!</h3>
          <p>You can favorite stuff now :)</p>
        </div>
      ) : (
        <>
          <h3 className="font-ropa">Create Account </h3>
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
            onClick={() => createUser()}
          >
            Create Account
          </button>
          <span className="border mb-6"></span>
          <p className="text-center mb-6 ">
            Already have an account?{" "}
            <a
              className="text-blue-700 underline cursor-pointer"
              onClick={() => setCreatingAccount(false)}
            >
              Log In
            </a>
          </p>
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
        </>
      )}
    </div>
  );
}
