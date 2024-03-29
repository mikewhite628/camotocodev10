import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryDisplay({ categories }) {
  return (
    <>
      <h3 className="h-18 w-80 bg-blue-700 text-white rounded-t shadow-md btn font-ropa">
        DISCOVER
      </h3>

      {categories.map((x) => (
        <div
          key={x._id}
          className={`border border-black shadow-md h-12 hover:bg-blue-700
           hover:text-white flex flex-row justify-between p-6 cursor-pointer items-center`}
        >
          <Link href={`/category/${x._id}`}>
            <h5 className="font-ropa uppercase">{x.name}</h5>
          </Link>
          <Image
            src={x.img}
            alt={x.name}
            loading="lazy"
            width={30}
            height={30}
          />
        </div>
      ))}
    </>
  );
}
