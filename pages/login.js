import React, { useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { redirect } from "next/dist/server/api-utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";



export default function Login() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  const router = useRouter()

  const email = "test@gmail.com";
  const password = "123456";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
         router.push("/");
        sessionStorage.setItem("uid", `${user.uid}`);

        // ...
      } else {
        // User is signed out
        // ...
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

  return (
    <div>
      <div>
        <h1>Login Stuff Here</h1>
        <h1 onClick={() => googleLogin()}>Google login</h1>
      </div>
    </div>
  );
}
