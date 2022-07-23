import React from "react";

export default function Header({ count, title, description, icon }) {
  return (
    <div
      className={
        "header flex justify-evenly bg-camo-pattern relative  text-white p-0 mb-9 shadow-xl"
      }
    >
      <div className="transparent-layer"></div>
      <div className={`flex flex-col z-10 items-center justify-center`}>
        <h1 className="font-bangers count-text drop-shadow-lg">{count}</h1>
        <h3 className="font-bangers drop-shadow-lg mt-12">And Counting</h3>
      </div>
      <div className="z-10 w-1/2 flex flex-col items-center justify-center">
        <h2 className="font-ropa ">{title}</h2>
        <p className="font-sans text-lg">{description}</p>
      </div>
    </div>
  );
}
