import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useFavorites from "./useFavorites";

export default function useFavoriteList() {
  const favorites = useFavorites();
  const [favoriteList, setFavoriteList] = useState();
  useEffect(() => {
    if (favorites) {
      async function getItemID() {
        const linksSnapshot = await getDocs(collection(db, "links"));
        let links = [];

        linksSnapshot.forEach((link) => {
          if (favorites.includes(link.data()._id)) {
            links.push(link.data());
            setFavoriteList(links);
          }
        });
      }
      getItemID();
    }
  }, [favorites]);

  return favoriteList;
}
