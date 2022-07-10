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
    <nav className={`flex justify-between`}>
      <h1>
        <Link href="/">
          <a>Navbar</a>
        </Link>
      </h1>

      {user ? (
        <Link href="/favorites">
          <a>Favorites</a>
        </Link>
      ) : null}

      {user ? (
        <div>
          <h1>{user.email}</h1>
          <button onClick={(e) => logout()}>Sign Out</button>
        </div>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
    </nav>
  );
}
