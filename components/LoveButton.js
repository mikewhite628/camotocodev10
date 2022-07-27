import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import useFavorites from "../hooks/useFavorites";
import { faHeart } from "@fortawesome/pro-light-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLoved from "../hooks/useLoved";

export default function LoveButton({ itemID }) {
  const favorites = useFavorites();
  const loveRef = useLoved();

  const loveItem = (id) => {
    return updateDoc(loveRef, { favorites: arrayUnion(id) });
  };

  const unLoveItem = (id) => {
    return updateDoc(loveRef, { favorites: arrayRemove(id) });
  };

  return (
    <>
      {favorites ? (
        favorites.includes(itemID) ? (
          <button onClick={() => unLoveItem(itemID)}>
            <FontAwesomeIcon
              icon={fullHeart}
              className="text-blue-700 h-6 w-6  drop-shadow-lg"
            />
          </button>
        ) : (
          <button onClick={() => loveItem(itemID)}>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-blue-700 h-6 w-6  drop-shadow-lg fa-thin"
            />
          </button>
        )
      ) : null}
    </>
  );
}
