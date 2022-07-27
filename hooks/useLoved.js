import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function useLoved() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [lovedRef, setLovedRef] = useState();
  useEffect(() => {
    const sessionID = sessionStorage.getItem("uid");
    const getLoves = async () => {
      let loved;
      if (user) {
        loved = doc(db, "users", sessionID);
        setLovedRef(loved);
      }
    };
    getLoves();
  }, []);
  return lovedRef;
}
