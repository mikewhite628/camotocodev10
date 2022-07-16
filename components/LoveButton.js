import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import useFavorites from "../hooks/useFavorites";

export default function LoveButton({ itemID }) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const favorites = useFavorites();

  const loveItem = (id) => {
    const lovedRef = doc(db, "users", user.uid);
    return updateDoc(lovedRef, { favorites: arrayUnion(id) });
  };

  const unLoveItem = (id) => {
    const lovedRef = doc(db, "users", user.uid);
    return updateDoc(lovedRef, { favorites: arrayRemove(id) });
  };

  return (
    <>
      {favorites ? (
        favorites.includes(itemID) ? (
          <button onClick={() => unLoveItem(itemID)}>`Loved by User!`</button>
        ) : (
          <button onClick={() => loveItem(itemID)}>`Not Loved by User!`</button>
        )
      ) : null}
    </>
  );
}
