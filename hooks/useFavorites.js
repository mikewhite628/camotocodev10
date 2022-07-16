import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function useFavorites() {
  const [favorites, setFavorites] = useState();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const sessionID = sessionStorage.getItem("uid");
    const favorite = async () => {
      let favorites = [];
      if (user) {
        const userSnapshot = await getDocs(collection(db, "users"));
        userSnapshot.forEach((doc) => {
          if (doc.data().uid === sessionID) {
            favorites = doc.data().favorites;
          }
        });
        setFavorites(favorites);
      }
    };
    favorite();
  });

  return favorites;
}
