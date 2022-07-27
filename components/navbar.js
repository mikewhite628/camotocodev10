import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser, faClose } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [dropMenu, setDropMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  function logout() {
    signOut(auth);
  }

  function toggleLogin() {
    if (loginModal) {
      setLoginModal(false);
    } else {
      setLoginModal(true);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem("uid", `${user.uid}`);
        console.log(user.uid);
        // ...
      } else {
        // User is signed out
        console.log("logged out");
      }
    });
  });

  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(`error code: ${errorCode}`);
        console.log(`error code: ${errorMessage}`);
        // ..
      });
  }

  function signInUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(`${JSON.stringify(userCredential.user.email)} signed in`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code: ${errorCode}`);
        console.log(`error code: ${errorMessage}`);
      });
  }

  async function googleLogin() {
    signInWithRedirect(auth, provider);
  }

  function toggleDropMenu() {
    dropMenu ? setDropMenu(false) : setDropMenu(true);
  }

  return (
    <nav className={`flex justify-between h-16 items-center px-8`}>
      <Link href="/">
        <h4 className={`font-stencil uppercase cursor-pointer drop-shadow-lg`}>
          <a className="">camo to code</a>
        </h4>
      </Link>

      {user ? (
        <div className={`flex flex-row justify-between items-center`}>
          <a>
            <FontAwesomeIcon
              icon={faUser}
              className="text-blue-700 h-6 w-6  drop-shadow-lg mr-16"
              onClick={toggleDropMenu}
            />
          </a>
          {dropMenu ? (
            <span className="absolute bg-blue-700 top-16 right-0 z-20 text-white h-32 flex flex-col items-center justify-evenly font-ropa w-60 text-center">
              <Link href="/favorites">
                <a
                  className={` hover:bg-blue-500 w-full h-full flex items-center btn`}
                >
                  Favorites
                </a>
              </Link>
              <a
                className={`hover:bg-blue-500 w-full text-center h-full flex items-center btn`}
              >
                {user.email}
              </a>
              <button
                className={`hover:bg-blue-500 w-full text-center h-full flex items-center btn`}
                onClick={logout}
              >
                Sign Out
              </button>
            </span>
          ) : null}
        </div>
      ) : (
        <button
          onClick={toggleLogin}
          className="py-3 px-8 bg-blue-700 text-white font-ropa rounded-md uppercase hover:bg-blue-500 shadow-md"
        >
          Login
        </button>
      )}

      {!loginModal ? null : (
        <div className="login w-32 bg-white border absolute top-32 left-1/4 z-20 p-12 flex flex-col justify-center shadow-lg">
          <FontAwesomeIcon
            icon={faClose}
            className="h-6 w-6 absolute right-3 top-3 cursor-pointer"
            onClick={toggleLogin}
          />
          <h3 className="font-ropa">LOG IN </h3>
          <input
            type="text"
            className="border mb-6 p-3"
            placeholder="Email Address"
          ></input>
          <input
            type="text"
            className="border p-3"
            placeholder="Password"
          ></input>

          <button
            className="btn mt-12 mb-6 w-full bg-blue-700 h-12 text-white"
            onClick={() => signInUser()}
          >
            Login
          </button>
          <button
            className="btn mb-6 w-full border border-blue-700 h-12"
            onClick={() => signInUser()}
          >
            Create Account
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
      )}
    </nav>
  );
}
