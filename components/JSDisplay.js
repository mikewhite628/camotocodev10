import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoveButton from "./LoveButton";
import useFavorites from "../hooks/useFavorites";

export default function JSDisplay({ links }) {
  const favorites = useFavorites();

  return (
    <>
      <ul className="flex flex-row">
        {links.map((x) => (
          <div
            key={x._id}
            className="m-6 h-full w-80 border shadow-md rounded-md"
          >
            <li
              key={x._id}
              className="flex flex-col items-center justify-center"
            >
              <Image
                src={x.img}
                alt={`${x.name} website preview`}
                className="border shadow-md rounded-t-md"
                loading="lazy"
                width={318}
                height={318}
              />

              <p>
                <Link href={`/links/${x._id}`}>{`${x.name}`}</Link>
              </p>
              <Link href={`/category/${x.category}`}>{x.category}</Link>
              <p>{x.description}</p>
              <span className="flex flex-row">
                <p>
                  {favorites ? (
                    <LoveButton itemID={x._id} favorites={favorites} />
                  ) : null}
                </p>
              </span>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}
