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
import BounceLoader from "react-spinners/BounceLoader";
import LoginModal from "./LoginModal";
import Router from "next/router";

export default function Navbar() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [dropMenu, setDropMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const router = useRouter();
  const [creatingAccount, setCreatingAccount] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem("uid", `${user.uid}`);
        // ...
      } else {
        // User is signed out
        console.log("logged out");
      }
    });
  });

  function toggleLogin() {
    if (loginModal) {
      setLoginModal(false);
      setCreatingAccount(false);
    } else {
      setLoginModal(true);
    }
  }
  function logout() {
    signOut(auth);
    router.reload();
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
          <span className="flex">
            <>{user.email}</>
            <a>
              <FontAwesomeIcon
                icon={faUser}
                className="text-blue-700 h-6 w-6  drop-shadow-lg mr-16 ml-6"
                onClick={toggleDropMenu}
              />
            </a>
          </span>
          {dropMenu ? (
            <span className="absolute bg-blue-700 top-16 right-0 z-20 text-white h-32 flex flex-col items-center justify-evenly font-ropa w-60 text-center">
              <Link href="/favorites">
                <a
                  className={` hover:bg-blue-500 w-full h-full flex items-center btn`}
                >
                  Favorites
                </a>
              </Link>

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
        <LoginModal
          toggleLogin={toggleLogin}
          creatingAccount={creatingAccount}
          setCreatingAccount={setCreatingAccount}
        />
      )}
    </nav>
  );
}
