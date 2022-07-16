import React, { useState } from "react";
import { getAuth, onAuthStateChanged, signOut, firebase } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  function logout() {
    signOut(auth);
  }

  return (
    <nav className={`flex justify-between h-24 items-center px-8`}>
      <Link href="/">
        <h1 className={`font-stencil text-5xl uppercase`}>
          <a>camo to code</a>
        </h1>
      </Link>

      {user ? (
        <div className={`flex flex-row justify-between items-center`}>
          <Link href="/favorites">
            <a className={`mr-4`}>Favorites</a>
          </Link>
          <h1 className={`mr-4`}>{user.email}</h1>
          <button onClick={(e) => logout()}>Sign Out</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
