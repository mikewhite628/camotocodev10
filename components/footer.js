import React from "react";

export default function Footer() {
  return (
    <div className={``}>
      <div className="flex flex-row justify-center mb-12">
        <button className="btn bg-blue-700 text-white w-60 h-12 rounded-md mr-12 hover:bg-blue-500">
          Sign up to continue
        </button>
        <button className="btn w-60 h-12">or sign in</button>
      </div>
      <footer className="p-12 border-t flex flex-row justify-between bg-zinc-50">
        <div className="flex flex-col w-60">
          <h4 className={`font-stencil uppercase text-blue-700`}>
            <a>camo to code</a>
          </h4>
          <p>Something About Us</p>
          <p>Socials</p>
        </div>
        <div className="flex flex-row justify-evenly w-full">
          <div>
            <h5>For Veterans</h5>
            <p>Stuff Here</p>
          </div>
          <div>
            <h5>For Veterans</h5>
            <p>Stuff Here</p>
          </div>
          <div>
            <h5>For Veterans</h5>
            <p>Stuff Here</p>
          </div>
        </div>
      </footer>
      <div>2022 CamoToCode. All rights reserved.</div>
    </div>
  );
}
