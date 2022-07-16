import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoveButton from "./LoveButton";
import useFavorites from "../hooks/useFavorites";

export default function JSDisplay({ webDev }) {
  const favorites = useFavorites();

  return (
    <>
      <ul className="flex flex-row">
        {webDev.map((x) => (
          <div key={x._id}>
            <li key={x._id}>
              <Image
                src={x.img}
                alt={`${x.name} website preview`}
                loading="lazy"
                width={250}
                height={250}
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
                  {x.loved}
                </p>
              </span>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}
