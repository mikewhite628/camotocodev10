import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faYoutubeSquare,
  faLinkedin,
  faPatreon,
} from "@fortawesome/free-brands-svg-icons";

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
          <p className="text-sm">
            was made by a veteran who wants to make the world of web development
            accesible to all.
          </p>
          <span className="mt-4 flex flex-row justify-between">
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-blue-700 h-10 w-10  drop-shadow-lg"
            />
            <FontAwesomeIcon
              icon={faYoutubeSquare}
              className="text-blue-700 h-10 w-10  drop-shadow-lg"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-blue-700 h-10 w-10  drop-shadow-lg"
            />
            <FontAwesomeIcon
              icon={faPatreon}
              className="text-blue-700 h-10 w-10  drop-shadow-lg"
            />
          </span>
        </div>
        <div className="flex flex-row justify-evenly w-full">
          <div>
            <h5>For Veterans</h5>
            <p>Stuff Here</p>
          </div>
          <div>
            <h5>Community</h5>
            <p>Stuff Here</p>
          </div>
          <div>
            <h5>Company</h5>
            <p>About</p>
          </div>
        </div>
      </footer>
      <div className="bg-zinc-50 d-flex justify-center items-center w-full">
        <p className="mx-auto w-80">2022 CamoToCode All rights reserved.</p>
      </div>
    </div>
  );
}
