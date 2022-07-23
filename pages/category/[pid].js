import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Image from "next/image";

export default function Category({ categoryData, _id }) {
  const router = useRouter();
  const { pid } = router.query;
  const [categoryItems, setCategoryItems] = useState();

  console.log(categoryData);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let links = [];
    const linksSnapshot = await getDocs(collection(db, "links"));
    linksSnapshot.forEach((link) => {
      if (link.data().category.includes(categoryData.name)) {
        links.push(link.data());
        setCategoryItems(links);
      }
    });
  }

  console.log(categoryItems);

  return (
    <div>
      <h3 className="text-center font-ropa">{`${categoryData.name} Resources`}</h3>
      <Image
        src={categoryData.img}
        alt={categoryData.name}
        loading="lazy"
        width={30}
        height={30}
      />
      <section className="flex flex-row ">
        {categoryItems
          ? categoryItems.map((link, i) => (
              <div key={i}>
                <li>{link.name}</li>
                <li>
                  <Image
                    src={link.img}
                    alt={link.name}
                    width={150}
                    height={150}
                  />
                </li>
              </div>
            ))
          : null}
      </section>
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.pid;

  const docRef = doc(db, "category", id);
  const docSnap = await getDoc(docRef);

  if (docSnap) {
    return {
      props: { categoryData: docSnap.data(), _id: id },
    };
  } else {
    alert("no data");
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const querySnapshot = await getDocs(collection(db, "category"));

  // Get the paths we want to pre-render based on posts
  const paths = querySnapshot.docs.map((doc) => {
    return {
      params: { pid: doc.id },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
