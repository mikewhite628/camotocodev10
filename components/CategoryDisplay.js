import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export default function CategoryDisplay({ categories }) {
  return (
    <>
      <h1>Catergories</h1>

      {categories.map((x) => (
        <div key={x._id}>
          <Link href={`/category/${x._id}`}>
            <h3>{x.name}</h3>
          </Link>
        </div>
      ))}
    </>
  );
}
