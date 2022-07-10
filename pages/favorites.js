import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Favorites() {
  const [userData, setUserData] = useState();
  const [favoriteList, setFavoriteList] = useState([]);
  const [uid, setUid] = useState();
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  useEffect(() => {
    if (window) {
      async function getItemID() {
        const sessionID = sessionStorage.getItem("uid");

        const querySnapshot = await getDocs(collection(db, "users"));
        const linksSnapshot = await getDocs(collection(db, "links"));
        let favorites;
        let links = [];

        querySnapshot.forEach((doc) => {
          if (doc.data().uid === sessionID) {
            favorites = doc.data().favorites;
          }
        });

        linksSnapshot.forEach((link) => {
          if (favorites.includes(link.data().name)) {
            links.push(link.data());
            setFavoriteList(links);
          }
        });
      }
      getItemID();
    }
  }, []);

  console.log(favoriteList);

  return (
    <div>
      <div className={`flex flex-col`}>
        <div>
          {favoriteList
            ? favoriteList.map((link, i) => (
                <ul key={i}>
                  <li key={i}>{link.name}</li>
                  <li>
                    <Image
                      src={link.img}
                      alt={link.name}
                      width={150}
                      height={150}
                    />
                  </li>
                </ul>
              ))
            : "nothing yet"}
        </div>
      </div>
    </div>
  );
}
