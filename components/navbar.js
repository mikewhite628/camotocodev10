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
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [dropMenu, setDropMenu] = useState(false);

  function logout() {
    signOut(auth);
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
        <Link href="/login">
          <button className="py-3 px-8 bg-blue-700 text-white font-ropa rounded-md uppercase hover:bg-blue-500 shadow-md">
            Login
          </button>
        </Link>
      )}

      {user ? null : (
        <div className="login w-32 bg-white border absolute top-32 left-1/4 z-20">
          <h1>Login Stuff Here</h1>
          <label>Email</label>
          <input type="text"></input>
          <label>Password</label>
          <input type="text"></input>

          <h1 onClick={() => signInUser()}>Login</h1>
          <h1 onClick={() => googleLogin()}>Google login</h1>
        </div>
      )}
    </nav>
  );
}
