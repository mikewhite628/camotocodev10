import React from "react";

export default function Footer() {
  return (
    <div className={``}>
      <div className="flex flex-row justify-center">
        <button>Sign Up</button>
        <button>Sign in</button>
      </div>
      <footer className="py-12 border-t flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className={`font-stencil text-5xl uppercase text-blue-700`}>
            <a>camo to code</a>
          </h1>
          <p>Something About Us</p>
          <p>Socials</p>
        </div>
        <div className="flex flex-row justify-evenly w-full">
          <div>
            <h1>For Veterans</h1>
            <p>Stuff Here</p>
          </div>
          <div>
            <h1>For Veterans</h1>
            <p>Stuff Here</p>
          </div>
          <div>
            <h1>For Veterans</h1>
            <p>Stuff Here</p>
          </div>
          <div>
            <h1>For Veterans</h1>
            <p>Stuff Here</p>
          </div>
        </div>
      </footer>
      <div>2022 CamoToCode. All rights reserved.</div>
    </div>
  );
}
