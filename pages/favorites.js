import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import LoveButton from "../components/LoveButton";
import useFavorites from "../hooks/useFavorites";
import useFavoriteList from "../hooks/useFavoriteList";

export default function Favorites() {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const favoriteList = useFavoriteList();
  const favorites = useFavorites();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    <div>
      <div className={`flex flex-col`}>
        <div>
          {favoriteList
            ? favoriteList.map((link, i) => (
                <ul key={i}>
                  <li key={i}>
                    {" "}
                    <Link href={`/links/${link._id}`}>{`${link.name}`}</Link>
                  </li>
                  <li>
                    <Image
                      src={link.img}
                      alt={link.name}
                      width={150}
                      height={150}
                    />
                  </li>
                  <LoveButton itemID={link._id} />
                </ul>
              ))
            : "nothing yet"}
        </div>
      </div>
    </div>
  );
}
