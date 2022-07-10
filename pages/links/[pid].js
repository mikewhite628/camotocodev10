import React from "react";
import { useRouter } from "next/router";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Image from "next/image";

export default function Link({ linkData, _id }) {
  const router = useRouter();

  console.log(linkData);
  return (
    <div>
      <p>Link id: {_id}</p>
      <p>Name: {linkData.name}</p>
      <p>Name: {linkData.description}</p>
      <Image
        alt="Dog"
        src={linkData.img}
        loading="lazy"
        width={250}
        height={250}
      />
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.pid;

  const docRef = doc(db, "links", id);
  const docSnap = await getDoc(docRef);

  if (docSnap) {
    return {
      props: { linkData: docSnap.data(), _id: id },
    };
  } else {
    alert("no data");
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const querySnapshot = await getDocs(collection(db, "links"));

  // Get the paths we want to pre-render based on posts
  const paths = querySnapshot.docs.map((doc) => {
    return {
      params: { pid: doc.id.toString() },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
